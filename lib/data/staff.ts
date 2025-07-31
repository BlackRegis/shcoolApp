// Données du personnel pour le module de gestion du personnel
export type StaffMember = {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  joinDate: string
  status: "Actif" | "En congé" | "Inactif"
  type: "teachers" | "admin" | "support"
  address?: string
  qualification?: string
  specialization?: string
  emergencyContact?: string
}

// Données initiales
export const initialStaffMembers: StaffMember[] = [
  {
    id: "EMP-001",
    name: "Dr. Kouassi Aya",
    position: "Professeur de Mathématiques",
    department: "Sciences",
    email: "kouassi.aya@edumanager.com",
    phone: "+225 07 12 34 56 78",
    joinDate: "15/09/2018",
    status: "Actif",
    type: "teachers",
    address: "Abidjan, Cocody",
    qualification: "Doctorat en Mathématiques",
    specialization: "Algèbre et Géométrie",
    emergencyContact: "+225 07 98 76 54 32",
  },
  {
    id: "EMP-002",
    name: "M. Traoré Mamadou",
    position: "Professeur d'Histoire-Géographie",
    department: "Sciences Humaines",
    email: "traore.mamadou@edumanager.com",
    phone: "+225 05 98 76 54 32",
    joinDate: "03/10/2019",
    status: "Actif",
    type: "teachers",
    address: "Abidjan, Yopougon",
    qualification: "Master en Histoire",
    specialization: "Histoire Africaine",
    emergencyContact: "+225 05 12 34 56 78",
  },
  {
    id: "EMP-003",
    name: "Mme. Bamba Mariam",
    position: "Directrice des Études",
    department: "Administration",
    email: "bamba.mariam@edumanager.com",
    phone: "+225 07 45 67 89 01",
    joinDate: "01/09/2017",
    status: "Actif",
    type: "admin",
    address: "Abidjan, Plateau",
    qualification: "Master en Administration Scolaire",
    emergencyContact: "+225 07 23 45 67 89",
  },
  {
    id: "EMP-004",
    name: "M. Koné Ibrahim",
    position: "Comptable",
    department: "Finance",
    email: "kone.ibrahim@edumanager.com",
    phone: "+225 05 23 45 67 89",
    joinDate: "12/01/2020",
    status: "Actif",
    type: "admin",
    address: "Abidjan, Marcory",
    qualification: "Licence en Comptabilité",
    emergencyContact: "+225 05 67 89 01 23",
  },
  {
    id: "EMP-005",
    name: "Mme. Diallo Fatoumata",
    position: "Secrétaire",
    department: "Administration",
    email: "diallo.fatoumata@edumanager.com",
    phone: "+225 07 89 01 23 45",
    joinDate: "05/03/2021",
    status: "Actif",
    type: "admin",
    address: "Abidjan, Adjamé",
    qualification: "BTS en Secrétariat",
    emergencyContact: "+225 07 34 56 78 90",
  },
  {
    id: "EMP-006",
    name: "M. Ouattara Seydou",
    position: "Agent d'entretien",
    department: "Maintenance",
    email: "ouattara.seydou@edumanager.com",
    phone: "+225 05 67 89 01 23",
    joinDate: "10/11/2019",
    status: "Actif",
    type: "support",
    address: "Abidjan, Abobo",
    emergencyContact: "+225 05 90 12 34 56",
  },
  {
    id: "EMP-007",
    name: "M. Yao Kouadio",
    position: "Gardien",
    department: "Sécurité",
    email: "yao.kouadio@edumanager.com",
    phone: "+225 07 34 56 78 90",
    joinDate: "15/08/2020",
    status: "Actif",
    type: "support",
    address: "Abidjan, Koumassi",
    emergencyContact: "+225 07 12 34 56 78",
  },
  {
    id: "EMP-008",
    name: "Dr. Coulibaly Adama",
    position: "Professeur de Physique-Chimie",
    department: "Sciences",
    email: "coulibaly.adama@edumanager.com",
    phone: "+225 05 12 34 56 78",
    joinDate: "01/09/2018",
    status: "En congé",
    type: "teachers",
    address: "Abidjan, Riviera",
    qualification: "Doctorat en Physique",
    specialization: "Physique Quantique",
    emergencyContact: "+225 05 98 76 54 32",
  },
]
