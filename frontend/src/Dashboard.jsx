
import React, { useEffect, useState } from "react";
import "./App.css";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import MetricsService from "./api/MetricsService";

// Dummy cost fetcher for now, replace with backend call when available
const fetchCostByService = async () => {
  // Simulate backend response
  return [
    { id: 0, value: 1200, label: 'EC2' },
    { id: 1, value: 800, label: 'RDS' },
    { id: 2, value: 500, label: 'Lambda' },
    { id: 3, value: 400, label: 'S3' },
    { id: 4, value: 300, label: 'Other' },
  ];
};

const Dashboard = () => {
  // Dark mode toggle (must be before any early return)
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [costByService, setCostByService] = useState([]);




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
    // Fetch cost by service (replace with backend call when available)
    fetchCostByService().then(setCostByService);
  }, []);

  // Prepare chart data
  const cpuData = (metrics["CPUUtilization"] || []).map(d => d.value);
  const cpuXAxis = (metrics["CPUUtilization"] || []).map((_, i) => i + 1);
  const memData = (metrics["MemoryUtilization"] || []).map(d => d.value);
  const memXAxis = (metrics["MemoryUtilization"] || []).map((_, i) => i + 1);
  const netData = (metrics["NetworkIn"] || []).map(d => d.value);
  const netXAxis = (metrics["NetworkIn"] || []).map((_, i) => i + 1);

  // Chart colors based on theme
  const chartColors = {
    cpu: dark ? '#ff6347' : '#8884d8',
    memory: dark ? '#00bfff' : '#ffc658', 
    network: dark ? '#32cd32' : '#82ca9d',
    pie: dark ? ['#ff6347', '#00bfff', '#32cd32', '#ffd700', '#dc143c'] : ['#8884d8', '#ffc658', '#82ca9d', '#ff8042', '#d0ed57']
  };

  // Chart styling for dark theme
  const chartStyle = {
    backgroundColor: dark ? '#23272f' : '#ffffff',
    color: dark ? '#e5e7eb' : '#000000'
  };

  // Bar style for tables
  const barStyle = { 
    height: 10, 
    background: dark ? '#374151' : '#e5e7eb', 
    borderRadius: 4, 
    width: 80, 
    margin: '0 auto' 
  };

  if (loading) return <div style={{ padding: 32 }}>Loading metrics...</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>Error: {error}</div>;


  return (
    <div className={`dashboard-container${dark ? ' dark' : ''}`} style={{ padding: 32, fontFamily: 'sans-serif', background: dark ? '#181a20' : '#fafbfc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontWeight: 600, fontSize: 28, color: dark ? '#e5e7eb' : '#222' }}>Dashboard</h2>
        <button onClick={() => setDark(d => !d)} style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid #bdbdbd', background: dark ? '#23272f' : '#fff', color: dark ? '#e5e7eb' : '#222', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div className="dashboard-card">
          <div className="card-title">Total Spend</div>
          <div className="card-value">₹42,300</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">Forecast</div>
          <div className="card-value">₹58 000</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">Active Alerts</div>
          <div className="card-value">3</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">Top Service</div>
          <div className="card-value">R2CZ</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div className="panel" style={{ flex: 2, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="panel-title">Metrics</div>
            <div>
              <select className="dropdown">
                <option>Data Range</option>
              </select>
              <select className="dropdown">
                <option>Service</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div className="chart-label">CPU Usage</div>
              <LineChart
                xAxis={[{ data: cpuXAxis, scaleType: 'point' }]}
                series={[{ 
                  data: cpuData, 
                  color: chartColors.cpu,
                  showMark: true
                }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
                sx={{
                  '& .MuiChartsAxis-line': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tick': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tickLabel': {
                    fill: dark ? '#9ca3af' : '#666',
                  },
                  backgroundColor: chartStyle.backgroundColor
                }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div className="chart-label">Memory Usage</div>
              <LineChart
                xAxis={[{ data: memXAxis, scaleType: 'point' }]}
                series={[{ 
                  data: memData, 
                  color: chartColors.memory,
                  showMark: true
                }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
                sx={{
                  '& .MuiChartsAxis-line': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tick': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tickLabel': {
                    fill: dark ? '#9ca3af' : '#666',
                  },
                  backgroundColor: chartStyle.backgroundColor
                }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div className="chart-label">Network Traffic</div>
              <LineChart
                xAxis={[{ data: netXAxis, scaleType: 'point' }]}
                series={[{ 
                  data: netData, 
                  color: chartColors.network,
                  showMark: true
                }]}
                height={260}
                width={320}
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                grid={{ horizontal: false, vertical: false }}
                sx={{
                  '& .MuiChartsAxis-line': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tick': {
                    stroke: dark ? '#374151' : '#e5e7eb',
                  },
                  '& .MuiChartsAxis-tickLabel': {
                    fill: dark ? '#9ca3af' : '#666',
                  },
                  backgroundColor: chartStyle.backgroundColor
                }}
              />
            </div>
          </div>
        </div>
        <div className="panel" style={{ flex: 1, minWidth: 260 }}>
          <div className="panel-title">Cost by Service</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
            <PieChart
              series={[{
                data: costByService,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              }]}
              width={160}
              height={160}
              colors={chartColors.pie}
              sx={{
                '& .MuiChartsLegend-root': {
                  fill: dark ? '#e5e7eb' : '#000',
                },
                '& .MuiChartsTooltip-root': {
                  backgroundColor: dark ? '#23272f' : '#fff',
                  color: dark ? '#e5e7eb' : '#000',
                  border: `1px solid ${dark ? '#374151' : '#e5e7eb'}`,
                },
                backgroundColor: chartStyle.backgroundColor
              }}
            />
          </div>
          <div style={{ fontSize: 14, marginLeft: 8, color: dark ? '#e5e7eb' : '#222' }}>
            {costByService.map((item, idx) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={legendDot(chartColors.pie[idx % chartColors.pie.length])}></span>{item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div className="panel" style={{ flex: 2, minWidth: 0 }}>
          <div className="panel-title">Alerts</div>
          <table className="dashboard-table">
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
        <div className="panel" style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div className="panel-title">Reports</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, color: dark ? '#e5e7eb' : '#222' }}>
              <li>Monthly Cost Reports</li>
              <li>Scheduled Reports</li>
            </ul>
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="export-button">Export</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div className="panel" style={{ flex: 2, minWidth: 0 }}>
          <div className="panel-title">Alerts</div>
          <table className="dashboard-table">
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
        <div className="panel" style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div className="panel-title">Reports</div>
            <button className="export-button">Export</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// barStyle moved inside component to use theme
const legendDot = (color) => ({ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: color });

export default Dashboard;

// ...existing code...
