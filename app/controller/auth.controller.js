import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

//DB 

//DB local
export const usuario = [{
    user: 'admin',
    email: 'y_9_43@hotmail.com',
    pass: '$2a$05$exV90F1GHgdjsDHw4fOkkOFvzBTTWzoCz.5mjjCEyrctp8905uMEO'
}]

async function login(req, res){
    //console.log(req.body);
    const user = req.body.user;
    const pass = req.body.pass;
    
    if (!user || !pass){
        return res.status(400).send({status:"Error", messages:"Los campos están incompletos"})
     }
     const usuarioARevisar = usuario.find(usuario => usuario.user===user)
    
     if (!usuarioARevisar){
       return res.status(400).send({status:"Error", messages:"Error durante el login"})
    }
   //comparación de usuario y password
    const loginCorrecto = await bcrypt.compare(pass, usuarioARevisar.pass);
   console.log(loginCorrecto)
    if(!loginCorrecto){
        return res.status(400).send({status:"Error", messages:"Error durante el login"})
    }
    //Genera token
    const token = jsonwebtoken.sign(
        {user:usuarioARevisar.user},
         process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});

        const cookieOption = {
            expires: process.env.JWT_COOKIE_EXPIRES *24 * 60 *60 * 1000,
            path: "/",
           /*  httpOnly: true,//cookie solo puede acceder en el servidor
            //secure: process.env.NOVE_ENV === 'production', //la cookie solo puede acceder en https
            sameSite: "strict",//la cookie solo puede acceder en el mismo dominio
            maxAge: 24 * 60 *60 * 1000  */        
        }
        res.cookie("jwt", token, cookieOption);
        res.send({status:"ok", messages: "Usuario loggeado", redirect:"/agenda"})
}

async function register(req, res){
    //console.log(req.body);
    const user = req.body.user;
    const email= req.body.email;
    const pass = req.body.pass;
    
    if (!user || !email || !pass){
       return res.status(400).send({status:"Error", messages:"Los campos están incompletos"})
    }
    const usuarioARevisar = usuario.find(usuario => usuario.user===user)
    if (usuarioARevisar){
       return res.status(400).send({status:"Error", messages:"Este usuario ya existe"})
    }
//Encripta el password con 5 sales
    const salt = await bcrypt.genSalt(5);
    const hashPass= await bcrypt.hash(pass, salt);/* hashPass nombre pass encriptado*/ 
    
    const nuevoUsuario = {
        user, email, pass: hashPass
    }
    usuario.push(nuevoUsuario);
    console.log(nuevoUsuario);       
                          
    return res.status(201).send({status:"Ok", messages: `Usuario ${nuevoUsuario.user} aregado`, redirect:"/"});
    
}

/* async function guardar(req, res){
    
    const user = req.body.user;
    const email= req.body.email;
    const pass = req.body.pass;

    const newUser = req.body;

    req.getConnection((error, connect) =>{
        connect.query("INSERT INTRO usuario SET ?", [newUser], (error, rows) =>{
            if (error) throw error
            console.log("funciona")
            console.log(rows);
            
        })

    })
} */

export const methods = {
    login,
    register,
    
};