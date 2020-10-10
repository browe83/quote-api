const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// app.get("/api/quotes/random", (req, res, next) => {
//   const randQuoteObj = getRandomElement(quotes);
//   res.send({ quote: randQuoteObj });
// });

// app.get("/api/quotes", (req, res, next) => {
//   const author = req.query.person;
//   if (author !== undefined) {
//     const quotesByAuthor = quotes.filter((quote) => quote.person === author);
//     res.send({
//       quotes: quotesByAuthor,
//     });
//   } else {
//     res.send({ quotes: quotes });
//   }
// });

// app.post("/api/quotes", (req, res, next) => {
//   if (req.query.quote && req.query.person) {
//     const newQuote = {
//       quote: req.query.quote,
//       person: req.query.person,
//     };
//     quotes.push(newQuote);
//     res.send({ quote: newQuote });
//   } else {
//     res.status(400).send("Missing information. Quote could not be created.");
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
