const app  = require('./app');
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
  console.log(`Swagger UI disponible sur http://localhost:${port}/api-docs`);
});

