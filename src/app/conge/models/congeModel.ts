import { UTILISATEUR } from "./userModel";

export interface CONGE {
    id: any;
    date_debut: any;
    date_fin: any;
    cause: string;
    response: string
    employee: UTILISATEUR
}