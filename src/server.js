const express = require('express');
const app = express();
const elo = require('./Elo');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.send('<b>Rating Calculation!</b>');
});

app.get('/rating', (req, res) => {
  const {
    r, k, s, e,
  } = req.query;
  if (!(r || k || s || e)) {
    return res.status(400).send("Incorrect query");
  }
  const rating = elo.rating(r,k,s,e);
  return res.send(`<b>${rating}</b>`);
});

app.get('/ratings', (req, res) => {
  const {
    r1, r2, k, s1, s2, e1, e2, d,
  } = req.query;
  if (!(r1 || r2 || s1 || s2 || k)) {
    return res.status(400).send("Incorrect query");
  }
  const ratings = elo.calculateRatings(r1, r2, k, s1, s2, e1, e2, d);
  return res.send(JSON.stringify(ratings));
});

app.listen(port, () => console.log(`Server ${port}!`));

