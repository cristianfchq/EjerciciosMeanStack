import {Router} from 'express';
import pacientesController from '../controllers/pacientes.controller';

const pacienteRouter = Router();

//listar pacientes
pacienteRouter.get('/', pacientesController.pacienteList);

// listar un paciente por el id
pacienteRouter.get('/:id', pacientesController.getPacienteById);

// listar un paciente por el ci
pacienteRouter.get('/:ci', pacientesController.getPacienteByCI);

export default pacienteRouter;


