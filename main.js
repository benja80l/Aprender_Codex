// Utilidades para manejo de tareas
function obtenerTareas() {
  try {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    return Array.isArray(tareas) ? tareas : [];
  } catch (e) {
    return [];
  }
}

function guardarTareas(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Sanitiza el texto para evitar inyección de HTML
function sanitizarTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Renderiza la lista de tareas en el DOM
function renderizarTareas(tareas) {
  const lista = document.getElementById('task-list');
  lista.innerHTML = '';
  tareas.forEach((tarea, indice) => {
    const li = document.createElement('li');
    if (tarea.completada) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completada;
    checkbox.addEventListener('change', () => {
      tareas[indice].completada = checkbox.checked;
      guardarTareas(tareas);
      renderizarTareas(tareas);
    });

    const span = document.createElement('span');
    span.innerHTML = sanitizarTexto(tarea.texto);

    // Botón eliminar con SVG
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'delete-btn';
    btnEliminar.title = 'Eliminar tarea';
    btnEliminar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
    `;
    btnEliminar.addEventListener('click', () => {
      tareas.splice(indice, 1);
      guardarTareas(tareas);
      renderizarTareas(tareas);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// Valida y agrega una nueva tarea
function agregarTarea(tareas, texto) {
  const textoLimpio = texto.trim();
  if (!textoLimpio) return false;
  tareas.push({ texto: textoLimpio, completada: false });
  guardarTareas(tareas);
  renderizarTareas(tareas);
  return true;
}

// Inicialización de la app
document.addEventListener('DOMContentLoaded', function inicializarToDoApp() {
  const inputTarea = document.getElementById('new-task');
  const botonAgregar = document.getElementById('add-btn');
  let tareas = obtenerTareas();

  botonAgregar.addEventListener('click', () => {
    if (agregarTarea(tareas, inputTarea.value)) {
      inputTarea.value = '';
    }
  });

  // Permite agregar tarea con Enter
  inputTarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      botonAgregar.click();
    }
  });

  renderizarTareas(tareas);
});

// Ejemplo de test manual (en un archivo JS aparte podrías usar frameworks de test)
// function testAgregarTarea() {
//   const tareas = [];
//   agregarTarea(tareas, 'Probar');
//   console.assert(tareas.length === 1 && tareas[0].texto === 'Probar', 'Error en agregarTarea');
// }
