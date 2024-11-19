// Referencias a la zona de asientos y al botón de compra
const seatingArea = document.getElementById("seatingArea");
const buySeatsButton = document.getElementById("buySeatsButton");

// Verificar si seatingArea existe
if (!seatingArea) {
    console.error("No se encontró el elemento seatingArea en el HTML.");
}

// Colores de cada estado de los asientos
const seatColors = {
    free: "#007bff",       // Azul para asientos libres
    selected: "#ffc107",   // Amarillo para asientos seleccionados
    sold: "#dc3545"        // Rojo para asientos vendidos
};

// Array para almacenar el estado de cada asiento (100 asientos, todos libres inicialmente)
const seats = Array(100).fill("free");

// Generar la cuadrícula de asientos
function generateSeats() {
    seatingArea.innerHTML = ""; // Limpiar el área antes de generar
    seats.forEach((state, index) => {
        const svg = createSeatSVG(seatColors[state]);
        svg.dataset.index = index; // Guardar el índice del asiento

        // Añadir el evento de clic para alternar el estado de asiento a seleccionado
        svg.addEventListener("click", () => toggleSeatSelection(index, svg));
        seatingArea.appendChild(svg);
    });
}

// Función para crear el SVG de un asiento
function createSeatSVG(color) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "seat-svg");
    svg.setAttribute("viewBox", "0 0 24 24");

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", "2");
    rect.setAttribute("y", "2");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "20");
    rect.setAttribute("rx", "5"); // Bordes redondeados
    rect.setAttribute("fill", color);

    svg.appendChild(rect);
    return svg;
}

// Función para alternar entre estado libre y seleccionado al hacer clic en un asiento
function toggleSeatSelection(index, svg) {
    const rect = svg.querySelector("rect");
    if (seats[index] === "free") {
        seats[index] = "selected"; // Cambiar a seleccionado
        rect.setAttribute("fill", seatColors.selected);
    } else if (seats[index] === "selected") {
        seats[index] = "free"; // Cambiar de nuevo a libre
        rect.setAttribute("fill", seatColors.free);
    }
}

// Función para comprar los asientos seleccionados
buySeatsButton.addEventListener("click", () => {
    seats.forEach((state, index) => {
        if (state === "selected") {
            seats[index] = "sold"; // Cambiar a vendido
            const svg = seatingArea.children[index];
            const rect = svg.querySelector("rect");
            rect.setAttribute("fill", seatColors.sold);
        }
    });
    alert("Asientos comprados con éxito.");
});

// Llamar a la función para generar la matriz de asientos
generateSeats();
