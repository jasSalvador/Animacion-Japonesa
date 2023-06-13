const fs = require('fs');
const { v4: uuid } = require('uuid');
const { leerArchivo, escribirArchivo } = require('./utils.js');

//creamos la clase Anime
class Anime {
    constructor(nombre, genero, año, autor) {
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }

    //leer todo el contenido
    async findAll() {
        //return await leerArchivo('anime.json');
        let data = await leerArchivo('anime.json')
            if(data){
                return data;
            }else {
                alert("Sin datos")
            }
    }

    //buscar por id
    async findById(id) {
        let animes = await this.findAll();
        let animeName = animes.find(anime => anime.nombre.toLowerCase() == id.toLowerCase());
        let animeId = animes.find(anime => anime.id == id);
        if (animeName) {
            return animeName;
        }else if (animeId) {
            return animeId
        } else {
            //console.log(id.length);
            return false
        }
    }

    //crear nuevo anime
    async create() {
        let todos = await this.findAll();
        console.log(todos);
        let newAnime = {
            id: uuid().slice(0, 6),
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,
            autor: this.autor
        }
        todos.push(newAnime);
        await escribirArchivo('anime.json', todos);
        return newAnime;
    }

    //crear metodo eliminar
    async delete(id) {
        console.log(id);
        let todos = await this.findAll();
        //let animeId = await this.findById(id);
        todos = todos.filter(anime => anime.id != id);
        if (todos) {
            await escribirArchivo('anime.json', todos);
            return true
        } else {
            return false
        }
        //return todos;
    }

    //actualizar
    async update(id) {
        let identificador = id || this.id;
        let todos = await this.findAll()
        let newAnime = todos.find(anime => anime.id == identificador);

        if (newAnime) {
            newAnime.nombre = this.nombre;
            newAnime.genero = this.genero;
            newAnime.año = this.año;
            newAnime.autor = this.autor;
            await escribirArchivo('anime.json', todos);
            return newAnime;
        } else {
            return false
        }
    }
};

module.exports = Anime;