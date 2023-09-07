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
// funcion para guardar las tareas.
function addItem(name){
  tasks.push({name:name, status:false, category:"casa" , priority:"alta"})
  localStorage.setItem("tasks" , JSON.stringify(tasks))
  
 renderTasks()
 window.location.reload()
}

function renderTasks(){
  let html = ""

    tasks.forEach(task =>{
      html += `
    <div class="item">
                    <div class="input-controller">
                      <input class="toggle" type="checkbox" id="check_0" ${task.status  ?"checked":""}>
                      <textarea disabled="">${task.name}</textarea>
                      <div class="edit-controller">
                        <div>
                          Prioridad
                          <select id="priority" data-task="${task.name}">
                            <option ${task.priority=="Alta"?"selected":""}>Alta</option>
                            <option ${task.priority=="Media"?"selected":""}>Media</option> 
                            <option ${task.priority=="Baja"?"selected":""}>Baja</option> 
                          </select>
                        </div>
                        <div>
                          Categorías
                          <select id="category" data-task="${task.name}">
                              <option ${task.category=="Casa"?"selected":""}>Casa</option> 
                              <option ${task.category=="Trabajo"?"selected":""}>Trabajo</option> 
                              <option ${task.category=="Emprendimiento"?"selected":""}>Emprendimiento</option> 
                            </select>
                        </div>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                        <i class="fa-solid fa-x deleteBtn"></i>
                      </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                     <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>
    `
    
    });
    

 

  
  document.querySelector(".todo-list").innerHTML = html
}
// Codigo DOM #2
// este fragmento permite conservar el estado del checkbox (true o false) en el localStorage

function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle')
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('click', () => {
      tasks[i].status = ch.checked
      localStorage.setItem('tasks', JSON.stringify(tasks))
      updatePendings()
    })
  })
}
// Codigo DOM #3
// Permite que la acción eliminar impacte el DOM del HTML, acá debes agegar algoritmo de eliminar tarea
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn')
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      //Llamar la función que elimina la tarea
      deleteTask(i)
      
    })
  })
}
// funcion para eliminar una tarea 
function deleteTask(index){
  tasks.splice(index,1)
  localStorage.setItem("tasks", JSON.stringify(tasks))
  window.location.reload()
}


// Codigo DOM #4

// Permite que la acción editar de las 2 listas desplegables "prioridad" y "categoría" impacte el DOM del HTML cuando cambies de opción, inserta este código tal cual, el reto está en saber en qué parte de tu código debes usarlo.
function activateEditListeners() {
  const editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  const prioritySelects = document.querySelectorAll(
    '.edit-controller #priority'
  )
  const categorySelects = document.querySelectorAll(
    '.edit-controller #category'
  )

  editBtn.forEach((eb, i) => {
    eb.addEventListener('click', () => {
      updateController[i].style.display = 'block'
      inputs[i].disabled = false

      prioritySelects.value = tasks[i].priority
      categorySelects.value = tasks[i].category
    })
  })

  prioritySelects.forEach((selectPriority,i)=>{
    selectPriority.addEventListener('change', (event) => {
      const selectedIndex = event.target.selectedIndex
      tasks[i].priority = event.target.options[selectedIndex].text
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  
  })
  
  categorySelects.forEach((selectCategory, i)=>{
    
    selectCategory.addEventListener('change', (event) => {
      const selectedIndex = event.target.selectedIndex
      tasks[i].category = event.target.options[selectedIndex].text
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  })
}


// Codigo DOM #5

// Permite que la acción guardar el nuevo nombre de la tarea cuando decides editar y que impacte el DOM del HTML, acá debes agegar algoritmo de actualizar tarea


function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      // Llamar la función que guarda la actualización la tarea
      editTask(i,inputs[i].value)
    })
  })
}
// funcion editar las tareas 
function editTask(index, name){
  tasks[index].name = name
  localStorage.setItem('tasks', JSON.stringify(tasks))
  window.location.reload()
}

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
