# Pine Park Health Coding Challenge

## Getting Started

To start the Express server, run:
1. `npm install`
2. `npm run start`

## Coding Challenge

A simple React app with an Express.js server has been setup to help you get started. You should fork this repo and
complete the following tasks. You may use any libraries you like to complete the challenge.

Please limit yourself to no more than 2 hours for this project, we want to be sure to respect your time. We appreciate
you taking the time to complete this challenge and look forward to reviewing your submission.

### Challenge Tasks

#### Task 1: Display all the patients in the database on the `/patients` route in the React application

Acceptance criteria:
* Patients are displayed as a table with the following columns:
  * id
  * name
  * enrollmentStatus
* Table has a header above it that says of "Patients"

#### Task 2: Add a button that will create a patient in our in-memory datastore

Acceptance criteria:
* Button is labeled "Add Patient" and is located above the table of patients in the right hand corner
* The form to create a new patient accepts the following **required** inputs:
  * name (text field)
  * enrollment status (dropdown with options: "Prospect", "Insurance Eligibility Verified", "Enrollment Contract Signed", "Patient Record Created", "Intake Appointment Scheduled")
* When the form is submitted, the patient is added to the in-memory datastore and the table of fakeDatabaseData is updated to
  include the new patient

#### Task 3: Display the risk adjustment score for each patient in the table of patients

Acceptance criteria:
* Display the computed risk adjustment score (RAF Score) for each patient in a new column named "RAF Score" in the table of 
* Compute the risk adjustment factor score (RAF Score) for each patient by using their `patientRiskProfile` records & the following
  equation
  ```
  RAF Score = ∑(demographicCoefficients) + ∑(diagnosisCoefficients)
  ```
* If no risk profile data exists, display "N/A" in the column


#### Task 4: Calculate & display the risk profile segment that has the highest average score across all patients

Acceptance criteria:
* Display the risk profile segment name ("CFA", "CFD", "CNA", etc.) that has the highest average RAF Score across all patients. 
The segment name along with the average score for that segment should be displayed below the patients table.  
* The same equation as task 3 will be used to calculate the RAF score but this time records should be grouped by `segmentName` 
instead of `patientId` when calculating the RAF score
