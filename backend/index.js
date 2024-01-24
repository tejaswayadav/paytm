const express = require("express");
const { User } = require('./db');
const rootRouter = require("./routes/index");
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Starting the server with port ${process.env.SERVER_PORT}`);
})