import { Router } from "express";
import { getPatients } from "./database/helpers";

const router = Router();

router.get("/api/patients", async (req, res) => {
  const patients = await getPatients();
  return res.json(patients);
});

export { router }