import React from "react";
import { Cita } from "../Cita";

interface CitaTablaProps {
    citas: Cita[];
    onEditar: (cita: Cita) => void;
    onEliminar: (cita: Cita) => void;
}

const CitaTabla: React.FC<CitaTablaProps> = ({citas, onEditar, onEliminar}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Motivo</th>
                    <th>Paciente</th>
                    <th>Dentista</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {citas.map(cita => (
                    <tr key={cita.id}>
                        <td>{cita.fecha}</td>
                        <td>{cita.motivo}</td>
                        <td>{cita.paciente.nombre} {cita.paciente.apellido}</td>
                        <td>{cita.dentista.nombre} {cita.dentista.apellido}</td>
                        <td>
                            <button onClick={() => onEditar(cita)}>Editar</button>
                            <button onClick={() => onEliminar(cita)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default CitaTabla;