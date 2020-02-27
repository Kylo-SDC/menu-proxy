/* eslint-disable no-undef */
require('newrelic');
const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.static('public'));

const menuUrl = process.env.menuUrl;
const reviewUrl = process.env.reviewUrl;
const photoUrl = process.env.photoUrl;
const reservationUrl = process.env.reservationUrl;

// RESTAURANTS / MENUS //////////////////////////////////////////

// read

app.get('/api/restaurant/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://ec2-3-14-67-128.us-east-2.compute.amazonaws.com:8001/api/restaurant/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.status(400).send('error fetching restaurant data');
    });
});

app.get('/api/restaurantTitle/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://ec2-3-14-67-128.us-east-2.compute.amazonaws.com:8001/api/restaurantTitle/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.status(400).send('error fetching restaurant title');
    });
});

// create

app.post('/api/menu/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  const { menuName, menuDescription } = req.body;
  axios.post(`${menuUrl}/api/menu/${restaurantId}`, { menuName: menuName, menuDescription: menuDescription })
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
  axios.get(`${reviewUrl}/reviews/sort/${id}/${sorting}/${list}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching');
    });
});

// create
app.post('/api/reviews/', (req, res) => {
  axios.post(`${reviewUrl}/api/reviews`, req.body)
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
  axios.get(`${photoUrl}/api/photos/${id}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching photos');
    });
});

// create

app.post('/api/reviews', (req, res) => {
  axios.post(`${photoUrl}/api/reviews`, req.body)
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
  axios.get(`${reservationUrl}/api/reservations/${restaurantId}`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(400).send('error fetching reservations');
  });
});


// create
app.post('/api/reservations', (req, res) => {
  axios.post(`${reservationUrl}/api/reservations`, req.body)
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