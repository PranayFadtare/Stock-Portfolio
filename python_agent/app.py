# python_agent/app.py
import json 
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from agent import initialize_agent, run_agent

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize the agent once when the application starts
try:
    if not os.getenv('OPENAI_API_KEY'):
        raise ValueError("OPENAI_API_KEY not found in environment variables.")
    
    agent_executor = initialize_agent()
    print("AI Agent initialized successfully.")
except Exception as e:
    agent_executor = None
    print(f"Error initializing AI agent: {e}")

@app.route('/api/chatbot', methods=['POST'])
def handle_chat():
    if agent_executor is None:
        return jsonify({"error": "AI agent is not available."}), 503

    # The whole payload from Node.js (may contain query, userId, portfolio)
    payload = request.get_json()

    if not payload.get('query'):
        return jsonify({"error": "Query is a required field."}), 400

    try:
        # Pass the entire payload to the agent runner
        result = run_agent(agent_executor, payload)
        return jsonify({"response": result.get('output')})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to get a response from the agent."}), 500

# ... (keep if __name__ == '__main__':)

if __name__ == '__main__':
    # Use 0.0.0.0 to make it accessible from the Node.js container if using Docker
    app.run(host='0.0.0.0', port=5001, debug=True)