import { FaTachometerAlt, FaProjectDiagram, FaTasks } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>Menu</h2>

      <p>
        <FaTachometerAlt className="icon" />
        Dashboard
      </p>

      <p>
        <FaProjectDiagram className="icon" />
        Projects
      </p>

      <p>
        <FaTasks className="icon" />
        Tasks
      </p>

    </div>
  );
}

export default Sidebar;