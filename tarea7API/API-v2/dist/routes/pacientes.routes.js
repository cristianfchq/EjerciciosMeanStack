"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientes_controller_1 = __importDefault(require("../controllers/pacientes.controller"));
const pacienteRouter = express_1.Router();
//listar pacientes
pacienteRouter.get('/', pacientes_controller_1.default.pacienteList);
// listar un paciente por el id
pacienteRouter.get('/:id', pacientes_controller_1.default.getPacienteById);
// listar un paciente por el ci
pacienteRouter.get('/:ci', pacientes_controller_1.default.getPacienteByCI);
exports.default = pacienteRouter;
