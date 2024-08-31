const express = require("express"); //Importamos Expres
const fs = require("fs"); // Importamos FileSystem
const app = express(); // instanciamos express

const port = 3000; //Definimos el puerto

app.listen(port, () => console.log("Empezamos con todo"));

app.use(express.json()); // Establecemos un Middleware

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const NewCancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  canciones.push(NewCancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("La nueva cancion a sido agregada");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("La nueva cancion a sido modificada");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("La nueva cancion a sido eliminada");
});
