const { ApolloServer, gql } = require('apollo-server');

// This will act as our mock database
let patients = [];

// Define your type definitions
const typeDefs = gql`
  type Patient {
    id: ID!
    name: String!
    contactInformation: String!
    insuranceDetails: String!
    status: String!
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
    addPatient: (_, { name, contactInformation, insuranceDetails, status }) => {
      const newPatient = {
        id: patients.length + 1,
        name,
        contactInformation,
        insuranceDetails,
        status,
      };

      patients.push(newPatient);

      console.log("Added patient")
      return newPatient;
    },
    updatePatientStatus: (_, { id, status }) => {
      const patientIndex = patients.findIndex((patient) => patient.id === id);

      if (patientIndex !== -1) {
        patients[patientIndex].status = status;
        return patients[patientIndex];
      } else {
        throw new Error('Patient not found');
      }
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
