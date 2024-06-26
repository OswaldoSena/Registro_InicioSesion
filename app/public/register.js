const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async(e)=>{
    
    e.preventDefault();
    //console.log(e.target.children.pass.value)
    const res =await fetch("http://localhost:4000/api/registro",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({//boby solo debe ser texto
            user: e.target.children.user.value,
            email: e.target.children.email.value,
            pass: e.target.children.pass.value
        })
    });
    if(!res.ok)return mensajeError.classList.toggle("hidden", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})
export default res;