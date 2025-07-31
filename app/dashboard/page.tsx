"use client"

import { useEffect, useState } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardStats } from "@/components/dashboard-stats" // Import the new component
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"
import { initialStudents, type Student } from "@/lib/data/students" // Import student data

export default function DashboardPage() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)
  const [students, setStudents] = useState<Student[]>(initialStudents) // State for students

  // Récupérer la configuration et les élèves depuis le localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
    // In a real application, you would fetch this from a database
    // For now, we use initialStudents from lib/data/students.ts
    setStudents(initialStudents)
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Tableau de bord - ${config.name}`}
        text={`Bienvenue dans votre système de gestion d'établissement scolaire. Année académique: ${config.academicYear}`}
      />
      {/* Add the new DashboardStats component here */}
      <DashboardStats students={students} />
      <DashboardCards />
    </DashboardShell>
  )
}
