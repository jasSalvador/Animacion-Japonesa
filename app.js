const express = require("express"); //importando express
const cors = require("cors"); //importa cors
const path = require ("path");
const {create} = require("express-handlebars");

//ejecutamos express
let app = express();

//creamos instancia de handlebars
const hbs = create({
    partialsDir: ["views/partials/"]
});

//se declara handlebars como motor de plantilla
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

//activamos midlewares
app.use(cors());
app.use(express.json());

//publicamos carp dist de botstrap
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist/')); 

//publicamos carpeta public
app.use(express.static('public'));

//exportamos el modulo
module.exports = app;