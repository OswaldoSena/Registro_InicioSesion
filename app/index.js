import express from "express";
import cookieParser from "cookie-parser";

//truco __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//controlador de autenticacion
import { methods as authentication} from "./controller/auth.controller.js";
import {methods as autorization} from "./middleware/authorization.js";


//Server configuracion dei servidor
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

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

/* app.post("/registro", async (req, res)=>{
    const conexion = await database.postconexion();
    const nuevoUsuario = conexion.query("INSERT INTO usuario VALUES('"+user+"', '"+email+"', '"+pass+")")
    console.log(nuevoUsuario)
}) */
