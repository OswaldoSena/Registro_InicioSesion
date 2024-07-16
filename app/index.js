import express from "express";
import cookieParser from "cookie-parser";
import app from "./model/servidor.js"

// requiriendo conexion base de datos
//import { methods as conexion } from "./Connection.js"

//truco __dirname lee archivos estáticos
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//controlador de autenticacion
import { methods as authentication} from "./controller/auth.controller.js";
import {methods as autorization} from "./middleware/authorization.js";

//Configuracion paginas estaticas
app.use(express.static(__dirname + "/views/public"));
app.use(express.json());// lee json
app.use(cookieParser());//modifica las cookies
app.use(express.urlencoded({extended:false}));

//Rutas endpoint con middleware(script meternos en medio de req y res)
app.get("https://oswaldosena.github.io/Registro_InicioSesion/",autorization.soloPublic, (req, res)=>
    res.sendFile(__dirname + "/views/login.html")
);
app.get("/registro",autorization.soloPublic, (req, res)=> 
    res.sendFile(__dirname + "/views/register.html")        
    );
/* app.get("/pagina",autorization.soloAdmin,(req, res)=>
    res.sendFile(__dirname + "/views/agenda/bienvenido.html")
); */
app.get("/pagina",autorization.soloAdmin,(req, res)=>
    res.sendFile(__dirname + "/views/firt.html")
);

// endpoint controlador de la autenticacion
app.post("/api/login",authentication.login);
app.post("/api/registro",authentication.register);
