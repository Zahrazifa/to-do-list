// Array kosong untuk menampung tugas
let tasks = [];

// Ambil elemen HTML
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

// Fungsi untuk menampilkan semua tugas ke dalam <ul>
function renderTasks(filter = "") {
  taskList.innerHTML = ""; // kosongkan dulu
  tasks.forEach((task, index) => {
    // filter berdasarkan input pencarian
    if (task.text.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement('li');

      // teks tugas
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = "task-text";
      if (task.done) {
        span.classList.add("task-done");
      }
      li.appendChild(span);

      // tanggal ditambahkan
      const dateInfo = document.createElement('small');
      dateInfo.textContent = `Ditambahkan pada: ${task.date}`;
      dateInfo.style.display = "block";
      dateInfo.style.color = "gray";
      dateInfo.style.fontSize = "12px";
      li.appendChild(dateInfo);

      // container tombol
      const actions = document.createElement('div');
      actions.className = 'actions';

      // tombol ceklis
      const checkBtn = document.createElement('button');
      checkBtn.textContent = "✔";
      checkBtn.className = "check-btn";
      checkBtn.onclick = function () {
        toggleDone(index);
      };

      // tombol Edit
      const editBtn = document.createElement('button');
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = function () {
        editTask(index);
      };

      // tombol Hapus
      const hps = document.createElement('button');
      hps.textContent = "Hapus";
      hps.className = "hapus-btn";
      hps.onclick = function () {
        deleteTask(index);
      };

      // masukkan tombol ke dalam actions
      actions.appendChild(checkBtn);
      actions.appendChild(editBtn);
      actions.appendChild(hps);

      // masukkan actions ke li
      li.appendChild(actions);

      // masukkan ke <ul>
      taskList.appendChild(li);
    }
  });
  saveTasks(); // simpan tiap kali render
}

// fungsi toggle selesai
function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks(searchInput.value.trim());
}

// fungsi hapus berdasarkan index
function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks(searchInput.value.trim());
}

// fungsi edit berdasarkan index
function editTask(i) {
  const teksbaru = prompt("Edit Tugas:", tasks[i].text); // ambil teksnya
  if (teksbaru !== null && teksbaru.trim() !== "") {
    tasks[i].text = teksbaru.trim(); // update teks
    renderTasks(searchInput.value.trim());
  }
}

// Event listener search
searchInput.addEventListener("input", function () {
  renderTasks(this.value.trim());
});

// Simpan ke localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load dari localStorage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
}

// Event saat form disubmit
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

// jalankan pertama kali
loadTasks();
