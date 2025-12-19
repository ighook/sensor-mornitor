import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
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
        console.log(data);
        setSensors(data);
      });
  }
  
  return (
    <div>대시보드</div>
  )
}
