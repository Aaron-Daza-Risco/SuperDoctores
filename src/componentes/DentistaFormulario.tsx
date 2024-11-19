import React, {useState, useEffect} from "react";
import { Dentista } from "../Dentista";

interface DentistaFormularioProps {
    initialDentista?: Dentista | null;
    onGuardar: (dentista: Omit<Dentista,'id'>) => void;
    onCancelar: () => void;
}

const DentistaFormulario: React.FC<DentistaFormularioProps> = ({initialDentista, onGuardar, onCancelar}) => {
    const [dentista, setDentista] = useState<Omit<Dentista,'id'>>({nombre: '', apellido: '', especialidad: ''});

    useEffect(() => {
        if (initialDentista) {
            setDentista(initialDentista);
        }
    }, [initialDentista]);

    const handleGuardar = () => {
        onGuardar(dentista);
    }

    const handleCancelar = () => {
        onCancelar();
    }

    return (
        <div>
            <div>
                <label>Nombre</label>
                <input type="text" value={dentista.nombre} onChange={(e) => setDentista({...dentista, nombre: e.target.value})} />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={dentista.apellido} onChange={(e) => setDentista({...dentista, apellido: e.target.value})} />
            </div>
            <div>
                <label>Especialidad</label>
                <input type="text" value={dentista.especialidad} onChange={(e) => setDentista({...dentista, especialidad: e.target.value})} />
            </div>
            <div>
                <button onClick={handleGuardar}>Guardar</button>
                <button onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
    );
}
export default DentistaFormulario;