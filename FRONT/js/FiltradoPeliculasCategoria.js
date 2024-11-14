document.addEventListener("DOMContentLoaded", function () {
    const categorias = [
            { id: "owl-pelis-estrenos", categoriaId: 1 },
            { id: "owl-pelis-aventura", categoriaId: 2 },
            { id: "owl-pelis-terror", categoriaId: 3 },
            { id: "owl-pelis-cienciaficcion", categoriaId: 4 },
            { id: "owl-pelis-accion", categoriaId: 5 },
            { id: "owl-pelis-animacion", categoriaId: 6 }
        
        ];

    categorias.forEach(categoria => {
        const owlPelis = document.querySelector(`#${categoria.id}`);

        fetch(`https://localhost:7056/CinemaParaiso/Pelicula/categoria?idCategoriaPelicula=${categoria.categoriaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las películas");
                }
                return response.json();
            })
            .then(peliculas => {
                peliculas.forEach(pelicula => {
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add("item");

                    itemDiv.innerHTML = `
                        <a href="/detalle-pelicula/${pelicula.id}" class="pelicula-link">
                            <div class="pelicula">
                                <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
                                <h3>${pelicula.nombre}</h3>
                            </div>
                        </a>
                    `;

                    owlPelis.appendChild(itemDiv);
                });

                // Inicializar OwlCarousel después de cargar las películas
                $(`#${categoria.id}`).owlCarousel({
                    items: 5,
                    responsive: {
                        0: { items: 1 },
                        600: { items: 2 },
                        900: { items: 3 },
                        1000: { items: 5 }
                    },
                    autoplay: true,
                    loop: true,
                    margin: 10
                });
            })
            .catch(error => {
                console.error("Error:", error);
                owlPelis.innerHTML = "<p>Error al cargar las películas</p>";
            });
    });
});
