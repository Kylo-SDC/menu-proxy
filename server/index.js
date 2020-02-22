require('newrelic');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/:restaurantId', (req, res) => {


  const { restaurantId } = req.params;
  axios.get(`http://localhost:8000/api/restaurant/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.status(400).send('error fetching restaurant data');
    });
});

app.post('/menu/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const { menuName, menuDescription } = req.body;
  axios.post(`http://localhost:8000/api/menu/${restaurantId}`, { menuName: menuName, menuDescription: menuDescription })
    .then(() => {
      res.status(200).send('success');
    })
    .catch(() => {
      res.status(400).send('error posting menu');
    })
});

const port = 3043;


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});