

//? adicionar un nuevo tratamiento

db.tratamientos.insert(
    {
        codTratamiento: "T0011",
        nombreTratamiento: "Otro tratamiento",
        caracteristicas: "Alias molestiae quo ipsa soluta doloribus alias corporis. Distinctio eum voluptas et quia nihil quo. Ipsa voluptate beatae minima fuga voluptate eligendi."
    }
)

db.tratamientos.deleteOne(
    {
        codTratamiento: "T0011"
    }
)

//? insertar nuevo paciente

db.pacientes.insert(
    {
        _id: "gs32165498",
        ci: '32165498 LP',
        nombre: 'Gonzalo',
        apellido: 'Sanchez',
        edad: 29,
        telefono: 4653734748,
        estadoCivil: 'soltero',
        sexo: 'M',
        ocupacion: 'obrero',
        direccion: [
            {
                zona: 'las delicias',
                calle: 'bellman',
                numero: 159,
            }
        ],
        antecedenteFamiliares: 'Tuberculosis',
    },
)

//? abrir su historial del nuevo paciente

db.consulta.insert(
    {
        _id: "consulta11",
        codPaciente:"gs32165498",
        tratamiento: "Operatoria Dental",
        deuda: 2000,
        detalles: [
            {
                costo: 3000,
                aCuenta: 1000,
                saldo: 2000,
                fecha: new Date(),
                pieza: "User-centric extend",
                diagnostico: "Trail Soft"
            }
        ],
    }
)

db.consulta.deleteOne(
    {
        _id: "consulta11"
    }
)
//? insertar imagenes antes del inicio del tratamiento

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgInicio: {ruta: "http://lorempixel.com/640/480/technics"}}
    }
)

//? añadir mas imagenes del estado de los dientes del paceinte paciente

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgInicio: {ruta: "http://lorempixel.com/640/480/city"}}
    }
)

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgInicio: {ruta: "http://lorempixel.com/640/480/business"}}
    }
)

//? insertar imagenes al finalizar el tratamiento

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgFin: {ruta: "http://lorempixel.com/640/480/technics"}}
    }
)

//? añadir mas imagenes del resultado de los dientes del paceinte paciente

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgFin: {ruta: "http://lorempixel.com/640/480/nature"}}
    }
)

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {imgFin: {ruta: "http://lorempixel.com/640/480/nature"}}
    }
)

//? actualizar el saldo de los pacientes su deuda pendiente

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {detalles: 
            {
                costo : 3000,
                aCuenta : 800,
                saldo : 1200,
                fecha : new Date(),
                pieza : "User-centric extend",
                diagnostico : "Trail Soft"
            }
        }
    }
)

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $set : {
            deuda: 1200
        }
    }
)

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $push : {detalles: 
            {
                costo : 3000,
                aCuenta : 1200,
                saldo : 0,
                fecha : new Date(),
                pieza : "User-centric extend",
                diagnostico : "Trail Soft"
            }
        }
    }
)

db.consulta.update(
    {
        codPaciente: "gs32165498",
        _id: "consulta11",
    },
    {
        $set : {
            deuda: 0
        }
    }
)

//? ver que paccientes ya pagaron todo


db.consulta.aggregate([
    { $match: { "detalles.saldo": 0} },
    {
        $lookup:
        {
            from: "pacientes",
            localField: "codPaciente",
            foreignField: "_id",
            as: "paciente"
        }
    },
    
])

//?  ver los paceintes que deben arriba de 2000 Bs  

db.consulta.aggregate([
    { $match: { "deuda": { $lt: 2000 }} },
    {
        $lookup:
        {
            from: "pacientes",
            localField: "codPaciente",
            foreignField: "_id",
            as: "paciente"
        }
    },
    
])

//? ver el hostorial de visitas de una paciente 

db.consulta.find({codPaciente: {$regex: '32165498', '$options' : 'i'}},{detalles: 1})

db.consulta.aggregate([
    { $match: { codPaciente: {$regex: '32165498', '$options' : 'i'}} },
    {
        $lookup:
        {
            from: "pacientes",
            localField: "codPaciente",
            foreignField: "_id",
            as: "paciente"
        }
    },
    { $unwind: "$paciente" },
    {
        $project: {
            __v: 0,
            "paciente.__v": 0,
            "paciente._id": 0,
            "paciente.direccion": 0,
            "imgInicio": 0,
            "imgFin": 0

        }
    },
    
])

//? buscar paciente por ci

db.pacientes.find({ci: {$regex: '6578520', '$options' : 'i'}})

//? ver los pacientes que estan en un determinado tratamiento

db.consulta.aggregate([
    { $match: { tratamiento: "Ortodoncia"} },
    {
        $lookup:
        {
            from: "pacientes",
            localField: "codPaciente",
            foreignField: "_id",
            as: "paciente"
        }
    },
    { $unwind: "$paciente" },
    {
        $project: {
            __v: 0,
            "paciente.__v": 0,
            "paciente._id": 0
        }
    },
])




