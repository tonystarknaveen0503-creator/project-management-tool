import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProjectTable from "../components/ProjectTable";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Header />
        <ProjectTable />
      </div>
    </div>
  );
}

export default Dashboard;