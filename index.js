const express = require('express');
const bodyParser = require('body-parser');
const Pun = require('./models');

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

app.post('/puns', (req, res) => {
  console.log(req.body);
  const punchline = req.body.punchline;

  if (!punchline) {
    return res.status(400).send({ message: 'A punchline is required!'});
  }

  console.log("Are we getting here?");
  Pun.sync().then( ()=> {
    return Pun.create({punchline}).then(pun => {
      console.log("What is pun?");
      console.log(pun);
      return res.status(201).send({ pun });
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));