import "./setup";
import {app} from "../server/main";
import * as assert from "node:assert/strict"
import {patients} from "../server/database/fakeDatabaseData";
import {EnrollmentStatus} from "../types";
import supertest = require("supertest");

describe("patients", () => {
    describe("list api", () => {
        it("returns all patients without pagination", () => supertest(app)
            .get("/api/patients")
            .then(res => {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.length, 2);
                assert.equal(res.body[0].id, 1001);
                assert.equal(res.body[0].name, "John Doe");
                assert.equal(res.body[0].enrollmentStatus, "Prospect");
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
    describe("risk", () => {
        it("returns risk profile for patient 1001", () => supertest(app)
            .get("/api/patients/1001/risk")
            .expect({
                patientId: 1001,
                raf: 11.846,
                notApplicable: false,
            }));
        it("returns risk profile for patient 1002", () => supertest(app)
            .get("/api/patients/1002/risk")
            .expect({
                patientId: 1002,
                raf: 11.421,
                notApplicable: false,
            }));
        describe("with no risk profiles", () => {
            beforeEach(() => {
                patients.push({
                    id: 1003,
                    name: "Mr Fantastic",
                    enrollmentStatus: EnrollmentStatus.Prospect,
                })
            })
            afterEach(() => patients.pop())
            it("returns N/A", () => supertest(app)
                .get("/api/patients/1003/risk")
                .expect({
                    patientId: 1003,
                    raf: 0,
                    notApplicable: true,
                }));
        });
    });
});