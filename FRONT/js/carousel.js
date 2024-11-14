$(document).ready(function() {
 
    $("#owl-demo").owlCarousel({
   
        navigation : true, // Show next and prev buttons
   
        slideSpeed : 300,
        paginationSpeed : 400,
   
        items : 1, 
        itemsDesktop : false,
        itemsDesktopSmall : false,
        itemsTablet: false,
        itemsMobile : false
   
    });
   
});

document.addEventListener("peliculasCargadas", function () {
    $("#owl-pelis").owlCarousel({
        items: 5,
        itemsDesktop: [1000, 5],
        itemsDesktopSmall: [900, 3],
        itemsTablet: [600, 2],
        itemsMobile: false,
        autoplay: true,
        loop: true,
        margin: 10
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

