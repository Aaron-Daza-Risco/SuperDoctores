import React, { useState, useEffect } from "react";
import { Dentista } from "./Dentista";
import DentistaTabla from "./componentes/DentistaTabla";
import DentistaFormulario from "./componentes/DentistaFormulario";
import axios from "axios";
import { Paciente } from "./Paciente";
import PacienteTabla from "./componentes/PacienteTabla";
import PacienteFormulario from "./componentes/PacienteFormulario";
import CitaFormulario from "./componentes/CitaFormulario"; // Importa el nuevo componente de citas
import { Cita } from "./Cita";

const App: React.FC = () => {
    const [vista, setVista] = useState<'dentistas' | 'pacientes' | 'citas'>('dentistas');
    const [dentistas, setDentistas] = useState<Dentista[]>([]);
    const [dentistaSeleccionado, setDentistaSeleccionado] = useState<Dentista | null>(null);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
    const [citas, setCitas] = useState<Cita[]>([]);

    useEffect(() => {
        if (vista === 'dentistas') {
            obtenerDentistas();
        } else if (vista === 'pacientes') {
            obtenerPacientes();
        } else if (vista === 'citas') {
            obtenerCitas();
        }
    }, [vista]);

    const obtenerDentistas = async () => {
        const response = await axios.get<Dentista[]>('/api/dentistas');
        setDentistas(response.data);
    }

    const obtenerPacientes = async () => {
        const response = await axios.get<Paciente[]>('/api/pacientes');
        setPacientes(response.data);
    }

    const obtenerCitas = async () => {
        const response = await axios.get<Cita[]>('/api/citas');
        setCitas(response.data);
    }

    const handleEditarDentista = (dentista: Dentista) => {
        setDentistaSeleccionado(dentista);
    }

    const handleEliminarDentista = async (dentista: Dentista) => {
        await axios.delete(`/api/dentistas/${dentista.id}`);
        obtenerDentistas();
    }

    const handleGuardarDentista = async (dentista: Omit<Dentista, 'id'>) => {
        if (dentistaSeleccionado) {
            await axios.put(`/api/dentistas/${dentistaSeleccionado.id}`, dentista);
        } else {
            await axios.post('/api/dentistas', dentista);
        }
        setDentistaSeleccionado(null);
        obtenerDentistas();
    }

    const handleCancelarDentista = () => {
        setDentistaSeleccionado(null);
    }

    const handleEditarPaciente = (paciente: Paciente) => {
        setPacienteSeleccionado(paciente);
    }

    const handleEliminarPaciente = async (paciente: Paciente) => {
        await axios.delete(`/api/pacientes/${paciente.id}`);
        obtenerPacientes();
    }

    const handleGuardarPaciente = async (paciente: Omit<Paciente, 'id'>) => {
        if (pacienteSeleccionado) {
            await axios.put(`/api/pacientes/${pacienteSeleccionado.id}`, paciente);
        } else {
            await axios.post('/api/pacientes', paciente);
        }
        setPacienteSeleccionado(null);
        obtenerPacientes();
    }

    const handleCancelarPaciente = () => {
        setPacienteSeleccionado(null);
    }

    const handleGuardarCita = async (cita: Omit<Cita, 'id'>) => {
        try {
            await axios.post('/api/citas', cita);
            obtenerCitas();
        } catch (error) {
            console.error('Error al guardar la cita:', error);
            alert('Hubo un error al guardar la cita. Por favor, inténtelo de nuevo.');
        }
    }

    return (
        <div>
            <button onClick={() => setVista('dentistas')}>Dentistas</button>
            <button onClick={() => setVista('pacientes')}>Pacientes</button>
            <button onClick={() => setVista('citas')}>Citas</button>

            {vista === 'dentistas' ? (
                <div>
                    <h1>Dentistas</h1>
                    <DentistaTabla dentistas={dentistas} onEditar={handleEditarDentista} onEliminar={handleEliminarDentista} />
                    <h2>{dentistaSeleccionado ? 'Editar Dentista' : 'Nuevo Dentista'}</h2>
                    <DentistaFormulario initialDentista={dentistaSeleccionado} onGuardar={handleGuardarDentista} onCancelar={handleCancelarDentista} />
                </div>
            ) : vista === 'pacientes' ? (
                <div>
                    <h1>Pacientes</h1>
                    <PacienteTabla pacientes={pacientes} onEditar={handleEditarPaciente} onEliminar={handleEliminarPaciente} />
                    <h2>{pacienteSeleccionado ? 'Editar Paciente' : 'Nuevo Paciente'}</h2>
                    <PacienteFormulario initialPaciente={pacienteSeleccionado} onGuardar={handleGuardarPaciente} onCancelar={handleCancelarPaciente} />
                </div>
            ) : (
                <div>
                    <h1>Citas</h1>
                    <CitaFormulario 
                        dentistas={dentistas} 
                        pacientes={pacientes} 
                        onGuardar={handleGuardarCita} 
                        onCancelar={() => { /* handle cancel logic */ }} 
                    />
                    <h2>Lista de Citas</h2>
                    <ul>
                        {citas.map(cita => (
                            <li key={cita.id}>{`Cita con ${cita.paciente} el ${cita.fecha}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;