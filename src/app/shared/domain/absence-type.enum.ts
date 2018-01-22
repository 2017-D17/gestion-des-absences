export enum AbsenceType {
    CONGE_PAYE = "CONGE_PAYE",
    RTT = "RTT", 
    CONGE_SANS_SOLDE = "CONGE_SANS_SOLDE"
}

export const ABSENCES_TYPES= [

    { key: AbsenceType.CONGE_PAYE, label: "Congé payé"},
    { key: AbsenceType.RTT, label: "RTT"},
    { key: AbsenceType.CONGE_SANS_SOLDE, label: "Congé sans solde"}
]

