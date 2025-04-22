document.addEventListener("DOMContentLoaded", function() {
  const selects = document.querySelectorAll(".pregunta_5");

  function actualizarOpciones() {
      let valoresSeleccionados = new Set();

      // Guardar los valores seleccionados
      selects.forEach(select => {
          if (select.value) {
              valoresSeleccionados.add(select.value);
          }
      });

      // Actualizar cada select
      selects.forEach(select => {
          let valorActual = select.value;

          select.querySelectorAll("option").forEach(option => {
              if (option.value !== "" && valoresSeleccionados.has(option.value)) {
                  option.disabled = (option.value !== valorActual);
              } else {
                  option.disabled = false;
              }
          });
      });
  }

  // Agregar evento a cada select
  selects.forEach(select => {
      select.addEventListener("change", actualizarOpciones);
  });

  // **Ejecutar la función al inicio para validar valores preseleccionados**
  actualizarOpciones();

  const peligrosData = {
    Mecánico: {
        consecuencias: [
            "Cortes profundos",
            "Problemas respiratorios",
            "Quemaduras leves"
        ],
        acciones: [
            "Uso de guantes de protección",
            "Ventilar el área de trabajo",
            "Almacenar productos inflamables en lugares seguros"
        ]
    },
    Químico: {
        consecuencias: [
            "Irritación de la piel",
            "Descargas eléctricas",
            "Lesiones por impacto"
        ],
        acciones: [
            "Uso de equipo de protección personal (EPP) adecuado",
            "Revisar el cableado regularmente",
            "Inspeccionar la maquinaria antes de usarla"
        ]
    },
    Eléctrico: {
        consecuencias: [
            "Descargas eléctricas",
            "Golpes por caídas de objetos",
            "Irritación ocular"
        ],
        acciones: [
            "Revisar el estado de los cables y enchufes",
            "Uso de tapabocas",
            "Evitar el uso de herramientas rotativas"
        ]
    },
    Fisicoquímico: {
        consecuencias: [
            "Explosiones",
            "Caídas por superficies resbalosas",
            "Estrés laboral"
        ],
        acciones: [
            "Almacenar productos inflamables en contenedores adecuados",
            "Colocar señalización de advertencia",
            "Realizar pausas activas durante el trabajo"
        ]
    },
    Biológico: {
        consecuencias: [
            "Infecciones",
            "Lesiones musculares",
            "Cortes superficiales"
        ],
        acciones: [
            "Lavado frecuente de manos y uso de desinfectantes",
            "Uso de orejeras de protección",
            "Almacenar herramientas en un lugar seguro"
        ]
    },
    Público: {
        consecuencias: [
            "Agresiones físicas",
            "Exposición a radiaciones",
            "Fracturas por caídas"
        ],
        acciones: [
            "Implementar sistemas de vigilancia y control de acceso",
            "Proveer áreas de descanso",
            "Uso de guantes antiderrapantes"
        ]
    },
    Psicosociales: {
        consecuencias: [
            "Estrés laboral",
            "Golpes por maquinaria",
            "Intoxicación"
        ],
        acciones: [
            "Fomentar un ambiente laboral positivo y comunicación efectiva",
            "Realizar inspecciones de equipos",
            "Uso de respiradores industriales"
        ]
    },
    Ambiental: {
        consecuencias: [
            "Contaminación del aire",
            "Quemaduras eléctricas",
            "Cortes con herramientas"
        ],
        acciones: [
            "Implementar sistemas de reciclaje y reducción de residuos",
            "Uso de botas de seguridad",
            "Realizar ejercicios de estiramiento"
        ]
    },
    Ergonómico: {
        consecuencias: [
            "Lesiones musculoesqueléticas",
            "Explosión de productos químicos",
            "Descargas eléctricas"
        ],
        acciones: [
            "Diseñar puestos de trabajo adaptados a las necesidades físicas de los empleados",
            "Ventilar el área de trabajo",
            "Usar cascos de protección"
        ]
    }
  };

  // Llenar los selects de peligros con las opciones
  document.querySelectorAll('.peligro').forEach(select => {
    Object.keys(peligrosData).forEach(peligro => {
        let option = document.createElement('option');
        option.value = peligro;
        option.textContent = peligro;
        select.appendChild(option);
    });
  });

  // Manejo del cambio en el select de peligro
  document.querySelectorAll('.peligro').forEach(select => {
    select.addEventListener('change', function () {
        let selectedPeligro = this.value;
        let row = this.dataset.row;

        let consecuenciaSelect = document.getElementById(`consecuencia${row}`);
        let accionSelect = document.getElementById(`accion${row}`);

        if (!consecuenciaSelect || !accionSelect) {
            console.error(`No se encontraron los selects de consecuencia o acción para la fila: ${row}`);
            return;
        }

        // Limpiar selects sin usar innerHTML
        while (consecuenciaSelect.firstChild) consecuenciaSelect.removeChild(consecuenciaSelect.firstChild);
        while (accionSelect.firstChild) accionSelect.removeChild(accionSelect.firstChild);

        // Agregar opción por defecto
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione una opción";
        consecuenciaSelect.appendChild(defaultOption);
        accionSelect.appendChild(defaultOption.cloneNode(true));

        if (selectedPeligro) {
            peligrosData[selectedPeligro].consecuencias.forEach(consecuencia => {
                let option = document.createElement('option');
                option.value = consecuencia;
                option.textContent = consecuencia;
                consecuenciaSelect.appendChild(option);
            });

            peligrosData[selectedPeligro].acciones.forEach(accion => {
                let option = document.createElement('option');
                option.value = accion;
                option.textContent = accion;
                accionSelect.appendChild(option);
            });

            consecuenciaSelect.disabled = false;
            accionSelect.disabled = false;
        } else {
            consecuenciaSelect.disabled = true;
            accionSelect.disabled = true;
        }
    });
  });

  // Alternar clase 'selected' en las normas
  document.querySelectorAll('.norma').forEach(norma => {
    norma.addEventListener('click', () => {
        norma.classList.toggle('selected');
    });
  });

  //Función encargada de controlar secciones y preguntas
  function verificarSeccion(seccion) {
    let completado = true;
    document.querySelectorAll(`.seccion${seccion} input, .seccion${seccion} select`).forEach(input => {
      if (!input.value) completado = false;
    });  

    if (seccion === 1) {
        document.getElementById('btnAvanzar').disabled = !completado;
    } else {
        document.getElementById('btnFinalizar').disabled = !completado;
    }
  }

});