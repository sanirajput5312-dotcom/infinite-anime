const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Infinite API Running');
});

app.listen(3000, () => console.log('Server running'));