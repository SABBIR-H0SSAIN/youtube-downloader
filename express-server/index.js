const express = require("express");
const routes = require('./routes');
const app = express();
const port = 3001;

app.use('/download',routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
