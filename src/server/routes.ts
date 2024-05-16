import { Router } from "express";
import {addPatient, getPatients} from "./database/helpers";

const router = Router();

router.get("/api/patients", async (req, res) => {
  const patients = await getPatients();
  return res.json(patients);
});

router.post("/api/patients", async (req, res) => {
  try {
    const fullPatient = await addPatient(req.body);
    res.status(201).json(fullPatient);
  } catch(err: any) {
    res.status(400).json({ error: err.message })
  }
});

export { router }