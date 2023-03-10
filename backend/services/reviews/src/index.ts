import { connectReviewSchema } from './database/reviews-schema';
import {app} from './app';

connectReviewSchema();

const REVIEWS_SERVICE_PORT = process.env.REVIEWS_SERVICE_PORT || 5407;

export const startReviewsServer = () => { // Create the product server to handle GET, POST, DELETE, PUT request 
    
    try {    

        return app.listen(REVIEWS_SERVICE_PORT, () => {
            console.log(`Reviews Service server listening for requests on port ${REVIEWS_SERVICE_PORT} in mode: ${process.env.REVIEWS_SERVICE_NODE_ENV}`);
        })

    } 
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }

}

startReviewsServer();