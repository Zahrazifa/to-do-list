let tasks = [];

const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

function renderTasks(filter = "") {
  taskList.innerHTML = ""; // kosongkan dulu
  tasks.forEach((task, index) => {
    
    if (task.text.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = "task-text";
      if (task.done) {
        span.classList.add("task-done");
      }
      li.appendChild(span);

      const dateInfo = document.createElement('small');
      dateInfo.textContent = `Ditambahkan pada: ${task.date}`;
      dateInfo.style.display = "block";
      dateInfo.style.color = "gray";
      dateInfo.style.fontSize = "12px";
      li.appendChild(dateInfo);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const checkBtn = document.createElement('button');
      checkBtn.textContent = "✔";
      checkBtn.className = "check-btn";
      checkBtn.onclick = function () {
        toggleDone(index);
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = function () {
        editTask(index);
      };

      const hps = document.createElement('button');
      hps.textContent = "Hapus";
      hps.className = "hapus-btn";
      hps.onclick = function () {
        deleteTask(index);
      };

      actions.appendChild(checkBtn);
      actions.appendChild(editBtn);
      actions.appendChild(hps);

      li.appendChild(actions);

      taskList.appendChild(li);
    }
  });
  saveTasks(); 
}

function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks(searchInput.value.trim());
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks(searchInput.value.trim());
}

function editTask(i) {
  const teksbaru = prompt("Edit Tugas:", tasks[i].text); // ambil teksnya
  if (teksbaru !== null && teksbaru.trim() !== "") {
    tasks[i].text = teksbaru.trim(); // update teks
    renderTasks(searchInput.value.trim());
  }
}

searchInput.addEventListener("input", function () {
  renderTasks(this.value.trim());
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault(); // cegah reload
  const newTask = taskInput.value.trim();
  if (newTask) {
    const today = new Date();
    const tanggal = today.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    tasks.push({ text: newTask, done: false, date: tanggal }); // tambahkan tanggal
    renderTasks(searchInput.value.trim()); // tampilkan ulang semua data
    taskInput.value = ""; // kosongkan input
  }
});

loadTasks();

