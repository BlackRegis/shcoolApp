// Données des documents pour le module de gestion des documents
export type Document = {
  id: string
  name: string
  type: "Certificat" | "Bulletin" | "Formulaire" | "Autre"
  student: string
  studentId: string
  createdDate: string
  status: "Disponible" | "En attente" | "Archivé"
  accessLevel: "Standard" | "Restreint" | "Confidentiel"
  description?: string
  createdBy?: string
  fileSize?: string
  lastModified?: string
}

// Données initiales
export const initialDocuments: Document[] = [
  {
    id: "DOC-001",
    name: "Certificat de scolarité - Konan Kouamé",
    type: "Certificat",
    student: "Konan Kouamé",
    studentId: "STD-001-2023",
    createdDate: "15/09/2023",
    status: "Disponible",
    accessLevel: "Restreint",
    description: "Certificat attestant que l'élève est inscrit pour l'année scolaire en cours",
    createdBy: "Mme. Diallo Fatoumata",
    fileSize: "245 KB",
    lastModified: "15/09/2023",
  },
  {
    id: "DOC-002",
    name: "Bulletin du 1er trimestre - Diallo Aminata",
    type: "Bulletin",
    student: "Diallo Aminata",
    studentId: "STD-002-2023",
    createdDate: "20/12/2023",
    status: "Disponible",
    accessLevel: "Restreint",
    description: "Bulletin de notes du premier trimestre",
    createdBy: "Mme. Bamba Mariam",
    fileSize: "350 KB",
    lastModified: "20/12/2023",
  },
  {
    id: "DOC-003",
    name: "Autorisation d'infirmerie - Ouattara Ibrahim",
    type: "Formulaire",
    student: "Ouattara Ibrahim",
    studentId: "STD-003-2023",
    createdDate: "05/10/2023",
    status: "Disponible",
    accessLevel: "Restreint",
    description: "Autorisation parentale pour les soins d'urgence",
    createdBy: "Mme. Diallo Fatoumata",
    fileSize: "180 KB",
    lastModified: "05/10/2023",
  },
  {
    id: "DOC-004",
    name: "Certificat médical - Bamba Fatoumata",
    type: "Certificat",
    student: "Bamba Fatoumata",
    studentId: "STD-004-2023",
    createdDate: "12/11/2023",
    status: "En attente",
    accessLevel: "Confidentiel",
    description: "Certificat médical justifiant l'absence prolongée",
    createdBy: "Dr. Koné Salif",
    fileSize: "275 KB",
    lastModified: "12/11/2023",
  },
  {
    id: "DOC-005",
    name: "Bulletin du 1er trimestre - Koffi Jean",
    type: "Bulletin",
    student: "Koffi Jean",
    studentId: "STD-005-2023",
    createdDate: "20/12/2023",
    status: "Disponible",
    accessLevel: "Restreint",
    description: "Bulletin de notes du premier trimestre",
    createdBy: "Mme. Bamba Mariam",
    fileSize: "320 KB",
    lastModified: "20/12/2023",
  },
  {
    id: "DOC-006",
    name: "Formulaire d'inscription - Touré Mariam",
    type: "Formulaire",
    student: "Touré Mariam",
    studentId: "STD-006-2023",
    createdDate: "01/09/2023",
    status: "Archivé",
    accessLevel: "Standard",
    description: "Formulaire d'inscription pour l'année scolaire",
    createdBy: "Mme. Diallo Fatoumata",
    fileSize: "210 KB",
    lastModified: "01/09/2023",
  },
]
