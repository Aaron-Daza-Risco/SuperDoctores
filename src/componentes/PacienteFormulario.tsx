import React, {useState, useEffect} from "react";
import { Paciente } from "../Paciente";

interface PacienteFormularioProps {
    initialPaciente?: Paciente | null;
    onGuardar: (paciente: Omit<Paciente,'id'>) => void;
    onCancelar: () => void;
}

const PacienteFormulario: React.FC<PacienteFormularioProps> = ({initialPaciente, onGuardar, onCancelar}) => {
    const [paciente, setPaciente] = useState<Omit<Paciente,'id'>>({nombre: '', apellido: '', fechaNacimiento: '', telefono: ''});

    useEffect(() => {
        if (initialPaciente) {
            setPaciente(initialPaciente);
        }
    }, [initialPaciente]);

    const handleGuardar = () => {
        onGuardar(paciente);
    }

    const handleCancelar = () => {
        onCancelar();
    }

    return (
        <div>
            <div>
                <label>Nombre</label>
                <input type="text" value={paciente.nombre} onChange={(e) => setPaciente({...paciente, nombre: e.target.value})} />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={paciente.apellido} onChange={(e) => setPaciente({...paciente, apellido: e.target.value})} />
            </div>
            <div>
                <label>Fecha de Nacimiento</label>
                <input type="date" value={paciente.fechaNacimiento} onChange={(e) => setPaciente({...paciente, fechaNacimiento: e.target.value})} />
            </div>
            <div>
                <label>Telefono</label>
                <input type="text" value={paciente.telefono} onChange={(e) => setPaciente({...paciente, telefono: e.target.value})} />
            </div>
            <div>
                <button onClick={handleGuardar}>Guardar</button>
                <button onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
    );
}
export  default PacienteFormulario;