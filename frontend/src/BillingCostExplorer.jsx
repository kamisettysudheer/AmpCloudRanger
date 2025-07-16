import React from "react";

const awsServices = [
  { name: "Amazon EC2", cost: "$1,200", lastMonth: "$1,200" },
  { name: "Amazon RDS", cost: "$800", lastMonth: "$800" },
  { name: "AWS Lambda", cost: "$500", lastMonth: "$600" },
  { name: "Amazon S3", cost: "$400", lastMonth: "$400" },
  { name: "Other", cost: "$300", lastMonth: "$300" },
];

const BillingCostExplorer = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 1px 8px #e5e7eb", padding: 32, border: "1.5px solid #d1d5db" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: 18, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: 0.5 }}>
          <span style={{ fontWeight: 800 }}>AWS</span>
          <span style={{ marginLeft: 24, fontWeight: 500 }}>Billing Cost Explorer</span>
        </div>
        <button style={exportBtnStyle}>Export</button>
      </div>
      <div style={{ background: "#fafbfc", borderRadius: 8, padding: 18, marginBottom: 24, border: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
          <select style={selectStyle}><option>Service</option></select>
          <select style={selectStyle}><option>Linked Account</option></select>
          <select style={selectStyle}><option>Region</option></select>
          <select style={selectStyle}><option>Usage Type</option></select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Group by</span>
          <select style={selectStyle}><option>Service</option></select>
        </div>
      </div>
      <div style={{ background: "#fafbfc", borderRadius: 8, padding: 18, marginBottom: 24, border: "1px solid #e5e7eb" }}>
        <div style={{ marginBottom: 8, fontWeight: 500, color: "#3b3b3b" }}>
          <span style={{ color: "#5b7fff", fontWeight: 700, marginRight: 8 }}>▇</span> Gruped by <b>Service</b>
          <span style={{ marginLeft: 24, color: "#5b7fff" }}>─</span> Forecased Cost
        </div>
        <svg width="100%" height="180" viewBox="0 0 400 180">
          <rect x="30" y="120" width="24" height="40" fill="#5b7fff" opacity="0.7" />
          <rect x="62" y="110" width="24" height="50" fill="#5b7fff" opacity="0.7" />
          <rect x="94" y="100" width="24" height="60" fill="#5b7fff" opacity="0.7" />
          <rect x="126" y="90" width="24" height="70" fill="#5b7fff" opacity="0.7" />
          <rect x="158" y="80" width="24" height="80" fill="#5b7fff" opacity="0.7" />
          <rect x="190" y="70" width="24" height="90" fill="#5b7fff" opacity="0.7" />
          <rect x="222" y="60" width="24" height="100" fill="#5b7fff" opacity="0.7" />
          <rect x="254" y="50" width="24" height="110" fill="#5b7fff" opacity="0.7" />
          <rect x="286" y="40" width="24" height="120" fill="#5b7fff" opacity="0.7" />
          <rect x="318" y="30" width="24" height="130" fill="#5b7fff" opacity="0.7" />
          <polyline points="30,120 62,110 94,100 126,90 158,80 190,70 222,60 254,50 286,40 318,30 342,20" fill="none" stroke="#5b7fff" strokeWidth="3" />
          <text x="30" y="170" fontSize="13">Jan</text>
          <text x="62" y="170" fontSize="13">Feb</text>
          <text x="94" y="170" fontSize="13">Mar</text>
          <text x="126" y="170" fontSize="13">Apr</text>
          <text x="158" y="170" fontSize="13">May</text>
          <text x="190" y="170" fontSize="13">Jun</text>
          <text x="222" y="170" fontSize="13">Jul</text>
          <text x="254" y="170" fontSize="13">Aug</text>
          <text x="286" y="170" fontSize="13">Sep</text>
          <text x="318" y="170" fontSize="13">Oct</text>
          <text x="342" y="170" fontSize="13">Nov</text>
          <text x="370" y="170" fontSize="13">Dec</text>
          <text x="0" y="130" fontSize="13">100</text>
          <text x="0" y="80" fontSize="13">200</text>
          <text x="0" y="30" fontSize="13">300</text>
        </svg>
      </div>
      <div style={{ background: "#fafbfc", borderRadius: 8, padding: 18, border: "1px solid #e5e7eb" }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Cost Breakdown by Service</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "8px 0" }}>Service</th>
              <th style={{ textAlign: "right", padding: "8px 0" }}>Cost</th>
              <th style={{ textAlign: "right", padding: "8px 0" }}>Last Month</th>
              <th style={{ textAlign: "center", padding: "8px 0" }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {awsServices.map((row, i) => (
              <tr key={row.name} style={{ borderBottom: i < awsServices.length - 1 ? "1px solid #e5e7eb" : undefined }}>
                <td style={{ padding: "8px 0" }}>{row.name}</td>
                <td style={{ textAlign: "right", padding: "8px 0" }}>{row.cost}</td>
                <td style={{ textAlign: "right", padding: "8px 0" }}>{row.lastMonth}</td>
                <td style={{ textAlign: "center", padding: "8px 0" }}>
                  <span style={{ fontSize: 18 }}>↗</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const selectStyle = { padding: "7px 16px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 15, background: "#fff" };
const exportBtnStyle = { border: "1.5px solid #bdbdbd", borderRadius: 8, background: "#fff", fontWeight: 500, fontSize: 16, padding: "8px 24px", cursor: "pointer" };

export default BillingCostExplorer;
