import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "./pages/Dashboard";
import GuardedRoute from "./guarded-route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<GuardedRoute component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
