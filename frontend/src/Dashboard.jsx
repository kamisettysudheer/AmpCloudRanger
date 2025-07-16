
import React, { useEffect, useState } from "react";
import "./App.css";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import MetricsService from "./api/MetricsService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    MetricsService.fetchMetrics()
      .then((data) => {
        console.log("Fetched metrics:", data);
        // Convert array to object for easy access
        const metricsObj = {};
        (data.metrics || []).forEach(m => {
          metricsObj[m.metric] = m.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
        setMetrics(metricsObj);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch metrics");
        setLoading(false);
      });
  }, []);

  // Prepare chart data
  const cpuData = (metrics["CPUUtilization"] || []).map(d => d.value);
  const cpuXAxis = (metrics["CPUUtilization"] || []).map((_, i) => i + 1);
  const memData = (metrics["MemoryUtilization"] || []).map(d => d.value);
  const memXAxis = (metrics["MemoryUtilization"] || []).map((_, i) => i + 1);
  const netData = (metrics["NetworkIn"] || []).map(d => d.value);
  const netXAxis = (metrics["NetworkIn"] || []).map((_, i) => i + 1);

  if (loading) return <div style={{ padding: 32 }}>Loading metrics...</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>Error: {error}</div>;

  return (
    <div className="dashboard-container" style={{ padding: 32, fontFamily: 'sans-serif', background: '#fafbfc', minHeight: '100vh' }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, marginBottom: 24 }}>Dashboard</h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div className="dashboard-card" style={cardStyle}>
          <div style={cardTitleStyle}>Total Spend</div>
          <div style={cardValueStyle}>₹42,300</div>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <div style={cardTitleStyle}>Forecast</div>
          <div style={cardValueStyle}>₹58 000</div>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <div style={cardTitleStyle}>Active Alerts</div>
          <div style={cardValueStyle}>3</div>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <div style={cardTitleStyle}>Top Service</div>
          <div style={cardValueStyle}>R2CZ</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ ...panelStyle, flex: 2, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={panelTitleStyle}>Metrics</div>
            <div>
              <select style={dropdownStyle}>
                <option>Data Range</option>
              </select>
              <select style={dropdownStyle}>
                <option>Service</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 14, marginBottom: 4 ,color:"black"}}>CPU Usage</div>
              <LineChart
                xAxis={[{ data: cpuXAxis }]}
                series={[{ data: cpuData }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 14, marginBottom: 4 }}>Memory Usage</div>
              <LineChart
                xAxis={[{ data: memXAxis }]}
                series={[{ data: memData }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 14, marginBottom: 4 }}>Network Traffic</div>
              <LineChart
                xAxis={[{ data: netXAxis }]}
                series={[{ data: netData }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
              />
            </div>
          </div>
        </div>
        <div style={{ ...panelStyle, flex: 1, minWidth: 260 }}>
          <div style={panelTitleStyle}>Cost by Service</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 10, label: 'ECZ' },
                  { id: 1, value: 8, label: 'SS' },
                  { id: 2, value: 6, label: 'RDS' },
                  { id: 3, value: 4, label: 'Lambda' },
                  { id: 4, value: 2, label: 'Others' },
                ],
              }]}
              width={160}
              height={160}
            />
          </div>
          <div style={{ fontSize: 14, marginLeft: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={legendDot('#8884d8')}></span>ECZ</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={legendDot('#82ca9d')}></span>SS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={legendDot('#ffc658')}></span>RDS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={legendDot('#ff8042')}></span>Lambda</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={legendDot('#d0ed57')}></span>Others</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ ...panelStyle, flex: 2, minWidth: 0 }}>
          <div style={panelTitleStyle}>Alerts</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Condection</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>CPU Usage</td><td>&gt; 80 %</td><td style={{ color: '#d32f2f' }}>Critical</td><td>Active</td></tr>
              <tr><td>Memory Usage</td><td>Memory &gt;75%</td><td style={{ color: '#d32f2f' }}>Critical</td><td>Active</td></tr>
              <tr><td>Networt Traffic</td><td>Disk IOPS &gt; 100</td><td style={{ color: '#ffa000' }}>Warning</td><td>Active</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ ...panelStyle, flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div style={panelTitleStyle}>Reports</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
              <li>Monthly Cost Reports</li>
              <li>Scheduled Reports</li>
            </ul>
          </div>
          <div style={{ marginTop: 16 }}>
            <button style={exportButtonStyle}>Export</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ ...panelStyle, flex: 2, minWidth: 0 }}>
          <div style={panelTitleStyle}>Alerts</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Servitty</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Metric</td><td><div style={barStyle}></div></td><td style={{ color: '#d32f2f' }}>Critical</td><td>Active</td></tr>
              <tr><td>Memory Usage</td><td><div style={barStyle}></div></td><td style={{ color: '#d32f2f' }}>Critirial</td><td>Active</td></tr>
              <tr><td>Network In &gt;200 D</td><td><div style={barStyle}></div></td><td style={{ color: '#ffa000' }}>Warning</td><td>Active</td></tr>
              <tr><td>Disk IOPS &gt; 100</td><td><div style={barStyle}></div></td><td>Active</td><td>Active</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ ...panelStyle, flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={panelTitleStyle}>Reports</div>
            <button style={exportButtonStyle}>Export</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 4px #e5e7eb',
  padding: '20px 32px',
  minWidth: 200,
  textAlign: 'center',
  flex: 1,
};
const cardTitleStyle = { fontSize: 16, color: '#555', marginBottom: 8 };
const cardValueStyle = { fontSize: 28, fontWeight: 600, color: '#222' };
const panelStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 4px #e5e7eb',
  padding: 20,
  flex: 1,
  minWidth: 320,
};
const panelTitleStyle = { fontSize: 18, fontWeight: 500, marginBottom: 8 };
const dropdownStyle = { padding: '4px 10px', borderRadius: 6, border: '1px solid #ddd', marginLeft: 8, fontSize: 14 };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 15 };
const barStyle = { height: 10, background: '#e5e7eb', borderRadius: 4, width: 80, margin: '0 auto' };
const exportButtonStyle = { width: '100%', padding: '10px 0', borderRadius: 6, background: '#222', color: '#fff', fontWeight: 500, fontSize: 16, border: 'none', marginTop: 16 };
const legendDot = (color) => ({ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: color });

export default Dashboard;

// ...existing code...
