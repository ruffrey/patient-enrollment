import { RISK_PROFILE } from "./RiskProfile";
import { ENROLLMENT_STATUS } from "./EnrollmentStatus";

export type Patient = {
    id: number;
    name: string;
    enrollmentStatus: ENROLLMENT_STATUS;
    riskProfile: RISK_PROFILE;
    riskAdjustmentFactorScore: number;
}