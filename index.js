import express from "express";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/index.js";

const app = express();
app.use(express.json());

const server = new McpServer({
  name: "n8n-mcp-server",
  version: "1.0.0",
});

// TOOL
server.tool(
  "generate_youtube_short",
  "Generate YouTube short using n8n",
  {
    topic: { type: "string" },
    style: { type: "string" },
  },
  async ({ topic, style }) => {
    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      { topic, style }
    );

    return {
      content: [{ type: "text", text: "Video generation started" }],
      data: response.data,
    };
  }
);

// MCP endpoint
app.post("/mcp", async (req, res) => {
  const result = await server.handleRequest(req.body);
  res.json(result);
});

// Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("MCP Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP running on port ${PORT}`);
});

