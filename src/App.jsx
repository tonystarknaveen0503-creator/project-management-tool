import Dashboard from "./pages/Dashboard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <Router basename="/project-management-tool">
      <Routes>
        <Route path="/" index exact element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
