//Llama a las funciones que interactuan con el backend cuando se carga el documento
$(document).ready(function(){
    get_request("/categorias", "categorias");

  });
  
//Función que hace una petición GET a la url que recibe como parámetro
function get_request(url, name, cat = "") {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var json = JSON.parse(this.responseText);
        var count = Object.keys(json).length;
        if (name=="cursos"){
            show_cursos(json, count, cat);
        }
        else{
            show_response(json, count, name);
        }
    }
    });
    xhr.open("GET", "http://localhost:5000/api" + url);
    xhr.send();
}
  
//Funcion que crea los elementos html necesarios para representar los datos obtenidos en json
function show_response(json, count, name){
    //Creamos el contenedor para añadir un acordeon
    var acordeon = 
    `<!--Accordion Wrapper-->
    <div id="accordion">`
            + create_cards(json, count, name) +
    `</div>
    <!--/.Accordion Wrapper-->`;

    var div = document.createElement('div');
    div.classList.add("container");
    div.innerHTML = acordeon;

    //Añadimos el acordeon al contenedor (div) correspondiente --> categorias
    document.getElementById(name).append(div);
}
  
//Función que genera la tarjetas dentro de un acordeon
function create_cards(json, count, name){
    var i;
    var cards = ``;
    console.log(json);
    for (i = 0; i < count; i++) {
        console.log(json[i])
        cards += 
      `<div class="card">
      <div class="card-header" id="heading${json[i].nombre}">
        <h5 class="mb-0">
          <button class="btn collapsed" data-toggle="collapse" data-target="#collapse${json[i].nombre}" aria-expanded="false" aria-controls="collapse${json[i].nombre}">
            ${json[i].nombre}
          </button>
        </h5>
      </div>
  
      <div id="collapse${json[i].nombre}" class="collapse" aria-labelledby="heading" data-parent="#accordion">
      </div>
    </div>`;
    get_request("/Curso/categoria/" + String(i+1), "cursos", json[i].nombre); 
    }
    return cards;
  }

//Función que representa los cursos que pertenecen a una categoria
function show_cursos(json, count, cat){
    //Creamos el contenedor para añadir un acordeon
    var list = `<ul class="list-group">`;

    for (i = 0; i < count; i++) {
        list += `<li class="list-group-item">
                    <h6>${json[i].titulo}</h6>
                </li>`;
    }

    list +=`</ul>`;

    var div = document.createElement('div');
    div.classList.add("card-body");
    div.innerHTML = list;

    //Añadimos la lista de cursos al contenedor (div) correspondiente
    document.getElementById("collapse"+ cat).append(div);
}

