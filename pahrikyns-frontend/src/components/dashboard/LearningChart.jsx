import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { Box, Typography } from "@mui/material";

const data = [
  { day: "Mon", mins: 40 },
  { day: "Tue", mins: 55 },
  { day: "Wed", mins: 20 },
  { day: "Thu", mins: 75 },
  { day: "Fri", mins: 30 },
  { day: "Sat", mins: 90 },
  { day: "Sun", mins: 60 },
];

export default function LearningChart() {
  return (
    <Box sx={{ height: 250, mt: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
          <XAxis dataKey="day" stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              color: "#fff",
            }}
          />
          <Bar dataKey="mins" fill="#00eaff88" radius={[6, 6, 0, 0]} />
          <Line
            type="monotone"
            dataKey="mins"
            stroke="#7b3fe4"
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
