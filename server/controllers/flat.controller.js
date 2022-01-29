const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
// Controller
router.get("/", getFlats);

function getFlats(req, res) {
  flatServices
    .getFlatsFromOtoDomURL(otodomURL)
    .then((books) => res.json(books))
    .catch((err) => res.json({ message: err }));
}

// Services
const flatServices = {};

flatServices.getFlatsFromOtoDomURL = async (URL) => {
  const response = await fetch(URL);
  const body = await response.text();

  try {
    // Parse the html text and extract titles
    const $ = cheerio.load(body);
    const listingList = [];

    // Get listings info
    $('[data-cy="search.listing"] li').each(async (i, item) => {
      if (i > 5) {
        return;
      }
      const listingNode = $(item);
      const title = listingNode.find('[data-cy="listing-item-title"]').text();
      const link =
        "https://www.otodom.pl/" +
        listingNode.find('[data-cy="listing-item-link"]').attr("href");

      const price = $(listingNode.find("article>p")[1]).text();
      const rooms = $(listingNode.find("article>p span")[0]).text();
      const area = $(listingNode.find("article>p span")[1]).text();

      listingList.push({
        title,
        link,
        price,
        area,
        rooms,
      });
    });

    // Get images for single listing
    await Promise.all(
      listingList.map(async (listing, idx) => {
        const URL = listing.link;
        try {
          const images = await flatServices.getImagesURLFromOtoDomListingURL(
            URL
          );
          listing.image = images;
          return;
        } catch (err) {
          return console.log(err);
        }
      })
    );

    return listingList;
  } catch (err) {
    return console.log(err);
  }
};

flatServices.getImagesURLFromOtoDomListingURL = async (URL) => {
  console.log(URL, "Site scrapping");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitForSelector("img.image-gallery-thumbnail-image");

  const images = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".image-gallery-thumbnail-image")
    ).map((el) => el.src.split(";").slice(0, -2).join(";") + ";s=400x300");
  });

  await browser.close();
  return images;
};

router.get("/test", async (req, res) => {
  try {
    const URL =
      "https://www.otodom.pl/pl/oferta/przytulne-2-pok-z-balkonem-w-kamienicy-z-winda-ID4f858";
    const urls = await flatServices.getImagesURLFromOtoDomListingURL(URL);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
    console.log('e');
  }
});

module.exports = router;

const otodomURL =
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
