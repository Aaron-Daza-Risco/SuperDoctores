import React from "react";
import { Dentista } from "../Dentista";

interface DentistaTablaProps {
    dentistas: Dentista[];
    onEditar: (dentista: Dentista) => void;
    onEliminar: (dentista: Dentista) => void;
}

const DentistaTabla: React.FC<DentistaTablaProps> = ({dentistas, onEditar, onEliminar}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {dentistas.map(dentista => (
                    <tr key={dentista.id}>
                        <td>{dentista.nombre}</td>
                        <td>{dentista.apellido}</td>
                        <td>{dentista.especialidad}</td>
                        <td>
                            <button onClick={() => onEditar(dentista)}>Editar</button>
                            <button onClick={() => onEliminar(dentista)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default DentistaTabla;