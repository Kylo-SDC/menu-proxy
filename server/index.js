/* eslint-disable no-undef */
require('newrelic');
const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.static('public'));

const menuPort = process.env.menu_port || 8000;
const reviewPort = process.env.review_port || 8001;
const photoPort = process.env.photo_port || 8002;
const reservationPort = process.env.reservation_port || 8003;


app.get('/api/restaurant/:restaurantId', (req, res) => {

  const { restaurantId } = req.params;
  axios.get(`http://localhost:${menuPort}/api/restaurant/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.status(400).send('error fetching restaurant data');
    });
});

app.post('/api/menu/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const { menuName, menuDescription } = req.body;
  axios.post(`http://localhost:${menuPort}/api/menu/${restaurantId}`, { menuName: menuName, menuDescription: menuDescription })
    .then(() => {
      res.status(200).send('success');
    })
    .catch(() => {
      res.status(400).send('error posting menu');
    })
});

// REVIEWS /////////////////////////////////////////////////////////////

// read
app.get('/reviews/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://localhost:${reviewPort}/reviews/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching reviews');
    });
})

app.get('/reviews/sort/:id/:sorting/:list', (req, res) => {
  const { id, sorting, list } = req.params;
  axios.get(`http://localhost:${reviewPort}/reviews/sort/${id}/${sorting}/${list}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching');
    });
});

// create
app.post('/api/reviews/', (req, res) => {
  axios.post(`http://localhost:${reviewPort}/api/reviews`, req.body)
    .then(() => {
      res.status(200).send('posted');
    })
    .catch(() => {
      res.status(400).send('error posting');
    });
});

// PHOTOS /////////////////////////////////////////////////////////////

// read

app.get('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:${photoPort}/api/photos/${id}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching photos');
    });
});

// create

app.post('/api/reviews', (req, res) => {
  axios.post(`http://localhost:${photoPort}/api/reviews`, req.body)
    .then(() => {
      res.status(200).send('posted photo');
    })
    .catch(() => {
      res.status(400).send('error posting photo');
    });
});

// RESERVATIONS //////////////////////////////////////////////////////////

// read

app.get('/api/reservations/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://localhost:${reservationPort}/api/reservations/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching reservations');
  });
});


// create
app.post('/api/reservations', (req, res) => {
  axios.post(`http://localhost:${reservationPort}/api/reservations`, req.body)
    .then(() => {
      res.status(200).send('successful post');
    })
    .catch(() => {
      res.status(400).send('failed post');
    });
});



const proxyPort = process.env.proxy_port || 3043;


app.listen(proxyPort, () => {
  console.log(`App listening on port ${proxyPort}`);
});