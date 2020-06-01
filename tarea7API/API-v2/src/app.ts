
//importaciones
import express, {Request, Response} from 'express';
import Paciente from './models/pacientes.models';
import pacienteRouter from './routes/pacientes.routes';


//inicializacion
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//rutas
app.get('/', (req: Request, res: Response)=>{
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});

// 500 cuando a habido un error al buscar un objeto
// 404 cuando no encuentra el objeto

app.use('/pacientes', pacienteRouter);





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

        if (pacienteParaActualizar === null){
            return res.status(404).json({
                ok: false,
                message: 'paciente no encontrado',
                errors: 'id invalido'
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
})

export default app;