const express = require("express");
const cors = require("cors")
const path = require("path")

require("dotenv").config();


const routes = require("./routes");

const app = express();


app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const __dir = path.resolve();
console.log(__dir)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dir, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dir, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Running.......')
    })
}

const port = process.env.PORT || 5006;

app.listen(port, () => console.log(`Listening on port: ${port}`))

