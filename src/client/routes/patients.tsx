import React, { useEffect } from 'react';
import { Patient, PatientRaf } from "../../types";
import superagent from "superagent";

const enrollmentStatuses = [
    "Prospect",
    "Insurance Eligibility Verified",
    "Enrolled Contract Signed",
    "Patient Record Created",
    "Intake Appointment Scheduled",
];
export const PatientsPage: React.FC = () => {
    const [patients, setPatients] = React.useState<null|(Patient & PatientRaf)[]>(null);
    const [formSubmission, setFormSubmission] = React.useState(1);
    const [formLoading, setFormLoading] = React.useState(false);
    const [name, setName]  = React.useState<string>("");
    const [enrollmentStatus, setEnrollmentStatus] = React.useState<string>(enrollmentStatuses[0]);
    const [err, setErr] = React.useState<null|string>(null);
    const addPatient = (e: React.FormEvent) => {
        e.preventDefault()
        if (formLoading) return;
        setFormLoading(true);
        setErr(null);
        superagent.post("/api/patients")
            .send({
                name,
                enrollmentStatus,
            })
            .then(() => {
                setName("");
                setFormSubmission((v) => v + 1);
                setFormLoading(false)
            })
            .catch((err) => {
                setFormLoading(false);
                setErr(JSON.stringify(err?.body || err?.message || err));
            });
    }
    useEffect(() => {
        superagent.get("/api/patients")
            .then((res) => setPatients(res.body))
            .catch((err) => setErr(JSON.stringify(err?.body || err?.message || err)))
    }, [formSubmission]);

    return (
        <article>
            <a href="/">Root</a>
            <hr/>
            <h1>Patients</h1>
            <p style={{ textAlign: "right" }}>
                <form onSubmit={addPatient}>
                    <input type="text" name="name" placeholder="name" required value={name} onChange={e => {
                        setErr(null)
                        setName(e.target.value)
                    }}/>
                    <select name="enrollmentStatus" value={enrollmentStatus} onChange={e => setEnrollmentStatus(e.target.value)}>
                        {enrollmentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <button type="submit" disabled={!name || formLoading}>Add Patient</button>
                </form>
            </p>
            {err &&
                <p style={{ color: "red", fontWeight: "bold"}}>
                    {err}
                </p>
            }
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>enrollmentStatus</th>
                        <th>RAF Score</th>
                    </tr>
                </thead>
                <tbody>

                    {patients === null ? <tr>
                        <td colSpan={3}>Loading patients...</td>
                    </tr> : patients.map((patient) => <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.enrollmentStatus}</td>
                        <td>{patient.notApplicable ? "N/A" : patient.raf}</td>
                    </tr>)}
                </tbody>
            </table>
        </article>
    )
}