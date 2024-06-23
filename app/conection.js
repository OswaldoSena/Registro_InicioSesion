import {createPool} from "mysql2/promise";

const conexion = createPool({
    host:"localhost",
    port: "3306",
    database: "cita_mantenimiento",
    user: "root",
    password:"oswal"
});

const getusuario = async()=>{
    try{
        const result = await conexion.query("SELECT idusuario, user, pass, email FROM usuario;");
        console.log(result);
    }catch(error){
        console.error(error);
    }
};
getusuario();
conexion.end();