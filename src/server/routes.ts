import { Router } from "express";
import { addPatient, getPatientRiskProfile, getPatientsWithRisk } from "./database/helpers";

const router = Router();

router.get("/api/patients", async (req, res) => {
  const patients = await getPatientsWithRisk();
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

router.get("/api/patients/:patientId/risk", async (req, res) => {
    try {
      const [patientRisk] = await getPatientRiskProfile(parseInt(req.params.patientId, 10));
      res.json(patientRisk);
    } catch(err: any) {
      res.status(400).json({ error: err.message });
    }
})

export { router }