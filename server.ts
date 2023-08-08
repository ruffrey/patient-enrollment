import express from "express";
import cors from "cors";

const PORT = 3000
const app = express();

async function main () {
  app.use(cors());
  app.use(express.json());

  app.listen(PORT, () => {
    console.info(`✅ Server running at http://localhost:${PORT}`);
  });
}

main().catch(e => console.error("Unexpected server error", e));
