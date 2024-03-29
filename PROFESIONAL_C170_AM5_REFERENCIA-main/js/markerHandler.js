AFRAME.registerComponent("markerhandler", {
  init: async function () {

    //Toma la colección de platillos desde la base de datos Firebase.
    var dishes = await this.getDishes();

    //Evento markerFound.
    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;      
      this.handleMarkerFound(dishes, markerId);
    });

    //Evento markerLost.
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });

  },
  handleMarkerFound: function (dishes, markerId) {
    // Cambiar la visibilidad del botón div.
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var ratingButton = document.getElementById("rating-button");
    var orderButtton = document.getElementById("order-button");

    // Usar eventos de clic.
    ratingButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Calificar platillo",
        text: "Procesando calificación"
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "¡Gracias por tu orden!",
        text: "¡Recibirás tu orden pronto!"
      });
    });

    // Cambiar el tamaño del modelo a su escala incial.
    var dish = dishes.filter(dish => dish.id === markerId)[0];

    var model = document.querySelector(`#model-${dish.id}`);
    model.setAttribute("position", dish.model_geometry.position);
    model.setAttribute("rotation", dish.model_geometry.rotation);
    model.setAttribute("scale", dish.model_geometry.scale);
  },

  handleMarkerLost: function () {
    // Cambiar la visibilidad del botón div.
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },
  //Tomar la colección de platillos desde la base de datos Firebase.
  getDishes: async function () {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
