import React, { useState, useEffect } from "react";
import { Cita } from "../Cita";
import { Dentista } from "../Dentista";
import { Paciente } from "../Paciente";

interface CitaFormularioProps {
    initialCita?: Cita | null;
    onGuardar: (cita: Omit<Cita, 'id'>) => void;
    onCancelar: () => void;
    dentistas: Dentista[];
    pacientes: Paciente[];
}

const CitaFormulario: React.FC<CitaFormularioProps> = ({ initialCita, onGuardar, onCancelar, dentistas, pacientes }) => {
    const [cita, setCita] = useState<Omit<Cita, 'id'>>({ fecha: '', motivo: '', paciente: pacientes[0], dentista: dentistas[0] });

    useEffect(() => {
        if (initialCita) {
            setCita(initialCita);
        } else if (pacientes.length > 0 && dentistas.length > 0) {
            setCita({ fecha: '', motivo: '', paciente: pacientes[0], dentista: dentistas[0] });
        }
    }, [initialCita, pacientes, dentistas]);

    const handleGuardar = () => {
        if (cita.fecha && cita.motivo && cita.paciente && cita.dentista) {
            onGuardar(cita);
        }
    };

    const handleCancelar = () => {
        onCancelar();
    };

    return (
        <div>
            <div>
                <label>Fecha</label>
                <input type="date" value={cita.fecha} onChange={(e) => setCita({ ...cita, fecha: e.target.value })} />
            </div>
            <div>
                <label>Motivo</label>
                <input type="text" value={cita.motivo} onChange={(e) => setCita({ ...cita, motivo: e.target.value })} />
            </div>
            <div>
                <label>Paciente</label>
                <select value={cita.paciente?.id || ''} onChange={(e) => setCita({ ...cita, paciente: pacientes.find(p => p.id === parseInt(e.target.value))! })}>
                    <option value="">Seleccione un paciente</option>
                    {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>)}
                </select>
            </div>
            <div>
                <label>Dentista</label>
                <select value={cita.dentista?.id || ''} onChange={(e) => setCita({ ...cita, dentista: dentistas.find(d => d.id === parseInt(e.target.value))! })}>
                    <option value="">Seleccione un dentista</option>
                    {dentistas.map(d => <option key={d.id} value={d.id}>{d.nombre} {d.apellido}</option>)}
                </select>
            </div>
            <div>
                <button onClick={handleGuardar}>Guardar</button>
                <button onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
    );
};

export default CitaFormulario;