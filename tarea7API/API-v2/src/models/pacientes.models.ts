
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IPaciente extends Document{
    _id: string,
    nombre: string,
    ci: string,
    edad: number,
    telefono: number,
    estadoCivil: string,
    sexo: string,
    ocupacion: string,
    direccion: {
        zona: string,
        calle: string,
        numero: string,
    }
    antecedenteFamiliares: string,
    apellido: string,
}

const pacienteSchema = new Schema(
    {
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
                required:false, 
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
    },
    {
        collection: 'pacientes'
    }
);

export default model<IPaciente>('Paciente', pacienteSchema);