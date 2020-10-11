const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));
app.use(bodyParser.json());

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

app.get("/api/quotes/:id", (req, res, next) => {
  const index = quotes.findIndex((quote) => quote.id === Number(req.params.id));

  if (index !== -1) {
    let quote = quotes[index];
    res.status(200).send(quote);
  } else {
    res.status(404).send("Id not found");
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

app.put("/api/quotes/:id", (req, res, next) => {
  const index = quotes.findIndex((quote) => quote.id === Number(req.params.id));
  // console.log(req);
  if (index !== -1) {
    let quote = quotes[index];
    console.log(req.body);
    if (!(req.body.quote === undefined || req.body.quote === "")) {
      quote.quote = req.body.quote;
    }
    if (!(req.body.person === undefined || req.body.person === "")) {
      quote.person = req.body.person;
    }
    console.log(quote);
    res.status(200).send(quote);
  } else {
    res.status(404).send({ message: "Id not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
