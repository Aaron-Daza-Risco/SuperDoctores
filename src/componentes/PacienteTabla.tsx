import React from "react";
import { Paciente } from "../Paciente";

interface PacienteTablaProps {
    pacientes: Paciente[];
    onEditar: (paciente: Paciente) => void;
    onEliminar: (paciente: Paciente) => void;
}

const PacienteTabla: React.FC<PacienteTablaProps> = ({pacientes, onEditar, onEliminar}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pacientes.map(paciente => (
                    <tr key={paciente.id}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.apellido}</td>
                        <td>{paciente.fechaNacimiento}</td>
                        <td>{paciente.telefono}</td>
                        <td>
                            <button onClick={() => onEditar(paciente)}>Editar</button>
                            <button onClick={() => onEliminar(paciente)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default PacienteTabla;