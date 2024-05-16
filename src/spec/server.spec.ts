import "./setup"; // must be at top

import { app } from "../server/main";
import supertest = require("supertest")

describe("server", () => {
    it("is alive", () => supertest(app)
        .get("/")
        .expect(200, /root/))
});