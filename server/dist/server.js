"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = require("./environments");
const _1 = require(".");
const PORT = environments_1.environment.port || 3000;
_1.default.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
