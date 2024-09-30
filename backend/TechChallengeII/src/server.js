const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const cors = require('cors')
dotenv.config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const postagemRoutes = require('./routes/postagemRoutes');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/postagens', postagemRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => console.log(err));

module.exports = app
