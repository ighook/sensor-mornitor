// import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="layout">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
