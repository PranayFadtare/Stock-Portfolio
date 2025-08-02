// api/routes/index.js

import userRouter from './user-routes.js';
import tradeRouter from './trade-router.js';
import portfolioRouter from './portfolio-router.js';
import tempRouter from './temp-routes.js';
import chatbotRouter from './chatbot-router.js'; // Import the new router

// Here we mention all the routes from our parent URL
export default (app) => {
    app.use('/user', userRouter);
    app.use('/trade', tradeRouter);
    app.use('/temp', tempRouter);
    app.use('/portfolio', portfolioRouter);
    app.use('/chatbot', chatbotRouter); // Add the new chatbot route
};