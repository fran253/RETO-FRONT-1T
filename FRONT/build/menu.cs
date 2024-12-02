* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #07172D;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Jura", sans-serif;
}

.banner #owl-demo {
  height: 50%;
}
.banner #owl-demo .item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  overflow: hidden;
}
.banner #owl-demo .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 65%;
}

.header {
  margin-top: 4%;
  margin-bottom: 1.5%;
  padding: 1px 0;
}
.header .logo .logo-image {
  width: 250px;
  height: auto;
}
.header .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #FFC300;
  display: flex;
  justify-content: center;
  padding: 19px 0;
}
.header .menu a {
  color: black;
  text-decoration: none;
  font-size: 1rem;
  font-family: "Jura", sans-serif;
  margin: 0 60px;
}
.header .menu a:hover {
  color: #333333;
}

.footer {
  width: 100%;
  background-color: #F6C80F;
  color: #07172D;
  padding: 40px 0;
  text-align: center;
}
.footer .footer-links {
  display: flex;
  justify-content: center;
  gap: 40px;
}
.footer .footer-links .column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer .footer-links .column a {
  color: #07172D;
  text-decoration: none;
  font-weight: bold;
}

.reserve-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #F6C80F;
  color: #07172D;
  border: none;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 20px;
}

.banner {
  width: 100%;
  max-width: 100%;
  position: relative;
}
.banner .banner-image {
  width: 100%;
  height: auto;
}

.info-section {
  padding-top: 5%;
}
.info-section .info-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 260px;
  max-width: 1200px;
  margin: 0 auto;
}
.info-section .info-content .info-logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 40px;
  width: 30%;
}
.info-section .info-content .info-logo-text .info-logo {
  width: 100%;
  max-width: 250px;
}
.info-section .info-content .info-logo-text .info-description {
  font-size: 1.2rem;
  line-height: 1.6;
  width: 400px;
}
.info-section .info-content .info-image {
  width: 60%;
  max-width: 600px;
  border-radius: 10px;
}
@media (max-width: 768px) {
  .info-section .info-content {
    flex-direction: column;
    gap: 40px;
  }
  .info-section .info-content .info-logo-text,
  .info-section .info-content .info-image {
    width: 100%;
    max-width: 300px;
  }
  .info-section .info-content .info-logo-text .info-description {
    font-size: 1rem;
  }
}

.cartelera {
  width: 100%;
  max-width: 1300px;
  text-align: center;
  margin-top: 8%;
  margin-bottom: 15%;
}
.cartelera h2 {
  font-size: 100px;
  margin-bottom: 20px;
  color: #fff;
}
.cartelera #owl-pelis {
  margin-top: 5%;
  display: grid;
  gap: 40px;
}
.cartelera #owl-pelis .item {
  height: 400px;
  background: #446bcd;
  margin: 10px;
  color: #fff;
  text-align: center;
}
.cartelera #owl-pelis .item a {
  color: #fff;
  text-decoration: none;
}
.cartelera #owl-pelis .item h3 {
  height: 5%;
  font-size: 16px;
  align-content: start;
}
.cartelera #owl-pelis .pelicula {
  height: 100%;
  width: auto;
  background-color: #446bcd;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.cartelera #owl-pelis .pelicula img {
  width: 100%;
  height: 90%;
  display: block;
}
@media (max-width: 768px) {
  .cartelera h2 {
    font-size: 50px;
  }
  .cartelera #owl-pelis {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .cartelera #owl-pelis .item {
    height: 300px;
  }
  .cartelera #owl-pelis .pelicula img {
    height: 85%;
  }
}

#Estrenos, #Accion, #Animacion, #Terror, #Aventura, #CienciaFiccion {
  width: 100%;
  max-width: 1300px;
  margin-top: 1%;
  margin-bottom: 10%;
}
#Estrenos h2, #Accion h2, #Animacion h2, #Terror h2, #Aventura h2, #CienciaFiccion h2 {
  font-size: 70px;
  margin-bottom: 1%;
  color: #fff;
}
#Estrenos .owl-carousel, #Accion .owl-carousel, #Animacion .owl-carousel, #Terror .owl-carousel, #Aventura .owl-carousel, #CienciaFiccion .owl-carousel {
  margin-top: 1%;
  display: grid;
  gap: 40px;
}
#Estrenos .owl-carousel .item, #Accion .owl-carousel .item, #Animacion .owl-carousel .item, #Terror .owl-carousel .item, #Aventura .owl-carousel .item, #CienciaFiccion .owl-carousel .item {
  height: 400px;
  background: #446BCD;
  margin: 10px;
  color: #FFF;
  text-align: center;
}
#Estrenos .owl-carousel .item a, #Accion .owl-carousel .item a, #Animacion .owl-carousel .item a, #Terror .owl-carousel .item a, #Aventura .owl-carousel .item a, #CienciaFiccion .owl-carousel .item a {
  color: #FFF;
  text-decoration: none;
}
#Estrenos .owl-carousel .item h3, #Accion .owl-carousel .item h3, #Animacion .owl-carousel .item h3, #Terror .owl-carousel .item h3, #Aventura .owl-carousel .item h3, #CienciaFiccion .owl-carousel .item h3 {
  height: 5%;
  font-size: 16px;
  align-content: start;
}
#Estrenos .owl-carousel .pelicula, #Accion .owl-carousel .pelicula, #Animacion .owl-carousel .pelicula, #Terror .owl-carousel .pelicula, #Aventura .owl-carousel .pelicula, #CienciaFiccion .owl-carousel .pelicula {
  height: 100%;
  width: auto;
  background-color: #446BCD;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
