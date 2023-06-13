const app = require("./app");//importamos la app
const Anime = require('./controllers/controls'); //importamos clase anime dentro de controllers
const PORT = 3000; //declaramos el puerto

//iniciamos el servidor
let server = app.listen(PORT, () => {
    console.log('Server escuchando por puerto ', PORT);
});

//RUTAS VISTAS
//inicio
app.get(['/', '/home'], (req, res) => {
    //console.log("Hola");
    res.render("home");
});

//acerca
app.get('/about', (req, res) => {
    res.render("about");
});


//muestra todos los animes
app.get('/animes', async (req, res) => {
    try {
        let todos = new Anime
        let final = await todos.findAll();
        res.render('allAnimes', {
            target: final
        });
    } catch (error) {
        res.render = 'allAnimes', {
            error,
        }
    }
});

//mostrar por id
app.get('/animes/:id', async (req, res) => {
    try {
        //let id = req.params.id;
        let { id } = req.params //es lo mismo de arriba
        let todos = new Anime;
        let final = await todos.findById(id);
        //console.log(final);
        res.render('anime', {
            target: [final]
        })
    } catch (error) {
        res.render('anime', {
            error,
        })
    }
});


//ENDPOINTS
//Crear anime
app.post('/animes', async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        console.log(nombre, genero, año, autor);
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al guardar el anime.'
        });
    }
});


//eliminar anime
app.delete('/animes/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let eliminar = new Anime;
        console.log("hola");
        await eliminar.delete(id);
        res.send({
            message: 'Eliminado con exito'
        })
    } catch (error) {
        res.status(500).send({
            message: 'error al eliminar'
            //console.log(error)
        })
    }
});

//Actualizar anime
app.put('/animes', async (req, res) => {
    try {
        let { id, nombre, genero, año, autor } = req.body;
        let newUser = new Anime(nombre, genero, año, autor);
        let respuesta = await newUser.update(id);
        console.log(respuesta);
        if (respuesta) {
            res.status(200).send({ code: 200, message: 'whohu! Exito!' })
        } else {
            res.status(500).send({
                code: 500,
                message: 'Algo salió muy mal..... :O'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'error al actualizar anime'
            //console.log(error);
        })
    }
});

app.all("*", (req, res) => {
    res.status(200).send(`Ruta ${req.method} no encontrada.`);
});

module.exports = server;

