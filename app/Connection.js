import mysql from "mysql2";
import dotenv from "dotenv";
import {methods as nuevoUsuario} from "./controller/auth.controller.js";

dotenv.config();


const conexion = mysql.createConnection({
    host:process.env.host,
    port:process.env.port,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
});
 
conexion.connect ((error)=>{
    if (error) throw error
    console.log("CONECTADO A LA BASE DE DATOS")
});

const agregarUsuario = "INSERT INTO usuario (user, email, pass) VALUES('OS', 'O@gmail.com', '123')"
//"INSERT INTRO usuario SET ?", [nuevoUsuario], 
conexion.query(agregarUsuario,(error,rows)=>{    
        if (error) throw error
        console.log("DATOS INSERTADOS EXITOSAMENTE")
        console.log(rows)
        console.log(nuevoUsuario)
        });


conexion.query("SELECT * FROM usuario", (error, datos)=>{
    if (error) throw error
    console.log("DATOS SOLICITADOS:")
    console.log(datos)
    
}) 
conexion.end();

