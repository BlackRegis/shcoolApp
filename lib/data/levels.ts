// Types pour les niveaux scolaires et les classes
export type SchoolClass = {
  id: string
  name: string
  capacity: number
  teacher: string
  students: number
}

export type SchoolLevel = {
  id: string
  name: string
  description: string
  order: number
  classes: SchoolClass[]
}

// Données initiales pour les niveaux scolaires
export const initialLevels: SchoolLevel[] = [
  {
    id: "LVL-001",
    name: "Primaire",
    description: "Classes du CP au CM2",
    order: 1,
    classes: [
      {
        id: "CLS-001",
        name: "CP",
        capacity: 30,
        teacher: "Mme Koné Aminata",
        students: 28,
      },
      {
        id: "CLS-002",
        name: "CE1",
        capacity: 30,
        teacher: "M. Touré Ibrahim",
        students: 25,
      },
      {
        id: "CLS-003",
        name: "CE2",
        capacity: 30,
        teacher: "Mme Diallo Fatoumata",
        students: 27,
      },
      {
        id: "CLS-004",
        name: "CM1",
        capacity: 35,
        teacher: "M. Ouattara Seydou",
        students: 32,
      },
      {
        id: "CLS-005",
        name: "CM2",
        capacity: 35,
        teacher: "Mme Bamba Mariam",
        students: 30,
      },
    ],
  },
  {
    id: "LVL-002",
    name: "Collège",
    description: "Classes de la 6ème à la 3ème",
    order: 2,
    classes: [
      {
        id: "CLS-006",
        name: "6ème A",
        capacity: 40,
        teacher: "M. Konaté Mamadou",
        students: 38,
      },
      {
        id: "CLS-007",
        name: "6ème B",
        capacity: 40,
        teacher: "Mme Cissé Aïcha",
        students: 36,
      },
      {
        id: "CLS-008",
        name: "5ème A",
        capacity: 40,
        teacher: "M. Traoré Bakary",
        students: 37,
      },
      {
        id: "CLS-009",
        name: "5ème B",
        capacity: 40,
        teacher: "Mme Sanogo Rokia",
        students: 35,
      },
      {
        id: "CLS-010",
        name: "4ème A",
        capacity: 45,
        teacher: "M. Coulibaly Adama",
        students: 42,
      },
      {
        id: "CLS-011",
        name: "4ème B",
        capacity: 45,
        teacher: "Mme Keita Aminata",
        students: 40,
      },
      {
        id: "CLS-012",
        name: "3ème A",
        capacity: 45,
        teacher: "M. Diabaté Souleymane",
        students: 43,
      },
      {
        id: "CLS-013",
        name: "3ème B",
        capacity: 45,
        teacher: "Mme Fofana Kadiatou",
        students: 41,
      },
    ],
  },
  {
    id: "LVL-003",
    name: "Lycée",
    description: "Classes de la Seconde à la Terminale",
    order: 3,
    classes: [
      {
        id: "CLS-014",
        name: "Seconde A",
        capacity: 50,
        teacher: "M. Camara Moussa",
        students: 48,
      },
      {
        id: "CLS-015",
        name: "Seconde B",
        capacity: 50,
        teacher: "Mme Touré Mariam",
        students: 45,
      },
      {
        id: "CLS-016",
        name: "Seconde C",
        capacity: 50,
        teacher: "M. Koné Issouf",
        students: 47,
      },
      {
        id: "CLS-017",
        name: "Première A",
        capacity: 45,
        teacher: "Mme Diarra Fatoumata",
        students: 42,
      },
      {
        id: "CLS-018",
        name: "Première D",
        capacity: 45,
        teacher: "M. Bamba Lassina",
        students: 40,
      },
      {
        id: "CLS-019",
        name: "Terminale A",
        capacity: 40,
        teacher: "Mme Konaté Aïssata",
        students: 38,
      },
      {
        id: "CLS-020",
        name: "Terminale D",
        capacity: 40,
        teacher: "M. Ouédraogo Karim",
        students: 35,
      },
    ],
  },
]
