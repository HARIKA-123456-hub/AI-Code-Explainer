import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Only add express plugin in development mode
  // Define plugin inline to avoid static analysis during build
  if (mode === 'development') {
    plugins.push({
      name: "express-plugin",
      apply: "serve", // Only apply during development (serve mode)
      configureServer(server) {
        // Lazy import - only load createServer when needed (during dev server)
        // Dynamic import avoids loading server code during build
        import("./server/index.js").then((module) => {
          const app = module.createServer();
          // Add Express app as middleware to Vite dev server
          server.middlewares.use(app);
        }).catch((err) => {
          console.error("Failed to load server:", err);
        });
      },
    });
  }
  
  return {
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./", "./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };
});
