"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const environments_1 = require("./environments");
const db_1 = require("./db");
const _1 = require(".");
(0, db_1.default)();
const PORT = environments_1.environment.port || 3000;
_1.default.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
