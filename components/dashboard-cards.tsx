"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Users,
  Calculator,
  FileText,
  Calendar,
  BarChart2,
  ArrowLeftRight,
  MessageSquare,
  CreditCard,
  FileCheck,
  User,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"

export function DashboardCards() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)

  // Récupérer la configuration depuis le localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const modules = [
    {
      title: "Inscription",
      description: "Gestion des inscriptions et des dossiers élèves",
      icon: <Users className="h-6 w-6" />,
      href: "/inscriptions",
      color: "bg-blue-100 dark:bg-blue-900",
      enabled: config.modules.inscriptions,
    },
    {
      title: "Capital Humain",
      description: "Gestion du personnel enseignant et administratif",
      icon: <Users className="h-6 w-6" />,
      href: "/personnel",
      color: "bg-green-100 dark:bg-green-900",
      enabled: config.modules.personnel,
    },
    {
      title: "Comptabilité",
      description: "Gestion des finances de l'établissement",
      icon: <Calculator className="h-6 w-6" />,
      href: "/comptabilite",
      color: "bg-yellow-100 dark:bg-yellow-900",
      enabled: config.modules.comptabilite,
    },
    {
      title: "Examens",
      description: "Planification et gestion des évaluations",
      icon: <FileText className="h-6 w-6" />,
      href: "/examens",
      color: "bg-purple-100 dark:bg-purple-900",
      enabled: config.modules.examens,
    },
    {
      title: "Agenda",
      description: "Calendrier académique et événements",
      icon: <Calendar className="h-6 w-6" />,
      href: "/agenda",
      color: "bg-pink-100 dark:bg-pink-900",
      enabled: config.modules.agenda,
    },
    {
      title: "Suivi Académique",
      description: "Suivi des notes, absences et performances",
      icon: <BarChart2 className="h-6 w-6" />,
      href: "/suivi",
      color: "bg-indigo-100 dark:bg-indigo-900",
      enabled: config.modules.suivi,
    },
    {
      title: "Transferts",
      description: "Gestion des transferts entre établissements",
      icon: <ArrowLeftRight className="h-6 w-6" />,
      href: "/transferts",
      color: "bg-red-100 dark:bg-red-900",
      enabled: config.modules.transferts,
    },
    {
      title: "Communication",
      description: "Messagerie et notifications aux parents",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "/communication",
      color: "bg-teal-100 dark:bg-teal-900",
      enabled: config.modules.communication,
    },
    {
      title: "Paiements",
      description: "Gestion des frais de scolarité",
      icon: <CreditCard className="h-6 w-6" />,
      href: "/paiements",
      color: "bg-orange-100 dark:bg-orange-900",
      enabled: config.modules.paiements,
    },
    {
      title: "Documents",
      description: "Accès aux documents administratifs",
      icon: <FileCheck className="h-6 w-6" />,
      href: "/documents",
      color: "bg-cyan-100 dark:bg-cyan-900",
      enabled: config.modules.documents,
    },
    {
      title: "Espace Élève",
      description: "Espace personnalisé pour les élèves",
      icon: <User className="h-6 w-6" />,
      href: "/espace-eleve",
      color: "bg-lime-100 dark:bg-lime-900",
      enabled: config.modules.espaceEleve,
    },
    {
      title: "Santé",
      description: "Gestion de la santé scolaire",
      icon: <Activity className="h-6 w-6" />,
      href: "/sante",
      color: "bg-emerald-100 dark:bg-emerald-900",
      enabled: config.modules.sante,
    },
  ]

  // Filtrer les modules activés
  const enabledModules = modules.filter((module) => module.enabled)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {enabledModules.map((module) => (
        <Link href={module.href} key={module.title}>
          <Card className="h-full cursor-pointer transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
              <div className={`rounded-full p-2 ${module.color}`}>{module.icon}</div>
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
