"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importaciones
const express_1 = __importDefault(require("express"));
const pacientes_models_1 = __importDefault(require("./models/pacientes.models"));
//inicializacion
const app = express_1.default();
//configuraciones
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//rutas
app.get('/', (req, res) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});
// 500 cuando a habido un error al buscar un objeto
// 404 cuando no encuentra el objeto
//listar pacientes
app.get('/pacientes', (req, res) => {
    pacientes_models_1.default.find({}, "nombre apellido ci telefono", (err, pacientes) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar pacientes',
                errors: err,
            });
        }
        pacientes_models_1.default.countDocuments((err, total) => {
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
    });
});
// listar un paciente por el id
app.get('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    pacientes_models_1.default.findById(id, (err, paciente) => {
        console.log(err);
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar paciente',
                errors: err
            });
        }
        if (paciente === null) {
            return res.status(404).json({
                ok: false,
                message: 'paciente no encontrado',
                errors: 'id invalido'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'paciente',
            paciente: paciente
        });
    });
});
// listar un paciente por el ci
app.get('/paciente/:ci', (req, res) => {
    const ci = req.params.ci;
    pacientes_models_1.default.findOne({ 'ci': ci }, (err, paciente) => {
        // console.log(err);
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar paciente',
                errors: err
            });
        }
        if (paciente === null) {
            return res.status(404).json({
                ok: false,
                message: 'paciente no encontrado',
                errors: 'id invalido'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'paciente',
            paciente: paciente
        });
    });
});
//ingresar nuevos pacientes
app.post('/pacientes', (req, res) => {
    const pacienteRecivido = req.body;
    if (!pacienteRecivido || Object.keys(pacienteRecivido).length < 7) {
        return res.status(400).json({
            ok: false,
            message: 'parametros incompletos',
        });
    }
    const paciente = new pacientes_models_1.default(pacienteRecivido);
    paciente.save((err, nuevoPaciente) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al guardar pacientes',
                errors: err,
            });
        }
        res.status(200).json({
            ok: true,
            message: 'pacientes creado',
            paciente: nuevoPaciente,
        });
    });
});
// actualizar pacientes
app.put('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    const pacienteRecivido = req.body;
    if (!pacienteRecivido || Object.keys(pacienteRecivido).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'Nada que actualizar',
        });
    }
    pacientes_models_1.default.findById(id, (err, pacienteParaActualizar) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al encontrar pacientes',
                errors: err,
            });
        }
        if (pacienteParaActualizar === null) {
            return res.status(404).json({
                ok: false,
                message: 'paciente no encontrado',
                errors: 'id invalido'
            });
        }
        const nuevoPaciente = Object.assign(Object.assign({}, pacienteParaActualizar._doc), pacienteRecivido);
        pacientes_models_1.default.findByIdAndUpdate(id, nuevoPaciente, (err, pacienteActualizado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al actualizar pacientes',
                    errors: err,
                });
            }
            res.status(200).json({
                ok: true,
                message: 'pacientes actualizado',
                old_paciente: pacienteActualizado,
                nuevo_paciente: nuevoPaciente,
            });
        });
    });
});
// eliminar pacientes
app.delete('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    pacientes_models_1.default.findByIdAndDelete(id, (err, pacienteEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al eliminar pacientes',
                errors: err,
            });
        }
        if (pacienteEliminado === null) {
            return res.status(404).json({
                ok: false,
                message: 'error al eliminar por paciente no encontrado',
                errors: 'id invalido',
            });
        }
        res.status(200).json({
            ok: true,
            message: 'pacientes eliminado',
            paciente: pacienteEliminado,
        });
    });
});
exports.default = app;
