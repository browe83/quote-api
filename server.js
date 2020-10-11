const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randQuoteObj = getRandomElement(quotes);
  res.send({ quote: randQuoteObj });
});

app.get("/api/quotes", (req, res, next) => {
  if (req.query.person) {
    const author = req.query.person;
    const quotesByAuthor = quotes.filter((quote) => author === quote.person);
    res.send({
      quotes: quotesByAuthor,
    });
  } else {
    res.send({
      quotes: quotes,
    });
  }
});

app.post("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;

  console.log(req.query);
  if (!person || !quote) {
    res.status(400).send({ message: "something went wrong" });
  } else {
    const newQuoteObj = {
      quote: quote,
      person: person,
    };
    quotes.push(newQuoteObj);
    res.send({ quote: { person, quote } });
  }
});
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
