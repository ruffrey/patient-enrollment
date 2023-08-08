import * as express from 'express';
import * as path from 'path';
import { router } from "./routes";

const PORT = 3000
const app = express();

async function main() {
  app.use(express.json());
  app.use(express.static('public'));

  app.use(router)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.info(`✅ Server running at http://localhost:${PORT}`);
  });
}

main().catch(e => console.error("Unexpected server error", e));
