// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const submitButton = taskForm.querySelector('button[type="submit"]');
  let editingTaskId = null;

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (editingTaskId) {
      const response = await fetch(`/api/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        editingTaskId = null;
        submitButton.textContent = "Add Task";
        fetchTasks();
      } else {
        alert("Failed to update task");
      }
    } else {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        fetchTasks();
      } else {
        alert("Failed to add task");
      }
    }
  });

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <div>
                    <h3 class="font-bold">${task.title}</h3>
                    <p>${task.description}</p>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
      taskList.appendChild(li);
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = button.getAttribute("data-id");
        const task = tasks.find((t) => t.id == taskId);
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        editingTaskId = taskId;
        submitButton.textContent = "Update Task";
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const taskId = button.getAttribute("data-id");
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchTasks();
        } else {
          alert("Failed to delete task");
        }
      });
    });
  };

  fetchTasks();
});
