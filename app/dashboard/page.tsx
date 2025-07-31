"use client"

import { useEffect, useState } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"

export default function DashboardPage() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)

  // Récupérer la configuration depuis le localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Tableau de bord - ${config.name}`}
        text={`Bienvenue dans votre système de gestion d'établissement scolaire. Année académique: ${config.academicYear}`}
      />
      <DashboardCards />
    </DashboardShell>
  )
}
