const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

app.get('/api/patients', (req, res) => {
  // Get patients logic goes here
});

app.post('/api/add-patient', (req, res) => {
  // Add patient logic goes here
});

app.put('/api/update-patient/:id', (req, res) => {
  // Update patient logic goes here
});
