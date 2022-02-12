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
router.post("/", getFlatsFromURL);
router.post("/single", getListingImagesFromURL);

function getFlatsFromURL(req, res) {
  const url = req.body.url;
  const limit = req.body.limit || 50;
  console.log("POST /api/flat - " + url);
  if (url.includes("otodom")) {
    flatServices
      .getFlatsFromOtodomUrl(url, limit)
      .then((data) => {
        return res.json({ data, success: true });
      })
      .catch((err) => {
        return res.json({ message: err.message, success: false });
      });
  } else if (url.includes("gumtree")) {
    flatServices
      .getFlatsFromGumtreeUrl(url, limit)
      .then((data) => {
        return res.json({ data, success: true });
      })
      .catch((err) => {
        return res.json({ message: err.message, success: false });
      });
  } else {
    return res.json({ data: [], success: false });
  }
}

function getListingImagesFromURL(req, res) {
  const url = req.body.URL;
  console.log("GET /api/flat/single - " + url);
  if (url.includes("otodom")) {
    flatServices
      .getImagesFromOtodomListingUrl(req.body.URL)
      .then((data) => res.json({ urls: data }))
      .catch((err) => res.json(err));
  } else if (url.includes("gumtree")) {
    flatServices
      .getImagesFromGumtreeListingUrl(req.body.URL)
      .then((data) => res.json({ urls: data }))
      .catch((err) => res.json(err));
  } else {
    res.json({ err: "Didn't found any matching url" });
  }
}

// Services
const flatServices = {};

// Otodom
flatServices.getFlatsFromOtodomUrl = async (URL, limit = 100) => {
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

flatServices.getImagesFromOtodomListingUrl = async (URL) => {
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

// Gumtree
flatServices.getFlatsFromGumtreeUrl = async (URL, limit = 100) => {
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
      container: ".view > .tileV1",
      link: "a",
      title: ".tile-title-text",
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
      const link = "https://www.gumtree.pl" + path;
      const mainImage = $(listingNode.find(".bolt-image source")[0])
        .attr("data-srcset")
        .replace("s-l80.webp", "s-l500.webp");

      const price = $(listingNode.find(".ad-price")[0]).text().trim();

      listingList.push({
        title,
        link,
        price,
        area: "n/a",
        rooms: "n/a",
        mainImage,
      });
    });
    console.timeEnd("Scrapping searching list: ");

    return listingList;
  } catch (err) {
    throw new Error(err.message);
  }
};

flatServices.getImagesFromGumtreeListingUrl = async (URL) => {
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
    await page.waitForSelector("#vip-gallery-data");
    // Extract element src
    const images = await page.evaluate(() => {
      return JSON.parse(document.querySelector("#vip-gallery-data").text)
        .medium;
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

// test otodom
router.get("/test-flats-otodom", async (req, res) => {
  const url =
    "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
  console.log("GET /api/flat/test-single-otodom - " + url);
  try {
    const urls = await flatServices.getFlatsFromOtodomUrl(url);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/test-single-otodom", async (req, res) => {
  const url =
    "https://www.otodom.pl/pl/oferta/przytulne-2-pok-z-balkonem-w-kamienicy-z-winda-ID4f858";

  console.log("GET /api/flat/test-single-otodom - " + url);
  try {
    const urls = await flatServices.getImagesFromOtodomListingUrl(url);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

// Tests gumtree
router.get("/test-flats-gumtree", async (req, res) => {
  const url =
    "https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/krakow/v1c9008l3200208p1?pr=1400,2200";

  console.log("GET /api/flat/test-flats-gumtree - " + url);
  try {
    const urls = await flatServices.getFlatsFromGumtreeUrl(url);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/test-single-gumtree", async (req, res) => {
  const url =
    "https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/krakow/nowa-kawalerka-z-ogrodkiem-w-doskonalej-lokalizacji-na-wynajem/10010366159311010849556809";

  console.log("GET /api/flat/test-single-gumtree - " + url);
  try {
    const urls = await flatServices.getImagesFromGumtreeListingUrl(url);
    return res.json({ urls });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;

const otodomURL =
  // "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/warszawa?page=1&limit=24&market=ALL&roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&locations=%5Bcities_6-26%5D";
