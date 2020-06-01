"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pacientes_models_1 = __importDefault(require("../models/pacientes.models"));
const pacientesController = {
    pacienteList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pacientes_models_1.default.find({}, "nombre apellido ci telefono", (err, pacientes) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error al buscar pacientes',
                        errors: err,
                    });
                }
                yield pacientes_models_1.default.countDocuments((err, total) => {
                    if (err) {
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
            }));
        });
    }
};
exports.default = pacientesController;
