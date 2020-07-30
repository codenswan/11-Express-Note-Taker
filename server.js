const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});