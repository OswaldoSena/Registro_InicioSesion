import express from "express";
import cookieParser from "cookie-parser";

//truco __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//controlador de autenticacion
import { methods as authentication} from "./controller/auth.controller.js";
import {methods as autorization} from "./middleware/authorization.js";

//Server
import app from "./server/ServerConfiguration.js"

//Configuracion paginas estaticas archivos publicos
app.use(express.static(__dirname + "/public"));
//middleware
app.use(express.json());// lee json
app.use(cookieParser());//modifica las cookies
app.use(express.urlencoded({extended: false})); 
//Rutas endpoint con middleware
app.get("/",autorization.soloPublic,(req, res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/registro",autorization.soloPublic,(req, res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/agenda",autorization.soloAdmin,(req, res)=> res.sendFile(__dirname + "/pages/agenda/agenda.html"));

// endpoint controlador de la autenticacion
app.post("/api/login",authentication.login);
app.post("/api/registro",authentication.register);

export default app;