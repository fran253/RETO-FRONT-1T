$(document).ready(function () {
    // Carrusel principal de demo
    $("#owl-demo").owlCarousel({
        navigation: true, // Botones de navegación
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1, // Mostrar solo 1 ítem visible
    });
});

document.addEventListener("peliculasCargadas", function () {
    // Carrusel para las películas
    $("#owl-pelis").owlCarousel({
        autoplay: true,
        loop: true,
        margin: 10, 
        responsive: {
            0: {
                items: 1, // En móviles, 1 ítem visible
            },
            600: {
                items: 2, // En tabletas pequeñas, 2 ítems visibles
            },
            900: {
                items: 3, // En tabletas grandes, 3 ítems visibles
            },
            1000: {
                items: 5, // En escritorio, 5 ítems visibles
            },
        },
    });
});


// document.addEventListener("peliculasCargadas", function () {
//     $("#owl-Estrenos").owlCarousel({
//         items: 5,
//         itemsDesktop: [1000, 5],
//         itemsDesktopSmall: [900, 3],
//         itemsTablet: [600, 2],
//         itemsMobile: false,
//         autoplay: true,
//         loop: true,
//         margin: 10
//     });
// });

