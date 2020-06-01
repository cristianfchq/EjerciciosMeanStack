
import {Request, Response} from 'express';
import Paciente from '../models/pacientes.models';

const pacientesController = {

    async pacienteList(req: Request, res: Response){
        await Paciente.find({}, "nombre apellido ci telefono", async (err, pacientes) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: 'error al buscar pacientes',
                    errors: err,
                });
            }
    
            await Paciente.countDocuments((err, total) => {
                if (err){
                    return res.status(500).json({
                        ok: false,
                        message: 'error al contar pacientes',
                        errors: err,
                    });
                }
    
                res.status(200).json({
                    ok: true,
                    message: 'lista de pacientes',
                    pacientes: pacientes,
                    total_pacientes: total,
                });
    
    
            });
    
            
        });
    },

    async getPacienteById(req: Request, res: Response) {
        const id = req.params.id;
        await Paciente.findById(id, (err, paciente) => {
    
            // console.log(err);
            
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: 'error al buscar paciente por id',
                    errors: err
                });
            }
            if (paciente === null){
                return res.status(404).json({
                    ok: false,
                    message: 'paciente no encontrado con id',
                    errors: 'id invalido'
                });
            }
            res.status(200).json({
                ok: true,
                message: 'paciente',
                paciente: paciente
            });
    
        });
    },

    async getPacienteByCI(req: Request, res: Response) {
        const ci = req.params.ci;
        await Paciente.findOne({'ci': ci}, (err, paciente) => {
    
            // console.log(err);
            
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: 'error al buscar paciente por ci',
                    errors: err
                });
            }
            if (paciente === null){
                return res.status(404).json({
                    ok: false,
                    message: 'paciente no encontrado con ci',
                    errors: 'id invalido'
                });
            }
            res.status(200).json({
                ok: true,
                message: 'paciente',
                paciente: paciente
            });
    
        });
    }
}

export default pacientesController;