import { patients, patientRiskProfiles } from "./fakeDatabaseData";
import type { Patient, PatientRiskProfile } from "../../types";
import { EnrollmentStatus } from "../../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let patientsById: Record<string, Patient> = {};
const computePatientMap = () => {
  patientsById = patients.reduce((acc: {[patientId: number]: Patient}, patient) => {
    acc[patient.id] = patient;
    return acc;
  }, [])
};
computePatientMap();

const patientRiskProfilesById = patientRiskProfiles.reduce((acc: {[patientId: number]: PatientRiskProfile[]}, patient) => {
  if (!acc[patient.patientId]) {
    acc[patient.patientId] = [];
  }
  acc[patient.patientId].push(patient);
  return acc;
}, []);

export async function getPatients() {
  await delay(500);
  return Object.values(patientsById);
}

export async function addPatient(patient: Patient): Promise<Patient> {
  if (!patient.name) {
    throw new Error("name is required");
  }
  if (!patient.enrollmentStatus) {
      throw new Error("enrollmentStatus is required");
  }
  if (!Object.values(EnrollmentStatus).includes(patient.enrollmentStatus)) {
    throw new Error("enrollmentStatus is invalid");
  }
  await delay(500);
  const nextId = Math.max(...Object.keys(patientsById)
      .map(i => parseInt(i, 10))
      ) + 1;
  patients.push({
    id: nextId,
    name: patient.name,
    enrollmentStatus: patient.enrollmentStatus as EnrollmentStatus
  });
  computePatientMap();
  const newPatient = patientsById[nextId];
  console.log("Inserted patient", newPatient);
  return newPatient;
}

export async function getPatientRiskProfiles() {
  await delay(500);
  return Object.values(patientRiskProfilesById).flat();
}
