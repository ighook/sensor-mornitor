import { useEffect, useState, useRef } from "react";
import { getCodeList } from "../utils/utils";
import styles from "./Dashboard.module.css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Wrapper } from "@googlemaps/react-wrapper";

// OpenLayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

interface Sensor {
  sensor_id: number;
  sensor_code: string;
  group_id: number;
  type: string;
  name: string;
  unit: string;
  status: string;
  is_active: number;
  connect_status: string;
  threshold_status: string;
  created_at: string;
  updated_at: string;
}

interface SensorStatusStats {
  connect_status: string;
  count: number;
}

interface sensorParams {
  test: number;
}

interface groupParams {
  test: number;
}

interface sensorStatusStatsParams {
  test: number;
}

const GoogleOpenLayers = () => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const googleLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      }),
    });

    const map = new Map({
      target: mapElement.current,
      layers: [googleLayer],
      view: new View({
        center: fromLonLat([126.978, 37.5665]),
        zoom: 15,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-[#444]">
      <div
        ref={mapElement}
        className="w-full h-full"
        style={{ backgroundColor: "#292929" }}
      />
    </div>
  );
};

export default function Dashboard() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorStatusStats, setSensorStatusStats] = useState<
    SensorStatusStats[]
  >([]);

  useEffect(() => {
    getSensors();
    getCodeList("sensor_type");
    getGroups();
    getSensorStatusStats();

    console.log(window.__ENV__.GOOGLE_MAPS_API_KEY);
  }, []);

  function getSensors() {
    let params: sensorParams = {
      test: 1,
    };

    fetch(`${window.__ENV__.API_URL}/sensor/getSensorList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ getSensors ~ data:", data);
        setSensors(data);
      });
  }

  function getSensorStatusStats() {
    let params: sensorStatusStatsParams = {
      test: 1,
    };

    fetch(`${window.__ENV__.API_URL}/sensor/getSensorStatusStats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        setSensorStatusStats(data);
        console.log("🚀 ~ getSensorStatusStats ~ data:", data);
      });
  }

  function getGroups() {
    let params: groupParams = {
      test: 1,
    };

    fetch(`${window.__ENV__.API_URL}/group/getGroupList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ getGroups ~ data:", data);
      });
  }

  return (
    <div className={`${styles.wrapper}`}>
      {/* 센서 상태 */}
      <div className={`${styles.sensorStatusContainer}`}>
        <div className={`${styles.sensorStatusCard} ${styles.online}`}>
          <span className={`${styles.sensorStatusText}`}>정상</span>
          <span className={`${styles.sensorStatusCount}`}>
            {
              sensorStatusStats.find((item) => item.connect_status === "ST01")
                ?.count
            }
          </span>
        </div>
        <div className={`${styles.sensorStatusCard} ${styles.offline}`}>
          <span className={`${styles.sensorStatusText}`}>연결 끊김</span>
          <span className={`${styles.sensorStatusCount}`}>
            {
              sensorStatusStats.find((item) => item.connect_status === "ST02")
                ?.count
            }
          </span>
        </div>
        <div className={`${styles.sensorStatusCard} ${styles.pending}`}>
          <span className={`${styles.sensorStatusText}`}>대기</span>
          <span className={`${styles.sensorStatusCount}`}>
            {
              sensorStatusStats.find((item) => item.connect_status === "ST03")
                ?.count
            }
          </span>
        </div>
        <div className={`${styles.sensorStatusCard} ${styles.error}`}>
          <span className={`${styles.sensorStatusText}`}>오류</span>
          <span className={`${styles.sensorStatusCount}`}>
            {
              sensorStatusStats.find((item) => item.connect_status === "ST04")
                ?.count
            }
          </span>
        </div>
      </div>

      <div className={`${styles.bottomContainer}`}>
        <div className={`${styles.mapContainer}`}>
          <Wrapper apiKey={window.__ENV__.GOOGLE_MAPS_API_KEY} version="beta">
            <GoogleOpenLayers />
          </Wrapper>
        </div>

        <div className={`${styles.sensorListContainer}`}>
          {sensors.map((sensor) => (
            <div
              className={`${styles.sensorItem} ${
                sensor.connect_status == "ST02"
                  ? `${styles.sensorItemDisabled}`
                  : ""
              }`}
              key={sensor.sensor_id}
            >
              <span
                className={`${styles.sensorId} ${
                  styles[sensor.threshold_status] || ""
                }`}
              >
                {sensor.sensor_code}
              </span>
              <span className={`${styles.sensorType}`}>{sensor.type}</span>
              <span className={`${styles.sensorName}`}>{sensor.name}</span>
            </div>
          ))}
        </div>
        {/* <div className={`${styles.sensorListContainer}`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>센서 ID</TableHead>
                <TableHead>타입</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>단위</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensors.map((sensor) => (
                <TableRow key={sensor.sensor_id}>
                  <TableCell>{sensor.sensor_code}</TableCell>
                  <TableCell>{sensor.type}</TableCell>
                  <TableCell>{sensor.name}</TableCell>
                  <TableCell>{sensor.unit}</TableCell>
                  <TableCell>{sensor.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
      </div>
    </div>
  );
}
