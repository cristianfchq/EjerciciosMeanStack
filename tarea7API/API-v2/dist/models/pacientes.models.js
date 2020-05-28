"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pacienteSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    ci: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: false,
        trim: true
    },
    estadoCivil: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    sexo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    ocupacion: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    direccion: {
        type: Object,
        required: false,
        zona: {
            type: String,
            required: false,
            lowercase: true,
            trim: true,
        },
        calle: {
            type: String,
            required: false,
            lowercase: true,
            trim: true,
        },
        numero: {
            type: String,
            required: false,
            lowercase: true,
            trim: true,
        },
    },
    antecedenteFamiliares: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    }
}, {
    collection: 'pacientes'
});
exports.default = mongoose_1.model('Paciente', pacienteSchema);
