"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_dev_1 = require("./environment.dev");
const environment_prod_1 = require("./environment.prod");
/**
 * Retrieves the environment variables based on the current NODE_ENV value.
 * If NODE_ENV is set to 'production', it returns the production environment variables.
 * Otherwise, it returns the development environment variables.
 * @returns {Environment} The environment variables.
 */
function getEnvironmentVariables() {
    if (process.env.NODE_ENV === 'production') {
        return environment_prod_1.ProdEnviroment;
    }
    return environment_dev_1.DevEnviroment;
}
const environment = getEnvironmentVariables();
exports.default = environment;
