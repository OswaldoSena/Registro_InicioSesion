const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const user = e.target.children.user.value
    const pass = e.target.children.pass.value
   
    const res = await fetch("http://localhost:4000/api/login",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user, pass
        })
    });
    if(!res.ok)
        return mensajeError.classList.toggle("hidden", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})
