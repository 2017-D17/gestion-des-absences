export enum AbsenceStatut {
    INITIALE = "INITIALE",
    EN_ATTENTE_VALIDATION = "EN_ATTENTE_VALIDATION", 
    VALIDEE = "VALIDEE",
    REJETEE = "REJETEE"
}


export const ABSENCES_STATUS = [

    { key: AbsenceStatut.INITIALE, label: "Initial"},
    { key: AbsenceStatut.EN_ATTENTE_VALIDATION , label: "En attente de suppression"},
    { key: AbsenceStatut.VALIDEE, label: "Validée"},
    { key: AbsenceStatut.REJETEE, label: "Rejetée"}
]