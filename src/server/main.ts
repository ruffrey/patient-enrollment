import express from 'express';
import * as path from 'path';
import { createServer } from 'http';
import { router } from "./routes";

const PORT = 3000
export const app = express();
export const httpServer = createServer(app);

export async function main(): Promise<void> {

    app.use(express.json());
    app.use(express.static('public'));

    app.use(router)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    });

    return new Promise((resolve, reject) => {
        app.once("error", (err) => {
            console.error("Server error", err);
            reject(err);
        });
        httpServer.listen(PORT, () => {
            console.info(`✅ Server running at http://localhost:${PORT}`);
            resolve();
        });
    })

}