#Estrenos .owl-carousel .pelicula img, #Accion .owl-carousel .pelicula img, #Animacion .owl-carousel .pelicula img, #Terror .owl-carousel .pelicula img, #Aventura .owl-carousel .pelicula img, #CienciaFiccion .owl-carousel .pelicula img {
  width: 100%;
  height: 90%;
  display: block;
}

.logo {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.logo__image {
  max-width: 150px;
  height: auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header__nav {
  background-color: #fdd835;
  width: 100%;
  padding: 15px 0;
  text-align: center;
}

.nav__list {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 15%;
  flex-wrap: wrap;
}

.nav__link {
  color: #0f1a34;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: color 0.3s ease;
}

.main-content {
  max-width: 100%;
  padding: 20px;
  text-align: center;
}

.movie-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
  align-items: start;
}

.movie-poster img {
  width: 100%;
  border-radius: 10px;
}

.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}
.movie-details .movie-info {
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
}
.movie-details .movie-info p {
  margin: 0;
}
.movie-details .movie-info strong {
  font-size: 36px;
}
.movie-details .movie-info:not(:last-child) {
  margin-bottom: 20px;
}

.movie-title {
  font-size: 32px;
  font-weight: bold;
}

.movie-trailer {
  order: 3;
  width: 100%;
  text-align: center;
}
.movie-trailer h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.movie-trailer iframe {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}

.seating-section {
  text-align: center;
  margin-top: 20px;
}
.seating-section .seat-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.seating-section .seat-legend .legend-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
}
.seating-section .seat-legend .legend-item .seat-item {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin-right: 10px;
}
.seating-section .seat-legend .legend-item .seat-item.free {
  background-color: blue;
}
.seating-section .seat-legend .legend-item .seat-item.occupied {
  background-color: red;
}
.seating-section .seat-legend .legend-item .seat-item.selected {
  background-color: yellow;
}
.seating-section .seat-legend .legend-item .seat-item.vip {
  background-color: #fdd835;
}

.screen {
  background-color: #5673ea;
  color: #fff;
  margin: 20px auto;
  padding: 10px;
  width: 50%;
  font-weight: bold;
  border-radius: 5px;
}

.seating-area {
  display: grid;
  grid-template-columns: repeat(10, 30px);
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}
.seating-area .seat-item {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.seating-area .seat-item.free {
  background-color: blue;
}
.seating-area .seat-item.occupied {
  background-color: red;
  cursor: not-allowed;
}
.seating-area .seat-item.selected {
  background-color: yellow;
}
.seating-area .seat-item:hover:not(.occupied) {
  transform: scale(1.1);
}

.purchase-button {
  background-color: #5673ea;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.purchase-button:hover {
  background-color: #819aff;
}

.footer {
  background-color: #fdd835;
  padding: 30px 15px;
  text-align: center;
  color: #0f1a34;
}
.footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 767px) {
  .footer__content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}
.footer__column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
  align-items: center;
}
@media (min-width: 767px) {
  .footer__column {
    align-items: flex-start;
  }
}
.footer__text {
  font-size: 12px;
  color: #0f1a34;
  margin: 0;
  cursor: default;
}
.footer__text:hover {
  color: #333;
}
@media (min-width: 767px) {
  .footer__text {
    font-size: 14px;
  }
}

@media (min-width: 767px) {
  .nav__list {
    gap: 30%;
  }
  .movie-details {
    justify-content: space-between;
    margin-top: 50%;
    align-items: start;
  }
}
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
@media (min-width: 768px) {
  .main-content {
    gap: 40px;
  }
}

.movie-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
}
.movie-container__poster-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
}
@media (min-width: 768px) {
  .movie-container__poster-details {
    flex-direction: row;
    justify-content: space-between;
  }
}
.movie-container__poster-image {
  flex: 1;
  display: flex;
  justify-content: center;
}
.movie-container__poster-image img {
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
.movie-container__poster-image img:hover {
  transform: scale(1.05);
}
.movie-container__details {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  text-align: left;
}
.movie-container__details__title {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}
.movie-container__details__title span {
  color: #0f1a34;
  background-color: #F6C80F;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}
.movie-container__details__info {
  font-size: 14px;
}
.movie-container__details__info-label {
  font-weight: bold;
  color: #F6C80F;
}
.movie-container__synopsis {
  margin-top: 40px;
  text-align: left;
  line-height: 1.8;
  padding: 40px;
  background-color: #0f1a34;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.movie-container__synopsis h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
}
.movie-container__synopsis h3::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #F6C80F;
}

.schedule-section {
  margin-top: 40px;
  width: 100%;
}
.schedule-section__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
}
.schedule-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  justify-content: center;
  padding: 10px;
}
.schedule-section__item {
  background-color: #5673ea;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
}
.schedule-section__item:hover {
  background-color: #819aff;
  transform: scale(1.05);
}

.contenedor__pago {
  border: 5px solid #F6C80F;
  border-radius: 15px;
  padding: 30px;
  width: 600px;
  background-color: #002244;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
}

.imagenes__pago {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 20px;
  margin-bottom: 30px;
}

.imagen__pago {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 200px;
  height: 100px;
  border: 3px solid #ffcc00; /* Color amarillo inicial */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.imagen__pago img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.imagen__pago.activo {
  border-color: #446BCD; /* Cambia a rosa cuando se selecciona */
}

.aceptar__pago {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.aceptar__pago input[type=checkbox] {
  margin-right: 15px;
  width: 20px;
  height: 20px;
}
.aceptar__pago label {
  font-size: 16px;
  color: #ffcc00;
}

.total__pago {
  background-color: #336699;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
}
.total__pago p {
  margin: 0;
  color: #e6e6e6;
}
.total__pago p:last-child {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}
.total__pago button {
  background-color: #0000ff;
  color: #ffcc00;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
}

/*# sourceMappingURL=menu.cs.map */
