const express = require('express');
const router = require("./routes");

const app = express();
const port = 8000;

app.use(express.json())
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})