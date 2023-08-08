"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
// This will act as our mock database
var patients = [];
// Define your type definitions
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Patient {\n    id: ID!\n    name: String!\n    contactInformation: String!\n    insuranceDetails: String!\n    status: String!\n  }\n\n  type Query {\n    patients: [Patient]\n  }\n\n  type Mutation {\n    addPatient(name: String!, contactInformation: String!, insuranceDetails: String!, status: String!): Patient\n    updatePatientStatus(id: ID!, status: String!): Patient\n  }\n"], ["\n  type Patient {\n    id: ID!\n    name: String!\n    contactInformation: String!\n    insuranceDetails: String!\n    status: String!\n  }\n\n  type Query {\n    patients: [Patient]\n  }\n\n  type Mutation {\n    addPatient(name: String!, contactInformation: String!, insuranceDetails: String!, status: String!): Patient\n    updatePatientStatus(id: ID!, status: String!): Patient\n  }\n"])));
// Define your resolvers
var resolvers = {
    Query: {
        patients: function () { return patients; },
    },
    Mutation: {
        addPatient: function (_, _a) {
            var name = _a.name, contactInformation = _a.contactInformation, insuranceDetails = _a.insuranceDetails, status = _a.status;
            var newPatient = {
                id: patients.length + 1,
                name: name,
                contactInformation: contactInformation,
                insuranceDetails: insuranceDetails,
                status: status,
            };
            patients.push(newPatient);
            console.log("Added patient");
            return newPatient;
        },
        updatePatientStatus: function (_, _a) {
            var id = _a.id, status = _a.status;
            var patientIndex = patients.findIndex(function (patient) { return patient.id === id; });
            if (patientIndex !== -1) {
                patients[patientIndex].status = status;
                return patients[patientIndex];
            }
            else {
                throw new Error('Patient not found');
            }
        },
    },
};
// Create an Apollo Server instance
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
// Start the server
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server ready at ".concat(url));
});
var templateObject_1;
