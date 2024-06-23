import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuario } from "../controller/auth.controller.js"

dotenv.config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/")
  }
  
  function soloPublic(req,res,next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/agenda")
  }

function revisarCookie(req){
    try{
      const cookieJWT = req.headers.cookie.slice(4);
      const decodificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
      console.log(decodificada)
      const usuarioAResvisar = usuario.find(usuario => usuario.user === decodificada.user);
      console.log(usuarioAResvisar)
      if(!usuarioAResvisar){
        return false
      }
      return true;
    }
    catch{
      return false;
    }
  }


export const methods ={
    soloAdmin,
    soloPublic
}