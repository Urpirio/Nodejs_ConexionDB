const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const Servidor = express();

Servidor.use(cors());
Servidor.use(morgan('dev'));
Servidor.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:  '',
    database: 'loginusers',
    waitForConnections: true,
    connectAttributes: 10,
    queueLimit: 0
});

Servidor.get('/usuarios', async (req, res)=>{
    
    try{
        const connect  = await pool.getConnection(); // para obtener conexion.
        const [DATA] =  await connect.execute('SELECT * FROM usuarios');
        connect.release();

        res.status(200).json({error: false, data: DATA});
    }catch(err){
        console.log('Error al pedir los usuarios',err);
        res.status(500).json({error: true,mensaje: ' tenemos un hermoso error'});
    };
});

const PORT = process.env.PORT || 4500;
Servidor.listen(PORT,() => {
    console.log(`🫂El servidor esta corriendo en el locahost:${PORT} `);
});