import { useState, useEffect } from "react";

function ProjectTable() {

  // ✅ Default Dummy Data
  const defaultProjects = [
    { id: 1, name: "Website UI", tasks: 5, total: 10, status: "Active" },
    { id: 2, name: "React App", tasks: 3, total: 8, status: "Pending" },
    { id: 3, name: "Dashboard Design", tasks: 9, total: 12, status: "Completed" },
  ];

  // ✅ Load from LocalStorage OR Dummy Data
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [newProject, setNewProject] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ Save to LocalStorage (Auto Save)
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // ✅ Add Project
  const addProject = () => {
    if (newProject.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      name: newProject,
      tasks: 0,
      total: 10,
      status: "Active",
    };

    setProjects([...projects, newEntry]);
    setNewProject("");
  };

  // ✅ Add Task
  const addTask = (id) => {
    const updated = projects.map((p) =>
      p.id === id && p.tasks < p.total
        ? { ...p, tasks: p.tasks + 1 }
        : p
    );

    setProjects(updated);
  };

  // ✅ Delete Project
  const deleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
  };

  // ✅ Start Edit
  const startEdit = (project) => {
    setEditId(project.id);
    setEditText(project.name);
  };

  // ✅ Save Edit
  const saveEdit = (id) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, name: editText } : p
    );

    setProjects(updated);
    setEditId(null);
  };

  // ✅ Progress %
  const getProgress = (tasks, total) =>
    Math.floor((tasks / total) * 100);

  return (
    <div>

      {/* Add Project */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Project Name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={addProject} style={{ marginLeft: "10px" }}>
          Add Project
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Tasks</th>
            <th>Progress</th>
            <th>Add Task</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>

              {/* Edit Mode */}
              <td>
                {editId === p.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  p.name
                )}
              </td>

              <td>{p.tasks}/{p.total}</td>

              {/* Progress Bar */}
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: getProgress(p.tasks, p.total) + "%" }}
                  >
                    {getProgress(p.tasks, p.total)}%
                  </div>
                </div>
              </td>

              <td>
                <button
                  onClick={() => addTask(p.id)}
                  disabled={p.tasks === p.total}
                >
                  Add Task
                </button>
              </td>

              {/* Edit Button */}
              <td>
                {editId === p.id ? (
                  <button onClick={() => saveEdit(p.id)}>Save</button>
                ) : (
                  <button onClick={() => startEdit(p)}>Edit</button>
                )}
              </td>

              {/* Delete Button */}
              <td>
                <button onClick={() => deleteProject(p.id)}>
                  Delete
                </button>
              </td>

              <td>{p.status}</td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ProjectTable;