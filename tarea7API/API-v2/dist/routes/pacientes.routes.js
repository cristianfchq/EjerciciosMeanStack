"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientes_controller_1 = __importDefault(require("../controllers/pacientes.controller"));
const pacienteRouter = express_1.Router();
pacienteRouter.get('/', pacientes_controller_1.default.pacienteList);
exports.default = pacienteRouter;
