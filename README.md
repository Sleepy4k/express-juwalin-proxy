# Juwalin Proxy Server

Juwalin Proxy Server is a Node.js application that acts as a reverse proxy for API requests. It is designed to forward requests to a specified target API while adding necessary headers for authentication and CORS support.

## Features

- Proxies API requests to a target URL
- Adds CORS headers to allow cross-origin requests
- Supports WebSocket connections
- Configurable target URL and API token via environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sleepy4k/express-juwalin-proxy.git
   cd express-juwalin-proxy
   ```

2. Install dependencies:
   ```bash
    bun install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
    API_URL=https://api.openai.com
    API_TOKEN=your_api_token_here
    PORT=3000
    ```

4. Start the server:
   ```bash
    bun start
    ```

## Usage

Once the server is running, you can send API requests to `http://localhost:3000/api2/json/nodes` and they will be proxied to the target API specified in the `API_URL` environment variable. The server will also handle WebSocket connections and add the necessary headers for authentication.
