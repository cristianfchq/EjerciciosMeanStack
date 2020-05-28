
//importaciones
import express, {Request, Response} from 'express';
import Paciente from './models/pacientes.models';

//inicializacion
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);

//middlewares
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());

//rutas
app.get('/', (req: Request, res: Response)=>{
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});

//listar pacientes

app.get('/pacientes', (req: Request, res: Response)=>{
    Paciente.find({}, "nombre apellido telefono", (err, pacientes) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'error al buscar pacientes',
                errors: err,
            });
        }

        Paciente.countDocuments((err, total) => {
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
});

// listar un paciente por el id

app.get('/pacientes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Paciente.findById(id, (err, pacientee) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'error al buscar pacientes',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'paciente',
            paciente: pacientee
        });

    });
});


//ingresar nuevos pacientes

app.post('/pacientes', (req: Request, res: Response) =>{
    const pacienteRecivido = req.body;
    if (!pacienteRecivido || Object.keys(pacienteRecivido).length < 7) {
        return res.status(400).json({
            ok: false,
            message: 'parametros incompletos',
        });
    }

    const paciente = new Paciente(pacienteRecivido);
    paciente.save((err, nuevoPaciente) => {

        if (err){
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

app.put('/pacientes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const pacienteRecivido = req.body;
    
    if (!pacienteRecivido || Object.keys(pacienteRecivido).length === 0){
        return res.status(400).json({
            ok: false,
            message: 'Nada que actualizar',
        });
    }
    Paciente.findById(id, (err, pacienteParaActualizar: any) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'error al encontrar pacientes',
                errors: err,
            });
        }

        const nuevoPaciente = { ...pacienteParaActualizar._doc, ...pacienteRecivido };

        Paciente.findByIdAndUpdate(id, nuevoPaciente, (err, pacienteActualizado) => {
            if (err){
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
        })

        
    });
});

// eliminar pacientes

app.delete('/pacientes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    Paciente.findByIdAndDelete(id, (err, pacienteEliminado) => {
        if (err){
            return res.status(500).json({
                ok: false,
                message: 'error al eliminar pacientes',
                errors: err,
            });
        }
        if (pacienteEliminado === null){
            return res.status(500).json({
                ok: false,
                message: 'error al eliminar por paciente no encontrado',
                errors: err,
            });
        }
        res.status(200).json({
            ok: true,
            message: 'pacientes eliminado',
            paciente: pacienteEliminado,
        });
    
    });
})

export default app;