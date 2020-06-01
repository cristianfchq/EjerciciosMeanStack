
import {Router, Request, Response} from 'express';
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
    }
}

export default pacientesController;