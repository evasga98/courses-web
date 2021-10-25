//Llama a las funciones que interactuan con el backend cuando se carga el documento
$(document).ready(function(){
  get_request("/cursos/ultimos", "ultimos");
  get_request("/cursos/mejorvalorados", "valorados");
  get_request("/autores", "autores");
});

//Función que hace una petición GET a la url que recibe como parámetro
function get_request(url, name) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    var json = JSON.parse(this.responseText);
    var count = Object.keys(json).length;
    show_response(json, count, name);
  }
  });
  xhr.open("GET", "http://localhost:8090/api" + url);
  xhr.send();
}

//Funcion que crea los elementos html necesarios para representar los datos obtenidos en json
function show_response(json, count, name){
  var i;
  var rows = 0;
  var id_carousel = "carousel_" + name;

  //Creamos el contenedor para añadir un carousel
  var carousel = 
  `<!--Carousel Wrapper-->
  <div id="carousel_${name}" class="carousel slide carousel-multi-item" data-ride="carousel">
    <!--Controls-->
    <div class="carousel-controls">
      <a class="left carousel-control" href="#carousel_${name}" data-slide="prev"><i class="fa fa-chevron-left" style="color:#5a5a5a;"></i></a>
      <a class="btn-floating" href="#carousel_${name}" data-slide="next"><i class="fa fa-chevron-right" style="color:#5a5a5a;"></i></a>
    </div>
    <!--/.Controls-->
    <!--Slides-->
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
      <div class="row">`
        + create_cards(json, count, name) +
  `</div></div></div></div></div>
  <!--/.Carousel Wrapper-->`;

  var div = document.createElement('div');
  div.classList.add("container");
  div.classList.add("my-4");
  div.innerHTML = carousel;

  //Añadimos el carrousel al contenedor (div) correspondiente (ultimos, valorados o autores)
  document.getElementById(name).append(div);
}

//Función que genera la tarjetas dentro de un carusel
function create_cards(json, count, name){
  var i;
  var rows = 0;
  var cards = ``;
  for (i = 0; i < count; i++) {
    rows += 1;
    if (name == "autores"){
      cards += 
      `<div class="col-md-4">
      <div class="card mb-2">
        <img class="mx-auto card-img-top" src=${json[i].thumbnail} alt="Card image cap"  style="max-height:60%";>
        <div class="card-body">
          <h4 class="card-title">${json[i].nombre}</h4>
          <p><i class="fas fa-star fa-1x"></i>  ${json[i].valoracion}</p>
        </div>
      </div>
    </div>`;
      // `<div class="col-md-4">
      //   <div class="card mb-2 text-white">
      //     <img  src=${json[i].thumbnail} alt="Card image cap">
      //     <div class="card-img-overlay">
      //       <h4 class="h5-responsive">${json[i].nombre}</h5>
      //       
      //     </div>
      //   </div>
      // </div>`;
    }
    else {
      cards += 
    `<div class="col-md-4">
      <div class="card mb-2">
        <img class="mx-auto card-img-top" src=${json[i].thumbnail} alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title">${json[i].titulo}</h4>
          <p class="card-text">${json[i].descripcion}</p>
          <a class="btn btn-info button-carousel">Ver curso</a>
        </div>
      </div>
    </div>`;
    }
    
    if (rows == 3){
      rows = 0;
      cards +=`</div> </div><div class="carousel-item"><div class="row">`;
    }
  }
  return cards;
}