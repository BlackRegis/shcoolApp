// Données des élèves pour le module d'inscriptions
export type Student = {
  id: string
  name: string
  class: string
  registrationDate: string
  status: "Actif" | "En attente" | "Inactif"
  paymentStatus: "Payé" | "Partiel" | "Non payé"
  gender: "Masculin" | "Féminin"
  birthDate: string
  address: string
  parentName: string
  parentPhone: string
  parentEmail: string
}

// Données initiales
export const initialStudents: Student[] = [
  {
    id: "STD-001-2023",
    name: "Konan Kouamé",
    class: "Terminale A",
    registrationDate: "15/09/2023",
    status: "Actif",
    paymentStatus: "Payé",
    gender: "Masculin",
    birthDate: "12/05/2006",
    address: "Abidjan, Cocody",
    parentName: "Konan Michel",
    parentPhone: "+225 07 12 34 56 78",
    parentEmail: "konan.michel@email.com",
  },
  {
    id: "STD-002-2023",
    name: "Diallo Aminata",
    class: "Seconde C",
    registrationDate: "12/09/2023",
    status: "Actif",
    paymentStatus: "Partiel",
    gender: "Féminin",
    birthDate: "23/08/2007",
    address: "Abidjan, Yopougon",
    parentName: "Diallo Fatou",
    parentPhone: "+225 05 98 76 54 32",
    parentEmail: "diallo.fatou@email.com",
  },
  {
    id: "STD-003-2023",
    name: "Ouattara Ibrahim",
    class: "Première D",
    registrationDate: "14/09/2023",
    status: "Actif",
    paymentStatus: "Payé",
    gender: "Masculin",
    birthDate: "05/03/2006",
    address: "Abidjan, Plateau",
    parentName: "Ouattara Bakary",
    parentPhone: "+225 07 45 67 89 01",
    parentEmail: "ouattara.bakary@email.com",
  },
  {
    id: "STD-004-2023",
    name: "Bamba Fatoumata",
    class: "Troisième",
    registrationDate: "10/09/2023",
    status: "En attente",
    paymentStatus: "Non payé",
    gender: "Féminin",
    birthDate: "17/11/2008",
    address: "Abidjan, Abobo",
    parentName: "Bamba Souleymane",
    parentPhone: "+225 05 23 45 67 89",
    parentEmail: "bamba.souleymane@email.com",
  },
  {
    id: "STD-005-2023",
    name: "Koffi Jean",
    class: "Terminale D",
    registrationDate: "11/09/2023",
    status: "Actif",
    paymentStatus: "Payé",
    gender: "Masculin",
    birthDate: "30/01/2006",
    address: "Abidjan, Treichville",
    parentName: "Koffi Pierre",
    parentPhone: "+225 07 89 01 23 45",
    parentEmail: "koffi.pierre@email.com",
  },
]
