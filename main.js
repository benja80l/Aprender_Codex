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

    // --- Grupo: etiqueta visual o select ---
    const groupColors = {
      'Estudio': '#547CF4',
      'Personal': '#49C3A4',
      'Descanso': '#0D00A4'
    };
    const groupName = tarea.grupo || 'Personal';
    let groupLabel;
    let groupSelect;
    let groupLabelContainer = document.createElement('div');
    groupLabelContainer.style.display = 'flex';
    groupLabelContainer.style.alignItems = 'center';

    function showGroupLabel() {
      groupLabel = document.createElement('span');
      groupLabel.className = 'group-label';
      groupLabel.textContent = groupName;
      groupLabel.style.backgroundColor = groupColors[groupName] || '#49C3A4';
      groupLabel.tabIndex = 0;
      groupLabel.style.cursor = 'pointer';
      groupLabel.addEventListener('click', (e) => {
        e.stopPropagation();
        showGroupSelect();
      });
      groupLabel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showGroupSelect();
        }
      });
      groupLabelContainer.innerHTML = '';
      groupLabelContainer.appendChild(groupLabel);
    }

    function showGroupSelect() {
      groupSelect = document.createElement('select');
      ['Estudio', 'Personal', 'Descanso'].forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        if (g === groupName) opt.selected = true;
        groupSelect.appendChild(opt);
      });
      groupSelect.className = 'group-select-inline';
      groupSelect.addEventListener('change', (e) => {
        tareas[indice].grupo = groupSelect.value;
        guardarTareas(tareas);
        renderizarTareas(tareas);
      });
      groupSelect.addEventListener('blur', () => {
        showGroupLabel();
      });
      groupSelect.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          showGroupLabel();
        }
      });
      groupLabelContainer.innerHTML = '';
      groupLabelContainer.appendChild(groupSelect);
      groupSelect.focus();
    }

    showGroupLabel();

    // Botón de menú (ícono de tres puntos)
    const btnMenu = document.createElement('button');
    btnMenu.className = 'delete-btn';
    btnMenu.title = 'Opciones';
    btnMenu.type = 'button';
    btnMenu.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
      <div class="dropdown-menu">
        <button class="dropdown-option edit" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          Editar
        </button>
        <button class="dropdown-option delete" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          Borrar
        </button>
      </div>
    `;

    // Dropdown toggle
    btnMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.delete-btn.open').forEach(b => b.classList.remove('open'));
      btnMenu.classList.toggle('open');
    });
    // Cierra el menú al hacer click fuera
    document.addEventListener('click', function (e) {
      if (!btnMenu.contains(e.target)) {
        btnMenu.classList.remove('open');
      }
    });
    // Cierra el menú con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        btnMenu.classList.remove('open');
      }
    });

    // Eliminar tarea (opción del menú)
    btnMenu.querySelector('.dropdown-option.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      tareas.splice(indice, 1);
      guardarTareas(tareas);
      renderizarTareas(tareas);
    });
    // Editar tarea (opción del menú)
    btnMenu.querySelector('.dropdown-option.edit').addEventListener('click', (e) => {
      e.stopPropagation();
      btnMenu.classList.remove('open');

      // Reemplaza el span por un input
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = tarea.texto;
      inputEdit.className = 'edit-input';
      span.replaceWith(inputEdit);
      inputEdit.focus();
      inputEdit.select();

      let cancelado = false;

      // Guardar cambios
      function guardarEdicion() {
        if (cancelado) return;
        const nuevoTexto = inputEdit.value.trim();
        if (nuevoTexto) {
          tareas[indice].texto = nuevoTexto;
          guardarTareas(tareas);
        }
        renderizarTareas(tareas);
      }

      // Cancelar edición
      function cancelarEdicion() {
        cancelado = true;
        renderizarTareas(tareas);
      }

      inputEdit.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          guardarEdicion();
        } else if (ev.key === 'Escape') {
          cancelarEdicion();
        }
      });

      inputEdit.addEventListener('blur', guardarEdicion);
    });

    // Permite marcar como completa al hacer click en el renglón
    li.addEventListener('click', (e) => {
      if (e.target === checkbox || btnMenu.contains(e.target) || groupLabelContainer.contains(e.target)) return;
      tareas[indice].completada = !tareas[indice].completada;
      guardarTareas(tareas);
      renderizarTareas(tareas);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    // Contenedor para grupo y menú
    const rightContainer = document.createElement('div');
    rightContainer.className = 'right-container';
    rightContainer.appendChild(groupLabelContainer);
    rightContainer.appendChild(btnMenu);
    li.appendChild(rightContainer);
    lista.appendChild(li);
  });
}

// Valida y agrega una nueva tarea
function agregarTarea(tareas, texto) {
  const textoLimpio = texto.trim();
  if (!textoLimpio) return false;
  const grupoValido = 'Personal';
  tareas.push({ texto: textoLimpio, completada: false, grupo: grupoValido });
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
