// Pruebas de Git
    const express = require('express');
    const mongoose = require('mongoose')
    const fsPromises = require('fs/promises')
    const app = express();

    app.use(express.json()) 


    // EndPoints
    app.get("/", (request, response) =>{

        response.json( { "message": "Endpoint de HOME"} )
    
    
    })

    app.get("/koders", async (request, response) =>{

        // Vamos a utilizar el modelo para aceder a nuesta bd

        const koders = await Koders.find({})

        console.log( "koders", koders )

        response.json( { "message": "Endpoint funciona"} )
    
    
    })

    app.get("/koders/:id", async (request, response) =>{

        // Vamos a utilizar el modelo para aceder a nuesta bd

        const koders = await Koders.findById( request.params.id )

        console.log( "koders", koders )

        response.json( { "message": "Endpoint funciona"} )
    
    
    })

    //Schemas

    const koderSchema = new mongoose.Schema(
        { 
            name: { 
                type : String,
                minlength: 3,
                maxlength: 20,
                required: true
            },
            edad: { 
                type : Number,
                min: 18,
                max: 150,
                
            },
            gen: { 
                type : String,
                required: true
            },
            modulo: { 
                type : String,
                
            },
            hobbies: { 
                type : [String],
                require: true
            },
            sexo: { 
                type : String,
                enum : ["f", "m", "o"] 
            }         


        });

    // Modelos

    const Koders = mongoose.model("koders", koderSchema)


    // Conexion a la BD
    mongoose.connect( "mongodb+srv://jvreyesa:valerialr2@cluster0.e0j5c.mongodb.net/kodemia")
    .then( () =>{
        console.log("** Se conecto a la bd")

        //Levanta el servidor
        app.listen(8080,()=>{

            console.log("** Servicio Activo en puerto 8080 ")

        })

    }).catch( (err) =>{
        console.log("No se pudo conectar a la bd", err )
    })


 