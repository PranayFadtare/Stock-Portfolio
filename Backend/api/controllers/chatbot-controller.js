import axios from 'axios';
// 1. Import your trade service
import * as TradeService from '../services/trade-service.js';


const setResponse = (data, response) => {
    response.status(200).json(data);
};

const errorResponse = (err, response) => {
    if (err.response) {
        response.status(err.response.status).json({
            message: "Error from AI service.",
            error: err.response.data
        });
    } else {
        response.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
};

export const queryAgent = async (req, res) => {
    try {
        // 2. Get both query and userId from the request body
        const { query, userId } = req.body;

        if (!query) {
            return res.status(400).json({ message: "Query is required." });
        }
        
        // 3. Prepare the payload for the Python agent
        const pythonPayload = {
            query: query
        };

        // 4. If a userId was sent, fetch the portfolio and add it to the payload
        if (userId) {
            // The getPortfolio function already exists in your trade-service
            const portfolio = await TradeService.getPortfolio(userId);
            if (portfolio && portfolio.length > 0) {
                pythonPayload.portfolio = portfolio;
            }
        }

        // 5. Forward the potentially enriched payload to the Python service
        const agentResponse = await axios.post(process.env.PYTHON_AGENT_URL, pythonPayload);

        setResponse(agentResponse.data, res);

    } catch (error) {
        console.error("Error querying AI agent:", error.message);
        errorResponse(error, res);
    }
};