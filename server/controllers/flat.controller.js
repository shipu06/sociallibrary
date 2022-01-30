const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

(async () => {
  global.browser = await puppeteer.launch({
    browserWSEndpoint: `ws://localhost:3000`,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  });
  console.log("GLOBAL BROWSER LAUNCHED");
})();

// Controller
router.get("/", getFlats);

function getFlats(req, res) {
  console.log("GET /api/flat");
  flatServices
    .getFlatsFromOtoDomURL(otodomURL)
    .then((books) => res.json(books))
    .catch((err) => res.json({ message: err }));
}

// Services
const flatServices = {};

flatServices.getFlatsFromOtoDomURL = async (URL) => {
  console.time("Scrapping searching list: ");
  try {
    // Get site HTML
    const response = await fetch(URL);
    const body = await response.text();

    // Parse the html text and extract titles
    const $ = cheerio.load(body);

    // Get listings info
    const listingList = [];
    $('[role="main"] > [data-cy="search.listing"] li').each(async (i, item) => {
      const listingNode = $(item);
      const path = listingNode
        .find('[data-cy="listing-item-link"]')
        .attr("href");
      console.log(path);

      if (typeof path === "undefined") {
        return;
      }

      const title = listingNode.find('[data-cy="listing-item-title"]').text();
      const link = "https://www.otodom.pl" + path;
      const mainImage = $(
        listingNode.find('[media="(max-width: 768px)"]')[0]
      ).attr("srcset");
      const price = $(listingNode.find("article>p")[1]).text();
      const rooms = $(listingNode.find("article>p span")[0]).text();
      const area = $(listingNode.find("article>p span")[1]).text();

      listingList.push({
        title,
        link,
        price,
        area,
        rooms,
        mainImage,
      });
    });
    console.timeEnd("Scrapping searching list: ");

    return listingList;
  } catch (err) {
    return console.log(err);
  }
};

flatServices.getImagesURLFromOtoDomListingURL = async (URL) => {
  try {
    // Launch browser
    const browser = global.browser;

    // Start timer
    console.time(URL);

    // Open new tab
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    // Open page
    await page.goto(URL, { waitUntil: "load" });

    // Stop rendering when element is visible
    await page.waitForSelector("img.image-gallery-thumbnail-image");

    // Extract element src
    const images = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".image-gallery-thumbnail-image")
      ).map((el) => el.src.split(";").slice(0, -2).join(";"));
    });

    // Close the page
    await page.goto("about:blank");
    await page.close();

    // Log time
    console.timeEnd(URL);

    // Return images
    return images;
  } catch (err) {
    console.log(err);
    return err;
  }
};

router.get("/test", async (req, res) => {
  try {
    const URL =
      "https://www.otodom.pl/pl/oferta/przytulne-2-pok-z-balkonem-w-kamienicy-z-winda-ID4f858";
    const urls = await flatServices.getImagesURLFromOtoDomListingURL(URL);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/flat - " + req.body.URL);
  try {
    const urls = await flatServices.getImagesURLFromOtoDomListingURL(
      req.body.URL
    );
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;

const otodomURL =
  // "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/warszawa?page=1&limit=24&market=ALL&roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&locations=%5Bcities_6-26%5D";
