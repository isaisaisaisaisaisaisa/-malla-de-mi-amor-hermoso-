// Información de la malla curricular
const asignaturas = {
  "Semestre 1": [
    "Matemáticas I", "Comprensión y Producción de Textos I", "Ética y Valores",
    "Cátedra Constitucional", "Humanidades I", "Derecho Constitucional", "Fundamentos de Administración"
  ],
  "Semestre 2": [
    "Matemáticas II", "Comprensión y Producción de Textos II", "Fundamentos de Contabilidad",
    "Derecho de Sociedades", "Fundamentos de Economía", "Teorías Administrativas"
  ],
  "Semestre 3": [
    "Estadística I", "Fundamentos de Investigación Científica", "Contabilidad Administrativa y Costos",
    "Humanidades II", "Microeconomía", "Administración I"
  ],
  "Semestre 4": [
    "Estadística II", "Historia Empresarial", "Matemáticas Financieras",
    "Derecho Laboral", "Macroeconomía", "Administración II"
  ],
  "Semestre 5": [
    "Investigación de Operaciones", "Geografía Económica", "Mercados Financieros",
    "Fundamentos de Mercados", "Gestión Ambiental", "Comportamiento Organizacional", "Negocios Internacionales"
  ],
  "Semestre 6": [
    "Gerencia de Operaciones", "Iniciativa Empresarial", "Finanzas I",
    "Investigación de Mercados", "Gerencia de Sueldos y Salarios", "Sistemas de Información Administrativos", "Curso Libre I"
  ],
  "Semestre 7": [
    "Buenas Prácticas de Manufactura", "Finanzas II", "Gerencia de Mercados",
    "Gerencia del Talento Humano", "Gerencia Estratégica", "Énfasis I", "Curso Libre II"
  ],
  "Semestre 8": [
    "Plan de Negocios", "Evaluación de Proyectos", "Seminario de Logística",
    "Seguridad y Salud del Trabajo", "Decisiones Empresariales", "Énfasis II", "Curso Libre III"
  ],
  "Semestre 9": [
    "Seminario Gestión del Conocimiento e Innovación", "Seminario de Auditoria Administrativa",
    "Seminario de Tributaria", "Desarrollo Económico", "Énfasis III"
  ],
  "Semestre 10": [
    "Prácticas Empresariales", "Énfasis IV"
  ]
};

// Requisitos entre asignaturas
const requisitos = {
  "Matemáticas II": ["Matemáticas I"],
  "Comprensión y Producción de Textos II": ["Comprensión y Producción de Textos I"],
  "Teorías Administrativas": ["Fundamentos de Administración"],
  "Estadística I": ["Matemáticas II"],
  "Fundamentos de Investigación Científica": ["Comprensión y Producción de Textos II"],
  "Contabilidad Administrativa y Costos": ["Fundamentos de Contabilidad"],
  "Humanidades II": ["Humanidades I"],
  "Microeconomía": ["Fundamentos de Economía"],
  "Administración I": ["Teorías Administrativas"],
  "Estadística II": ["Estadística I"],
  "Matemáticas Financieras": ["Contabilidad Administrativa y Costos"],
  "Macroeconomía": ["Microeconomía"],
  "Administración II": ["Administración I"],
  "Investigación de Operaciones": ["Estadística II"],
  "Geografía Económica": ["Historia Empresarial"],
  "Mercados Financieros": ["Matemáticas Financieras"],
  "Comportamiento Organizacional": ["Administración II"],
  "Gerencia de Operaciones": ["Investigación de Operaciones"],
  "Iniciativa Empresarial": ["Geografía Económica"],
  "Finanzas I": ["Mercados Financieros"],
  "Investigación de Mercados": ["Fundamentos de Mercados"],
  "Gerencia de Sueldos y Salarios": ["Comportamiento Organizacional"],
  "Finanzas II": ["Finanzas I"],
  "Gerencia de Mercados": ["Investigación de Mercados"],
  "Evaluación de Proyectos": ["Finanzas II"],
  "Decisiones Empresariales": ["Gerencia Estratégica"]
};

// Cargar el estado de asignaturas aprobadas
const aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

const contenedor = document.getElementById("malla-curricular");

Object.entries(asignaturas).forEach(([semestre, materias]) => {
  const columna = document.createElement("div");
  columna.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  columna.appendChild(titulo);

  materias.forEach((materia) => {
    const div = document.createElement("div");
    div.className = "asignatura";
    div.textContent = materia;

    if (!cumpleRequisitos(materia)) {
      div.classList.add("bloqueada");
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = `Requiere: ${requisitos[materia].filter(req => !aprobadas.includes(req)).join(", ")}`;
      div.appendChild(tooltip);
    }

    if (aprobadas.includes(materia)) {
      div.classList.add("aprobada");
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("bloqueada")) {
        alert(`¡Aún no puedes aprobar "${materia}"!\nDebes aprobar: ${requisitos[materia].filter(req => !aprobadas.includes(req)).join(", ")}`);
        return;
      }

      div.classList.toggle("aprobada");

      if (div.classList.contains("aprobada")) {
        aprobadas.push(materia);
      } else {
        const index = aprobadas.indexOf(materia);
        if (index > -1) aprobadas.splice(index, 1);
      }

      localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
      location.reload(); // recarga para reflejar desbloqueo
    });

    columna.appendChild(div);
  });

  contenedor.appendChild(columna);
});

function cumpleRequisitos(materia) {
  if (!requisitos[materia]) return true;
  return requisitos[materia].every((req) => aprobadas.includes(req));
}

