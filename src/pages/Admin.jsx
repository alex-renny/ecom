import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

function Admins() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      let userData = JSON.parse(localStorage.getItem("User")) || [];
      let productData = JSON.parse(localStorage.getItem("Products")) || [];
      let orderData = JSON.parse(localStorage.getItem("Orders")) || [];

      setUsers(userData);
      setProducts(productData);
      setOrders(orderData);
      setLoading(false);
      
      // Trigger animations after data loads
      setTimeout(() => setAnimateIn(true), 200);
    }, 1500);
  }, []);

  // Counts
  const adminCount = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.length - adminCount;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.price) || 0), 0);
  const activeOrders = orders.filter(o => o.status === "processing" || o.status === "in transit").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  // Chart data
  const userDataChart = [
    { name: "Admins", value: adminCount },
    { name: "Users", value: normalUsers },
  ];

  const productDataChart = [
    { name: "Products", count: products.length },
  ];

  const orderLevelData = [
    {
      name: "Low",
      count: orders.filter((order) => Number(order.price) < 20).length,
      fill: "#f59e0b",
    },
    {
      name: "Medium",
      count: orders.filter((order) => Number(order.price) >= 20 && Number(order.price) < 50).length,
      fill: "#f97316",
    },
    {
      name: "High",
      count: orders.filter((order) => Number(order.price) >= 50).length,
      fill: "#8b5cf6",
    },
  ];

  // Revenue trend data (simulated)
  const revenueTrend = [
    { name: "Mon", revenue: 1200 },
    { name: "Tue", revenue: 2100 },
    { name: "Wed", revenue: 1800 },
    { name: "Thu", revenue: 2900 },
    { name: "Fri", revenue: 3500 },
    { name: "Sat", revenue: 4200 },
    { name: "Sun", revenue: 3800 },
  ];

  // Order status distribution
  const orderStatusData = [
    { name: "Delivered", value: deliveredOrders, color: "#22c55e" },
    { name: "Processing", value: orders.filter(o => o.status === "processing").length, color: "#f59e0b" },
    { name: "In Transit", value: orders.filter(o => o.status === "in transit").length, color: "#3b82f6" },
    { name: "Pending", value: orders.filter(o => !o.status).length, color: "#ef4444" },
  ];

  const shadeColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  };

  const render3DBar = ({ x, y, width, height, fill }) => {
    const depth = 10;
    const topFill = shadeColor(fill, 20);
    const sideFill = shadeColor(fill, -20);

    return (
      <g>
        <path
          d={`M${x},${y} L${x + depth},${y - depth} L${x + width + depth},${y - depth} L${x + width},${y} Z`}
          fill={topFill}
        />
        <path
          d={`M${x + width},${y} L${x + width + depth},${y - depth} L${x + width + depth},${y - depth + height} L${x + width},${y + height} Z`}
          fill={sideFill}
        />
        <rect x={x} y={y} width={width} height={height} fill={fill} />
      </g>
    );
  };

  const COLORS = ["#3b82f6", "#8b5cf6"];
  const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"];

  // Quick action cards data
  const quickActions = [
    {
      title: "Total Users",
      value: users.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
      link: "/UserTable",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Products",
      value: products.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      link: "/AdminProduct",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
      link: "/AdminOrder",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      link: "/AdminOrder",
      trend: "+24%",
      trendUp: true,
    },
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`premium-admin ${animateIn ? 'animate-in' : ''}`}>
      {/* Animated Background */}
      <div className="admin-bg-animation">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="admin-header-right">
          <div className="period-selector">
            <button 
              className={`period-btn ${selectedPeriod === 'today' ? 'active' : ''}`}
              onClick={() => setSelectedPeriod('today')}
            >
              Today
            </button>
            <button 
              className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
              onClick={() => setSelectedPeriod('week')}
            >
              Week
            </button>
            <button 
              className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
              onClick={() => setSelectedPeriod('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {quickActions.map((card, index) => (
          <div
            key={index}
            className={`stat-card ${hoveredCard === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(card.link)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-card-glow" style={{ background: card.gradient }}></div>
            <div className="stat-card-content">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper" style={{ background: card.gradient }}>
                  {card.icon}
                </div>
                <div className="stat-trend">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    className={`trend-arrow ${card.trendUp ? 'up' : 'down'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className={`trend-value ${card.trendUp ? 'positive' : 'negative'}`}>
                    {card.trend}
                  </span>
                </div>
              </div>
              <div className="stat-card-body">
                <span className="stat-value">{card.value}</span>
                <span className="stat-label">{card.title}</span>
              </div>
              <div className="stat-card-footer">
                <span className="view-details">
                  View Details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="admin-charts-grid">
        {/* User Distribution - Donut Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>User Distribution</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chart-card-body">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <defs>
                  {PIE_COLORS.map((color, index) => (
                    <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={shadeColor(color, -20)} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={userDataChart}
                  dataKey="value"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={8}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#555', strokeWidth: 1 }}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {userDataChart.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={`url(#pieGradient${index})`}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend - Area Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Revenue Trend</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chart-card-body">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Count - Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Product Overview</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chart-card-body">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={productDataChart} barSize={60}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {productDataChart.map((entry, index) => (
                    <Cell key={index} fill="url(#barGradient)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Levels - 3D Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Order Levels</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="chart-card-body">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={orderLevelData} margin={{ top: 25, right: 20, left: 0, bottom: 15 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  shape={render3DBar}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {orderLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="admin-quick-links">
        <h3>Quick Management</h3>
        <div className="quick-links-grid">
          <button className="quick-link-card" onClick={() => navigate('/UserTable')}>
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span>Manage Users</span>
          </button>
          <button className="quick-link-card" onClick={() => navigate('/AdminProduct')}>
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span>Manage Products</span>
          </button>
          <button className="quick-link-card" onClick={() => navigate('/AdminOrder')}>
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span>View Orders</span>
          </button>
          <button className="quick-link-card" onClick={() => navigate('/P-List')}>
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span>Product List</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admins;