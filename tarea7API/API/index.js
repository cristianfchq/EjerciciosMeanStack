
//! //////////////////////////////////////////////////////////////////////////////////////////

// Express
const express = require('express');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Mongoose
const mongoose = require('mongoose');

const DB = 'consultorio';
const DB_PORT = 27017;
const USER = 'root';
const PASS = 'root';

const _database = `mongodb://${USER}:${PASS}@localhost:${DB_PORT}/${DB}?authSource=admin`;

mongoose.connect(_database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB ...'))
.catch(err => console.error('Could not connect to MongoDB:‌', err));

// const Pacientes = mongoose.model('Paciente', { nombre: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

var Paciente = mongoose.Schema;
const pacienteSchema = new Paciente(
    {
        _id: String,
        ci: String,
        nombre: String,
        apellido: String,
        edad: Number,
        telefono: Number,
        estadoCivil: String,
        sexo: String,
        ocupacion: String,
        direccion: [
            {
                zona: String,
                calle: String,
                numero: Number,
            }
        ],
        antecedenteFamiliares: String,
    },
    {
        collection: 'pacientes'
    }
)

pacienteModel = mongoose.model('Paciente', pacienteSchema);

app.get('/', function (req, res) {
    res.send('Hello World')
})



// TODO: Lista todos los pacientes

app.get('/pacientes', function(req, res){

    pacienteModel.find({},(err, pacientes) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'Error en la peticion a la base de datos',
                erros: err
            })
        }
        res.status(200).json({
            ok: true,
            message: 'peticion exitosa',
            pacientes: pacientes
        })
    })

});

// TODO: Insertar Paciente

app.post('/pacientes', (req, res)=>{
    const dataRecibida = req.body;
    if (!dataRecibida){
        return res.status(404).json({
            ok: false,
            message: 'error al recibir los datos'
        })
    }
    const paciente = new pacienteModel({
        _id: dataRecibida._id,
        ci: dataRecibida.ci,
        nombre: dataRecibida.nombre,
        apellido: dataRecibida.apellido,
        edad: parseInt(dataRecibida.edad, 10),
        telefono: parseInt(dataRecibida.telefono, 10),
        estadoCivil: dataRecibida.estadoCivil,
        sexo: dataRecibida.sexo,
        ocupacion: dataRecibida.ocupacion,
        direccion: [
            {
                zona: dataRecibida.zona,
                calle: dataRecibida.calle,
                numero: parseInt(dataRecibida.numero, 10),
            }
        ],
        antecedenteFamiliares: dataRecibida.antecedenteFamiliares,
    })
    paciente.save((err, newPaciente) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'Error al crear paciente',
                erros: err
            })
        }
        res.status(200).json({
            ok: true,
            message: 'paceinte creado',
            newPaciente: newPaciente
        })
    })
    // res.status(200).json({
    //     ok: true,
    //     message: 'datos recibidos con exito',
    //     dataRecibida: dataRecibida
    // })
})

// TODO: Actualizar 

app.put('/pacientes/:id', (req, res)=>{
    const id = req.params.id;
    const dataRecibida = req.body;
    if (!dataRecibida || !id){
        return res.status(404).json({
            ok: false,
            message: 'error al recibir los datos o el id'
        })
    }
    pacienteModel.findById(id, (err, paciente) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'Error al encontrar cliente',
                erros: err
            })
        }
        if (!paciente){
            return res.status(404).json({
                ok: false,
                message: 'Error al encontrar cliente',
                erros: err
            })
        }
        paciente.ci                     = dataRecibida.ci                       ? dataRecibida.ci                       : paciente.ci                     ;
        paciente.nombre                 = dataRecibida.nombre                   ? dataRecibida.nombre                   : paciente.nombre                 ;
        paciente.apellido               = dataRecibida.apellido                 ? dataRecibida.apellido                 : paciente.apellido               ;
        paciente.edad                   = parseInt(dataRecibida.edad, 10)       ? parseInt(dataRecibida.edad, 10)       : paciente.edad                   ;
        paciente.telefono               = parseInt(dataRecibida.telefono, 10)   ? parseInt(dataRecibida.telefono, 10)   : paciente.telefono               ;
        paciente.estadoCivil            = dataRecibida.estadoCivil              ? dataRecibida.estadoCivil              : paciente.estadoCivil            ;
        paciente.sexo                   = dataRecibida.sexo                     ? dataRecibida.sexo                     : paciente.sexo                   ;
        paciente.ocupacion              = dataRecibida.ocupacion                ? dataRecibida.ocupacion                : paciente.ocupacion              ;
        paciente.direccion.zona         = dataRecibida.zona                     ? dataRecibida.zona                     : paciente.direccion.zona         ;
        paciente.direccion.calle        = dataRecibida.calle                    ? dataRecibida.calle                    : paciente.direccion.calle        ;
        paciente.direccion.numero       = parseInt(dataRecibida.numero, 10)     ? parseInt(dataRecibida.numero, 10)     : paciente.direccion.numero       ;
        paciente.antecedenteFamiliares  = dataRecibida.antecedenteFamiliares    ? dataRecibida.antecedenteFamiliares    : paciente.antecedenteFamiliares  ;
        
        paciente.save((err, pacienteUpdate) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: 'Error al actulizar el paciente',
                    erros: err
                })
            }
            res.status(200).json({
                ok: true,
                message: 'cliente actualizado',
                pacienteUpdate: pacienteUpdate,
            })
        })

    })
    // res.status(200).json({
    //     ok: true,
    //     message: 'datos recibidos con exito',
    //     dataRecibida: dataRecibida
    // })
})

app.listen(3001)


console.log('El servidor se esta ejecutando en el puerto 3001');

//! //////////////////////////////////////////////////////////////////////////////////////////

