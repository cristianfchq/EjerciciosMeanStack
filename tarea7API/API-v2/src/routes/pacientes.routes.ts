import {Router} from 'express';
import pacientesController from '../controllers/pacientes.controller';

const pacienteRouter = Router();

pacienteRouter.get('/', pacientesController.pacienteList);

export default pacienteRouter;