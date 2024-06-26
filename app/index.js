import app from "./servidor.js"
import express from "express";
import cookieParser from "cookie-parser";

// requiriendo conexion base de datos
import { methods as conexion } from "./controller/auth.controller.js"

//truco __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//controlador de autenticacion
import { methods as authentication} from "./controller/auth.controller.js";
import {methods as autorization} from "./middleware/authorization.js";

//Configuracion paginas estaticas
app.use(express.static(__dirname + "/public"));
app.use(express.json());// lee json
app.use(cookieParser());//modifica las cookies
app.use(express.urlencoded({extended:false}));

//Rutas endpoint con middleware(script meternos en medio de req y res)
app.get("/",autorization.soloPublic, (req, res)=>
    res.sendFile(__dirname + "/pages/login.html")
);
app.get("/registro",autorization.soloPublic, (req, res)=> 
    res.sendFile(__dirname + "/pages/register.html")        
    );
app.get("/agenda",autorization.soloAdmin,(req, res)=> 
    res.sendFile(__dirname + "/pages/agenda/agenda.html")
);

// endpoint controlador de la autenticacion
app.post("/api/login",authentication.login);
app.post("/api/registro",authentication.register);