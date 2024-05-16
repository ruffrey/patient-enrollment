export enum EnrollmentStatus {
  Prospect = "Prospect",
  InsuranceEligibilityVerified = "Insurance Eligibility Verified",
  EnrolledContractSent = "Enrolled Contract Sent",
  EnrolledContractSigned = "Enrolled Contract Signed",
  PatientRecordCreated = "Patient Record Created",
  IntakeAppointmentScheduled = "Intake Appointment Scheduled"
}

export type Patient = {
  id: number;
  name: string;
  enrollmentStatus: EnrollmentStatus;
}

export type PatientRaf = { patientId: number, raf: number, notApplicable: boolean}

type RiskProfileSegment = "CFA" | "CFD" | "CNA" | "CND" | "CPA" | "CPD" | "INS" | "NE" | "SNPNE";

export type PatientRiskProfile = {
  demographicCoefficients?: number[];
  diagnosisCoefficients?: number[];
  segmentDescription: string;
  segmentName: RiskProfileSegment;
  patientId: number;
}

