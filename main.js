const inputTask = document.querySelector("#inputTask");
const btnAddTask = document.querySelector("#addTask");
const listTask = document.querySelector("#listTask");

function createItem() {
  item = document.createElement("li");

  return item;
}

function createTask(valueInput) {
  console.log(valueInput);
  const item = createItem();
  item.innerHTML = valueInput;
  listTask.appendChild(item);
  createDeleteButton(item);
  cleanInput();
  saveTasks();
}

function inputVerify() {
  if (!inputTask.value) return;
  createTask(inputTask.value);
}

function cleanInput() {
  inputTask.value = "";
  // voltar a selecionar o input
  inputTask.focus();
}
function removeItem(instanceObject) {
  if (instanceObject.classList.contains("delete")) {
    instanceObject.parentElement.remove();
  }
  saveTasks();
}

function createDeleteButton(instance) {
  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-danger", "ml-2", "btn-sm", "delete");
  // outra forma de adicionar um classe ou outros atributos
  //btn.setAttribute('class','delete')
  btn.innerHTML = "Delete";
  instance.appendChild(btn);
  console.log("teste");
}

inputTask.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    inputVerify();
  }
});

btnAddTask.addEventListener("click", (f) => {
  inputVerify();
});
// identifica onde no documento gouve um evento de click
document.addEventListener("click", (event) => {
  // target retorna para qual elemento html o evento (neste caso o evento de click) foi enviado
  const element = event.target;
  removeItem(element);
});

function saveTasks() {
  const getListTask = listTask.querySelectorAll("li");
  const nameTasks = [];
  getListTask.forEach((f) => {
    let cleanText = f.innerText.replace("Delete", "");
    nameTasks.push(cleanText);
  });

  const TASK_JSON = JSON.stringify(nameTasks);
  localStorage.setItem("tasks", TASK_JSON);
}

function loadTasks() {
  const backupTask = localStorage.getItem("tasks");
  const taskConverted = JSON.parse(backupTask);
  for (let task of taskConverted) {
    createTask(task);
    
  }
}

loadTasks();
