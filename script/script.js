/*TIPS: *No olvides utilizar el almacenamiento local (localStorage)
para que las tareas queden guardadas en caso
de que la aplicación se cierre.*/

let tasks = []

if(localStorage.getItem("tasks")!=null){
  tasks= JSON.parse(localStorage.getItem("tasks"))
  renderTasks()
  activateEditListeners()
  activateCheckboxListeners()
  activateDeleteListeners()
  activateSaveListeners()
  activateCancelListeners()
  
} 

const countPend = () =>{
  return tasks.filter(task=>!task.status).length

}

function updatePendings(){
  document.querySelector(".todo-count").textContent = countPend()+ " pendiente(s)"
}

function showPend() {
  const pendientes = document.querySelectorAll('.input-controller')
  pendientes.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (check.checked) {
      element.style.display = 'none'
    }
    if (!check.checked) {
      element.style.display = ''
    }
  })

}

function showComp() {
  const completados = document.querySelectorAll('.input-controller')
  completados.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (!check.checked) {
      element.style.display = 'none'
    }
    if (check.checked) {
      element.style.display = ''
    }
  })
  
}

function showAll() {
  const all = document.querySelectorAll('.input-controller')
  all.forEach((element) => {
    const check = element.querySelector('.toggle')
    element.style.display = ''
  })
  
}
function borrarCompletados() {
  const completedTasks = tasks.filter((item) => !item.status  )

  localStorage.setItem('tasks', JSON.stringify(completedTasks))
  location.reload()
}

function displayFooter() {
  let page = `      
      
      <footer class="footer">
        
        <span class="todo-count"><strong>${countPend()}</strong> pendiente(s)</span>
        
        <ul class="filters">
          <li>
            <a onclick="showAll() "class="selected filtro" href="#/">Todos</a>
          </li>
          <li>
            <a onclick="showPend()" class="filtro" href="#/active">Pendientes</a>
          </li>
          <li>
            <a onclick="showComp()" class="filtro" href="#/completed">Completados</a>
          </li>
        </ul>
        <button onclick="borrarCompletados()" id="clear-completed" class="clear-completed">Borrar completados</button>
      </footer>
    `
  document.querySelector('.footer').innerHTML = page
}

// Codigo DOM #1
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo')
    //Llamar la función que crea la tarea.**
    addItem(item.value)
  
  }
})
// funcion para guardar las tareas
function addItem(name){
  name = name.trim();
  if (name !== "") {
    tasks.push({ name: name, status: false, category: "casa", priority: "alta" });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    renderTasks();
    window.location.reload();
  } else {
  
    alert("El nombre de la tarea no puede estar en blanco.");
  }
}
// Codigo DOM #2

// Codigo DOM #3

// Codigo DOM #4

// Codigo DOM #5

// Codigo DOM #6

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll('.cancelBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener('click', () => {
      updateController[i].style.display = 'none'
      inputs[i].disabled = true
      inputs[i].style.border = 'none'
      window.location.reload()
    })
  })
}

// Esta es la lógica para el botón "cancelar" cuando presionas editar una tarea, inserta este código tal cual, el reto está en saber en qué parte de tu código debes usarlo.

//El sistema debe permitir EDITAR o MODIFICAR una tarea.

//El sistema debe permitir ELIMINAR una tarea.

//El sistema debe permitir AGREGAR una o varias tareas tarea.

//El sistema deber permitir MARCAR una tarea como completada

//El sistema debe permitir dar diferentes PRIORIDADES a las tareas
//EJEMPLO:

//Sacar la basura - Prioridad: media

//El sistema debe permitir visualizar tareas por CATEGORÍAS o ETIQUETAS
//EJEMPLO:

/*Categorías disponibles: PENDIENTE, COMPLETADO o TODASE.T.C */

//Recordar llamar las funciones displayItems() y displayFooter() para mostrar
//las tareas en pantalla
displayFooter()
