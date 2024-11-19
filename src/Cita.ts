import { Dentista } from "./Dentista";
import { Paciente } from "./Paciente";

export interface Cita{
    id : number;
    fecha : string;
    motivo : string;
    paciente : Paciente;
    dentista : Dentista;
}