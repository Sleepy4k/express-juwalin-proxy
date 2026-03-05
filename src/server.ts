import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware, type Options } from "http-proxy-middleware";
import type { ClientRequest, IncomingMessage, ServerResponse } from "http";
import type { Socket } from "net";

dotenv.config();

const app = express();
const API_URL = process.env.API_URL || "https://api.openai.com";
const API_TOKEN = process.env.API_TOKEN || "your_api_token_here";

const proxyOptions: Options = {
  target: API_URL,
  changeOrigin: true,
  ws: true,
  secure: true,
  on: {
    proxyReqWs: (
      proxyReq: ClientRequest,
      req: IncomingMessage,
      _socket: Socket,
      _options: any,
      _head: Buffer,
    ): void => {
      proxyReq.setHeader("Origin", API_URL);
      proxyReq.setHeader("Authorization", API_TOKEN);
      console.log(`[WS] Proxying request to: ${req.url}`);
    },
    error: (
      err: Error,
      _req: IncomingMessage,
      _res: ServerResponse | Socket,
      _target?: any,
    ): void => {
      console.error("[Proxy Error]", err.message);
    },
  },
};

app.use(cors());

app.use("/api2/json/nodes", createProxyMiddleware(proxyOptions));

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

const HOST = process.env.APP_HOST || "127.0.0.1";
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT as number, HOST, () => {
  console.log(`Proxy server is running at http://${HOST}:${PORT}`);
});
