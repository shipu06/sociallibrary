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
router.get("/", getFlats); // NOT USED
router.post("/", getFlatsFromURL);
router.post("/single", getListingImagesFromURL);

function getFlats(req, res) {
  console.log("GET /api/flat");
  flatServices
    .getFlatsFromOtoDomURL(otodomURL)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));

  // flatServices
  //   .getFlatsFromGumtreeURL(otodomURL)
  //   .then((data) => res.json(data))
  //   .catch((err) => res.json({ message: err }));
}

function getFlatsFromURL(req, res) {
  const url = req.body.url;
  const limit = req.body.limit || 50;
  console.log("POST /api/flat - " + url);
  flatServices
    .getFlatsFromOtoDomURL(url, limit)
    .then((data) => {
      return res.json({ data, success: true });
    })
    .catch((err) => {
      return res.json({ message: err.message, success: false });
    });
}

function getListingImagesFromURL(req, res) {
  const url = req.body.URL;
  console.log("GET /api/flat/single - " + url);
  flatServices
    .getImagesURLFromOtoDomListingURL(req.body.URL)
    .then((data) => res.json({ urls: data }))
    .catch((err) => res.json(err));
}

// Services
const flatServices = {};

flatServices.getFlatsFromOtoDomURL = async (URL, limit = 100) => {
  console.time("Scrapping searching list: ");
  try {
    if (typeof URL !== "string") {
      throw new Error("URL is not a string");
    }
    if (URL === "") {
      throw new Error("URL is empty string");
    }
    // Get site HTML
    const response = await fetch(URL);
    const body = await response.text();

    // Parse the html text and extract titles
    const $ = cheerio.load(body);
    // Listing selectors
    const listingSelector = {
      container: '[role="main"] > [data-cy="search.listing"] li',
      link: '[data-cy="listing-item-link"]',
      title: '[data-cy="listing-item-title"]',
    };
    // Get listings info
    const listingList = [];
    $(listingSelector.container).each(async (i, item) => {
      if (i >= limit) {
        return;
      }
      const listingNode = $(item);
      const path = listingNode.find(listingSelector.link).attr("href");

      if (typeof path === "undefined") {
        return;
      }

      const title = listingNode.find(listingSelector.title).text();
      const link = "https://www.otodom.pl" + path;
      const mainImage = $(
        listingNode.find('[media="(max-width: 768px)"]')[0]
      ).attr("srcset");
      const price = $(listingNode.find("article p")[1]).text();
      const rooms = $(listingNode.find("article p span")[1]).text();
      const area = $(listingNode.find("article p span")[2]).text();

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
    throw new Error(err.message);
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

// Tests
router.get("/test-flats", async (req, res) => {
  try {
    const URL =
      "https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/krakow/v1c9008l3200208p1?pr=1400,2200";
    return res.json({ URL });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/test-single", async (req, res) => {
  try {
    const URL =
      "https://www.otodom.pl/pl/oferta/przytulne-2-pok-z-balkonem-w-kamienicy-z-winda-ID4f858";
    const urls = await flatServices.getImagesURLFromOtoDomListingURL(URL);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;

const otodomURL =
  // "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/warszawa?page=1&limit=24&market=ALL&roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&locations=%5Bcities_6-26%5D";
