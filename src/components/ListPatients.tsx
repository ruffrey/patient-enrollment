import React from 'react';

// TODO: list of patients, with the following columns:
// - name
// - enrollmentStatus (choice of values in enum EnrollmentStatus)
// - riskProfile (choice of values in enum RiskProfile)
// - riskAdjustmentFactorScore (number)
// TODO: enable updating enrollmentStatus or riskProfile by clicking on the value
// TODO: updating riskProfile should also update riskAdjustmentFactorScore
const ListPatients: React.FC = () => {
  return (
    <div>
      <h2>Patient List</h2>
      {/* List goes here */}
    </div>
  )
}

export default ListPatients;
