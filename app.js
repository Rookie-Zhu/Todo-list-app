// 选择元素
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// 加载已有任务
document.addEventListener('DOMContentLoaded', loadTasks);

// 添加任务按钮点击事件
addTaskBtn.addEventListener('click', addTask);

// 添加任务函数
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  addTaskToDOM(task);
  saveTaskToStorage(task);
  taskInput.value = '';
}

// 将任务显示到页面上
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
  li.className = task.completed ? 'completed' : '';

  li.innerHTML = `
    <span>${task.text}</span>
    <button onclick="toggleTask(${task.id})">✔</button>
    <button onclick="deleteTask(${task.id})">✖</button>
  `;

  taskList.appendChild(li);
}

// 切换任务完成状态
function toggleTask(id) {
  const tasks = getTasksFromStorage();
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage(tasks);
    renderTasks();
  }
}

// 删除任务
function deleteTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToStorage(tasks);
  renderTasks();
}

// 渲染任务列表
function renderTasks() {
  taskList.innerHTML = '';
  const tasks = getTasksFromStorage();
  tasks.forEach(addTaskToDOM);
}

// 从LocalStorage加载任务
function loadTasks() {
  renderTasks();
}

// 从LocalStorage获取任务列表
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// 将单个任务保存到LocalStorage
function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

// 保存整个任务列表到LocalStorage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
