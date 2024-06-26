import express from "express";

//Server configuracion dei servidor
const app = express();
app.set("port", process.env.PORTO || 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

export default app;