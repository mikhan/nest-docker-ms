const express = require('express');
const app = express();

let id = new Date().getTime();
const env = process.env.NODE_ENV;
const port = process.env.API_PORT;

app.get('/', (req, res) => {
  res.send(`http://localhost:${port} (${env})\n`);
});

app.get('/api/cars', (req, res) => {
  const payload = {id: id, cars: ['BMW', 'Mercedes-Benz', 'Lamborghini', 'Ferrari', 'Maserati']};
  res.json(payload);
});


app.listen(port, () => {
  console.log(`Instance Started`);
});
