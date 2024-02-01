"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = Express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(Express.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
exports.default = app;
