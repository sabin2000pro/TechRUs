"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startReviewsServer = void 0;
const reviews_schema_1 = require("./database/reviews-schema");
const app_1 = require("./app");
(0, reviews_schema_1.connectReviewSchema)();
const REVIEWS_SERVICE_PORT = process.env.REVIEWS_SERVICE_PORT || 5407;
const startReviewsServer = () => {
    try {
        return app_1.app.listen(REVIEWS_SERVICE_PORT, () => {
            console.log(`Reviews Service server listening for requests on port ${REVIEWS_SERVICE_PORT} in mode: ${process.env.REVIEWS_SERVICE_NODE_ENV}`);
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
};
exports.startReviewsServer = startReviewsServer;
(0, exports.startReviewsServer)();
