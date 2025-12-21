import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    console.log("loaded");
    getSensors();
  }, []);

  function getSensors() {
    let params = { 
      test: 1,
    };

    fetch('http://localhost:3000/api/sensor/getSensorList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ getSensors ~ data:", data)
        setSensors(data);
      });
  }
  
  return (
    <div className="dashboard">
      <div className="sensor-list-container">
        <h2>센서 리스트</h2>
        <table>
          <thead>
            <tr>
              <th>센서 ID</th>
              <th>센서 코드</th>
              <th>그룹 ID</th>
              <th>타입</th>
              <th>이름</th>
              <th>단위</th>
              <th>상태</th>
              <th>생성일</th>
              <th>수정일</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.sensor_id}>
                <td>{sensor.sensor_id}</td>
                <td>{sensor.sensor_code}</td>
                <td>{sensor.group_id}</td>
                <td>{sensor.type}</td>
                <td>{sensor.name}</td>
                <td>{sensor.unit}</td>
                <td>{sensor.status}</td>
                <td>{sensor.created_at}</td>
                <td>{sensor.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
