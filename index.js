// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const Cliente = require('./models/Client');
const Empleado =require('./models/Empleado');
const Salas = require('./models/Salas');
const routesAdmin = require('./routes/routes');
const cors = require('cors');

const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');
const port = 3001;

require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware,roleMiddleware('admin'), routesAdmin);

// Ruta protegida que solo puede ser accedida por usuarios con rol de admin
/* app.get('/api/admin-route', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Bienvenido, admin!' });
});
 */

sequelize.sync({ force:false }).then(() => {
  app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ', port);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});
