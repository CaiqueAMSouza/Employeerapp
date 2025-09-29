const express = require('express')
const routes = require('./routes/routes.js')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

require('./database/db.js')

const app = express()

app.use(cors({origin: 'http://localhost:8080'}))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))


