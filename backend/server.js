const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/confi');
const routes = require('./routes/routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);

app.get('/', (req, res) => res.send('Payroll API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
