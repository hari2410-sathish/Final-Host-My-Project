import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getCourseProgress } from "../../api/auth";

export default function ProgressDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCourseProgress(token).then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Course Progress</h2>

      {data.map((p) => (
        <div key={p.id}>
          <h3>{p.course.title}</h3>
          <p>{p.percentage}% Completed</p>
        </div>
      ))}
    </div>
  );
}
