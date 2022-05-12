const express = require("express");
const cors = require("cors")

require("dotenv").config();


const routes = require("./routes");

const app = express();


app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const port = process.env.PORT || 5006;

app.listen(port, () => console.log(`Listening on port: ${port}`))

