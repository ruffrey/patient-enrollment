import React, { useEffect } from 'react';
import { SegmentRaf } from "../../types";
import superagent from "superagent";

export const RiskPage: React.FC = () => {
    const [risks, setRisks] = React.useState<null|SegmentRaf[]>(null);
    const [highest, setHighest] = React.useState<number>(0)
    const [err, setErr] = React.useState<null|string>(null);
    useEffect(() => {
        superagent.get("/api/risk-segments")
            .then((res) => {
                setRisks(res.body);
                setHighest(res.body.reduce((acc, p) => Math.max(acc, p.raf), 0))
            })
            .catch((err) => setErr(JSON.stringify(err?.body || err?.message || err)))
    });

    return (
        <article>
            <a href="/">Root</a>
            <hr/>
            <h1>Risk Segments - highest average across patients</h1>
            {err &&
                <p style={{ color: "red", fontWeight: "bold"}}>
                    {err}
                </p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Segment</th>
                        <th>RAF Score</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>

                    {risks === null ? <tr>
                        <td colSpan={3}>Loading risk segment data...</td>
                    </tr> : risks.map((r, ix) => <tr key={ix}>
                        <td>{r.segmentName}</td>
                        <td>{r.notApplicable ? "N/A" : r.raf}</td>
                        <td>{r.raf === highest ? "Max" : ""}</td>
                    </tr>)}
                </tbody>
            </table>
        </article>
    )
}