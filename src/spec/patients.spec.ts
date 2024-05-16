import "./setup";
import { app } from "../server/main";
import supertest = require("supertest")
import * as assert from "node:assert/strict"

describe("patients", () => {
    describe("list api", () => {
        it("returns all patients without pagination", () => supertest(app)
            .get("/api/patients")
            .then(res => {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.length, 2);
                assert.deepEqual(res.body[0], {
                    id: 1001,
                    name: "John Doe",
                    enrollmentStatus: "Prospect",
                })
                assert.deepEqual(res.body[1], {
                    id: 1002,
                    name: "Jane Doe",
                    enrollmentStatus: "Insurance Eligibility Verified",
                })
            }))
    });
    describe("create patient", () => {
        it("rejects invalid enrollmentStatus", () => supertest(app)
            .post("/api/patients")
            .send({ name: "Slab", enrollmentStatus: "Sent to Baconator" })
            .then(res => {
                assert.strictEqual(res.status, 400);
                assert.strictEqual(res.body.error, "enrollmentStatus is invalid");
            }));
        it("adds patient to internal db and is fetchable", () => supertest(app)
            .post("/api/patients")
            .send({ name: "Dudebro Parrish", enrollmentStatus: "Prospect" })
            .then(async (res) => {
                assert.strictEqual(res.status, 201, res.body);
                assert.deepEqual(res.body, {
                    id: 1003,
                    name: "Dudebro Parrish",
                    enrollmentStatus: "Prospect",
                });
                const patients = await supertest(app)
                    .get("/api/patients")
                    .expect(200)
                    .then(res => res.body);
                assert.equal(patients[patients.length-1].name, "Dudebro Parrish");
                assert.equal(patients[patients.length-1].enrollmentStatus, "Prospect");
            }));
    });
});