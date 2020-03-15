const express = require('express');
const bodyParser = require('body-parser');
const Pun = require('./models');

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

app.post('/puns', (req, res) => {
  const punchline = req.body.punchline;

  if (!punchline) {
    return res.status(400).send({ message: 'A punchline is required!'});
  }

  console.log("Are we getting here?");
  Pun.sync().then( ()=> {
    return Pun.create({punchline}).then(pun => {
      return res.status(201).send({ pun });
    });
  });
});

app.get('/puns', async (req, res) => {
  const puns = await Pun.findAll();

  res.setHeader('content-type', 'application/json');
  return res.status(200).send(JSON.stringify(puns));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));