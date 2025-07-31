// Types pour la configuration de l'établissement
export type SchoolConfig = {
  id: string
  name: string
  shortName: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  website: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  academicYear: string
  currency: string
  language: string
  timeZone: string
  modules: {
    inscriptions: boolean
    personnel: boolean
    comptabilite: boolean
    examens: boolean
    agenda: boolean
    suivi: boolean
    transferts: boolean
    communication: boolean
    paiements: boolean
    documents: boolean
    espaceEleve: boolean
    sante: boolean
  }
}

// Configuration par défaut
export const defaultSchoolConfig: SchoolConfig = {
  id: "SCH-001",
  name: "Lycée Moderne d'Excellence",
  shortName: "LME",
  address: "123 Avenue de l'Éducation",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  phone: "+225 07 12 34 56 78",
  email: "contact@lme.edu.ci",
  website: "www.lme.edu.ci",
  logo: "",
  primaryColor: "#045bac",
  secondaryColor: "#f8f9fa",
  academicYear: "2024-2025",
  currency: "FCFA",
  language: "fr",
  timeZone: "Africa/Abidjan",
  modules: {
    inscriptions: true,
    personnel: true,
    comptabilite: true,
    examens: true,
    agenda: true,
    suivi: true,
    transferts: true,
    communication: true,
    paiements: true,
    documents: true,
    espaceEleve: true,
    sante: true,
  },
}
