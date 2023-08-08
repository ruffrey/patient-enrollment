import { Patient } from "./src/types/Patient";

const { ApolloServer, gql } = require('apollo-server');

// This will act as our mock database
let patients: Patient[] = [];

// Define your type definitions
const typeDefs = gql`
  type Patient {
    id: ID!
    name: String!
    contactInformation: String!
    insuranceDetails: String!
    status: String!
    riskAdjustmentFactor: Number!
    riskProfile: String!
  }

  type Query {
    patients: [Patient]
  }

  type Mutation {
    addPatient(name: String!, contactInformation: String!, insuranceDetails: String!, status: String!): Patient
    updatePatientStatus(id: ID!, status: String!): Patient
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    patients: () => patients,
  },
  Mutation: {
    addPatient: (_, { name, riskProfile  }) => {
      // TODO: Create a new Patient object with the following properties:
      // - id: a unique id (use one of 1001 or 1002 to match the data in data/riskAdjustmentSampleData.json)
      // - name: the name passed in as an argument
      // - riskProfile: the riskProfile passed in as an argument
      // - enrollmentStatus: default for new patient is ENROLLMENT_STATUS.PROSPECT

      // TODO: Compute the riskAdjustmentFactor using the computeRiskAdjustmentFactor function
      // TODO: Set the riskAdjustmentFactor property on the new Patient object

      // TODO: Save the new Patient object to the patients array (our mock database)

    },
    updatePatientEnrollmentStatus: (_, { id, enrollmentStatus }) => {
      // TODO: Find the patient in the patients array with the given id or throw an error if not found
      // TODO: Update the enrollmentStatus property on the patient object and return the updated patient object
    },
    updateRiskProfile: (_, { id, riskProfile }) => {
      // TODO: Find the patient in the patients array with the given id or throw an error if not found
      // TODO: Update the riskProfile property on the patient object
      // TODO: Compute the new riskAdjustmentFactorScore using the computeRiskAdjustmentFactorScore function
      // TODO: Set the riskAdjustmentFactor property on the patient object and return the updated patient object
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
