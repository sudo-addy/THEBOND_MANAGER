const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello'));

const PORT = 3215;
app.listen(PORT, () => console.log(`Minimal server running on ${PORT}`));
