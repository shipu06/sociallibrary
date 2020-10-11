const booksService = require("../services/books.service.js");
const booksRatingService = require("../services/booksRating.service.js");
const commentsService = require("../services/comments.service.js");
const markersService = require("../services/markers.service.js");
const categoriesService = require("../services/categories.service.js");
const commentsRatingService = require("../services/commentsRating.service.js");
const userService = require("../services/user.service.js");

const average = (array) => array.reduce((a, b) => a + b) / array.length;

async function getBestBooks(quantity) {
  const ratings = await booksRatingService.getAll();

  const objWithData = ratings.reduce((acc, cur) => {
    let values = [];
    if (acc[cur.bookId] !== undefined) values = acc[cur.bookId];
    return { ...acc, [cur.bookId]: [...values, cur.value] };
  }, {});

  const arrayWithAverageRatings = Object.entries(objWithData).map(
    ([bookId, ratings]) => {
      return [bookId, average(ratings).toFixed(2)];
    }
  );

  const sortedArray = arrayWithAverageRatings
    .sort((a, b) => b[1] - a[1])
    .splice(0, quantity);

  const bestIds = sortedArray.map(([bookId]) => bookId);
  return await booksService.getBooksByIds(bestIds);
}

async function getLastBooks(quantity) {
  return await booksService.getFew(quantity);
}

async function getMostPopularBooks(quantity) {
  const comments = await commentsService.getAll();

  const objWithData = comments.reduce((acc, cur) => {
    let values = [];
    if (acc[cur.bookId] !== undefined) values = acc[cur.bookId];
    return { ...acc, [cur.bookId]: [...values, cur.value] };
  }, {});

  const arrayWithAverageRatings = Object.entries(objWithData).map(
    ([bookId, comments]) => {
      return [bookId, comments.length];
    }
  );

  const sortedArray = arrayWithAverageRatings.sort((a, b) => b[1] - a[1]);

  const bestIds = sortedArray.map(([bookId]) => bookId);

  let counter = 0;
  let i = 0;
  let books = [];
  while (counter < 5) {
    const [book] = await booksService.getBooksByIds(bestIds[i]);
    if (book) {
      books.push(book);
      counter++;
    }
    i++;
  }
  return books;
}

async function getQuantityOfCategories() {
  const categories = (await categoriesService.get()).map(
    (item) => item.category
  );

  const categoriesCounter = await Promise.all(
    categories.map(async (category) => {
      const quantity = (await booksService.findQuery({ category })).length;
      return { category, quantity };
    })
  );

  return categoriesCounter;
}
async function getNumbers() {
  const booksQuantity = (await booksService.getAll()).length;
  const booksRatingQuantity = (await booksRatingService.getAll()).length;
  const commentsQuantity = (await commentsService.getAll()).length;
  const commentsRatingQuantity = (await commentsRatingService.getAll()).length;
  const markersQuantity = (await markersService.getAll()).length;
  const usersQuantity = (await userService.getAll()).length;

  const arrayWithData = [
    { category: "Books", quantity: booksQuantity },
    { category: "Rating of books", quantity: booksRatingQuantity },
    { category: "Comments", quantity: commentsQuantity },
    { category: "Ratings of comments", quantity: commentsRatingQuantity },
    { category: "Markers", quantity: markersQuantity },
    { category: "Users", quantity: usersQuantity },
  ];

  return arrayWithData;
}

module.exports = {
  getBestBooks,
  getLastBooks,
  getMostPopularBooks,
  getQuantityOfCategories,
  getNumbers,
};
