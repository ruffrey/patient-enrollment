# Requirements for the Coding Exercise

### Enable Routes in App.tsx
- `/add-patient`:
  - Add a new patient with the following input:
    - name
    - riskProfile (choice of values in enum RiskProfile)
- `/patients`:
  - Display a list of patients, with the following columns:
    - id
    - name
    - enrollmentStatus (choice of values in enum EnrollmentStatus)
    - riskProfile (choice of values in enum RiskProfile)
    - riskAdjustmentFactorScore (number)
   - enable updating enrollmentStatus or riskProfile by clicking on the value
   - updating riskProfile should also update riskAdjustmentFactorScore

### Implement GraphQL queries and mutations api in server.ts

- `patients`:
  - Returns an array of all patients
- `addPatient`:
  - Create a new Patient object with the following properties:
    - `id`: a unique id (use one of 1001 or 1002 to match the data in data/riskAdjustmentSampleData.json)
    - `name`: the name passed in as an argument
    - `riskProfile`: the riskProfile passed in as an argument
    - `enrollmentStatus`: default for new patient is ENROLLMENT_STATUS.PROSPECT
  - Compute the `riskAdjustmentFactor` using the `computeRiskAdjustmentFactor` function
  - Set the `riskAdjustmentFactor` property on the new Patient object
  - Save the new Patient object to the `patients` array (our mock database)
- `updatePatientEnrollmentStatus`:
  - Find the patient in the `patients` array with the given id or throw an error if not found
  - Update the `enrollmentStatus` property on the patient object and return the updated patient object
- `updateRiskProfile`:
  - Find the patient in the `patients` array with the given id or throw an error if not found
  - Update the `riskProfile` property on the patient object
  - Compute the new `riskAdjustmentFactorScore` using the `computeRiskAdjustmentFactorScore` function
  - Set the `riskAdjustmentFactor` property on the patient object and return the updated patient object

### Implement functions in server.ts

- `computeRiskAdjustmentFactorScore`:
  -  fetch patient data from data/riskAdjustmentSampleData.json
  -  fetch demographic_coefficients and diagnosis_coefficients from patientData
  -  compute and return RAF Score
     -  RAF Score = ∑(demographic_coefficients) + ∑(diagnosis_coefficients)
  -  return the computed RAF Score


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
