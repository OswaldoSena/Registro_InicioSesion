import { createPool } from "mysql2/promise";

const pool =createPool({
    host:process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password:process.env.PASSWORD
});
export default pool;





/* import mysql from "mysql2/promise";
import dotenv from "dotenv";


dotenv.config();

const conexion = mysql.createConnection({
    host:process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password:process.env.PASSWORD
});
 conexion.connect((error)=>{
    if (error){
        throw error;
    }else{
        console.log("conexion exitosa")
    }

});  */

 const postusuario = async()=>{
    try{
        const result = await pool.query('INSERT INTO usuario SET ?',[nuevoUsuario]);        
        console.log(result);
    }catch(error){
        console.error(error);
    }
};
postusuario(); 
//conexion.end(); */