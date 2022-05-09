const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// cors para peticiones a la API
app.use(cors()) 

//Ejecuto el llamado a mis rutas
const routesApi = require('./routes/adminRoutes');
const routesUsers = require('./routes/userRoutes');

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json());

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
    res.send("Bienvenido a AdminGamer")
})

app.use('/api', routesApi);
app.use('/user', routesUsers);

//Activando el servidor desde express
const PORT = process.env.PORT || 3001

app.listen(PORT, function(){
    console.log("servidor escuchando en el", PORT)
});