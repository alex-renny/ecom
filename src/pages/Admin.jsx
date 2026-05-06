import React, { useState, useEffect } from "react";
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
} from "recharts";

function Admins() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("User")) || [];
    let productData = JSON.parse(localStorage.getItem("Products")) || [];
    let orderData = JSON.parse(localStorage.getItem("Orders")) || [];

    setUsers(userData);
    setProducts(productData);
    setOrders(orderData);
  }, []);

  // Counts
  const adminCount = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.length - adminCount;

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
      fill: "#ffb74d",
    },
    {
      name: "Medium",
      count: orders.filter((order) => Number(order.price) >= 20 && Number(order.price) < 50).length,
      fill: "#ff8a65",
    },
    {
      name: "High",
      count: orders.filter((order) => Number(order.price) >= 50).length,
      fill: "#8e24aa",
    },
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

  // Updated modern colors
  const COLORS = ["#00c6ff", "#0072ff"];

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Dashboard</h2>

      {/* Cards */}
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="admin-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="admin-card">
          <h3>Admins</h3>
          <p>{adminCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="admin-charts">

        {/* Pie Chart */}
        <div className="admin-chartBox">
          <h3>User Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDataChart}
                dataKey="value"
                outerRadius={110}
                innerRadius={55}   // 🔥 donut effect
                paddingAngle={5}
                label
                isAnimationActive={true}
                animationDuration={1200}
              >
                {userDataChart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e1e",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="admin-chartBox">
          <h3>Product Count</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productDataChart}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />

              <XAxis
                dataKey="name"
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />

              <YAxis
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
              />

              <Legend />

              <Bar
                dataKey="count"
                radius={[10, 10, 0, 0]}   // rounded bars
                fill="#00c6ff"
                isAnimationActive={true}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3D Style Order Level Chart */}
        <div className="admin-chartBox">
          <h3>Order Level</h3>

          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={orderLevelData} margin={{ top: 20, right: 20, left: 0, bottom: 15 }}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255,255,255,0.12)"
              />

              <XAxis
                dataKey="name"
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />

              <YAxis
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
              />

              <Legend />

              <Bar
                dataKey="count"
                shape={render3DBar}
                fill="#8e24aa"
                isAnimationActive={true}
                animationDuration={1200}
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
  );
}

export default Admins;