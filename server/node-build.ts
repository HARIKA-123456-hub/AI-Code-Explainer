import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./index";
import express from "express";

const app = createServer();
const port = Number(process.env.PORT) || 3000;

// In production, serve the built SPA files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Server runs from dist/server/, SPA is in dist/spa/
const distPath = path.resolve(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Simple health endpoint for container platforms (must be before catch-all)
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Handle React Router - serve index.html for all non-API routes
// Use middleware instead of route pattern to avoid path-to-regexp issues
app.use((req, res, next) => {
  // Skip if it's an API route (already handled by createServer routes)
  if (req.path.startsWith("/api/") || req.path === "/health") {
    return next();
  }

  // Skip if the file exists (static files already served)
  // For all other routes, serve index.html for React Router
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
 