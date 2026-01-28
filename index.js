import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/index.js";

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "n8n-mcp-server",
  version: "1.0.0",
});

app.post("/mcp", async (req, res) => {
  const result = await server.handleRequest(req.body);
  res.json(result);
});

app.get("/", (req, res) => {
  res.send("MCP Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
