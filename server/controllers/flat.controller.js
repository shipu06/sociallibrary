const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const cheerio = require("cheerio");

// Controller
router.get("/", getFlats);

function getFlats(req, res) {
  flatServices
    .getFlatsFromLink(otodomURL)
    .then((books) => res.json(books))
    .catch((err) => res.json({ message: err }));
}

// Services
const flatServices = {};

flatServices.getFlatsFromLink = async (URL) => {
  const response = await fetch(URL);
  const body = await response.text();

  try {
    // parse the html text and extract titles
    const $ = cheerio.load(body);
    const listingList = [];

    // using CSS selector
    $('[data-cy="search.listing"] li').each((i, item) => {
      const listingNode = $(item);
      const title = listingNode.find('[data-cy="listing-item-title"]').text();
      const link =
        "https://www.otodom.pl/" +
        listingNode.find('[data-cy="listing-item-link"]').attr("href");
      const image = $(listingNode.find('[media="(max-width: 768px)"]')[0]).attr(
        "srcset"
      );
      const price = $(listingNode.find("article>p")[1]).text();
      const rooms = $(listingNode.find("article>p span")[0]).text();
      const area = $(listingNode.find("article>p span")[1]).text();








      
      listingList.push({
        title,
        link,
        image,
        price,
        area,
        rooms,
      });
    });

    return listingList;
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
const otodomURL =
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=24&by=DEFAULT&direction=DESC&locations[0][regionId]=6&locations[0][cityId]=38&locations[0][subregionId]=410";
