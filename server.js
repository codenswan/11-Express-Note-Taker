//* express dependency
const express = require("express");

//* express app setup for middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//* here the imported api routes. "app" imports all the functions from apiRoutes.js and HtmlRoutes.js
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//* port setup for deployment on heroku.
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
