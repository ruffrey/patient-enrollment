import { patients, patientRiskProfiles } from "./fakeDatabaseData";
import type {Patient, PatientRaf, PatientRiskProfile} from "../../types";
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
}, {});

export async function getPatientsWithRisk(): Promise<(Patient & PatientRaf)[]> {
  await delay(500);
  const out: (Patient & PatientRaf)[] = [];
  const patientIds = Object.keys(patientsById);
  const rafs = await getPatientRiskProfile(...patientIds.map(i => parseInt(i, 10)));
  for (const raf of rafs) {
    out.push({ ...patientsById[raf.patientId], ...raf });
  }
  return Object.values(out);
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

const sum  = (a: number, d: number) => a + d;
export async function getPatientRiskProfile(...patientIds: number[]): Promise<PatientRaf[]> {
  await delay(500);
  const rafs: PatientRaf[] = [];
  for (const patientId of patientIds) {
    const profiles = patientRiskProfilesById[patientId] || [];
    const raf = profiles.reduce((acc, p: PatientRiskProfile) => {
      return acc + (p.demographicCoefficients || []).reduce(sum, 0) + (p.diagnosisCoefficients || []).reduce(sum, 0);
    }, 0);
    rafs.push({
      patientId,
      raf,
      notApplicable: profiles.length === 0,
    });
  }

  return rafs;
}