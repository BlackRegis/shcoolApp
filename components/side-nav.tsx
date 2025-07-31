"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
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
  Settings,
  School,
  CreditCardIcon,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"

export function SideNav() {
  const pathname = usePathname()
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)

  // Récupérer la configuration depuis le localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const routes = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      title: "Tableau de bord",
      enabled: true, // Toujours activé
    },
    {
      href: "/inscriptions",
      icon: <Users className="mr-2 h-4 w-4" />,
      title: "Inscriptions",
      enabled: config.modules.inscriptions,
    },
    {
      href: "/personnel",
      icon: <Users className="mr-2 h-4 w-4" />,
      title: "Personnel",
      enabled: config.modules.personnel,
    },
    {
      href: "/niveaux",
      icon: <School className="mr-2 h-4 w-4" />,
      title: "Niveaux et Classes",
      enabled: true, // Toujours activé
    },
    {
      href: "/finances",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      title: "Finances",
      enabled: true, // Toujours activé
    },
    {
      href: "/comptabilite",
      icon: <Calculator className="mr-2 h-4 w-4" />,
      title: "Comptabilité",
      enabled: config.modules.comptabilite,
    },
    {
      href: "/examens",
      icon: <FileText className="mr-2 h-4 w-4" />,
      title: "Examens",
      enabled: config.modules.examens,
    },
    {
      href: "/agenda",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      title: "Agenda",
      enabled: config.modules.agenda,
    },
    {
      href: "/suivi",
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
      title: "Suivi",
      enabled: config.modules.suivi,
    },
    {
      href: "/transferts",
      icon: <ArrowLeftRight className="mr-2 h-4 w-4" />,
      title: "Transferts",
      enabled: config.modules.transferts,
    },
    {
      href: "/communication",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      title: "Communication",
      enabled: config.modules.communication,
    },
    {
      href: "/paiements",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      title: "Paiements",
      enabled: config.modules.paiements,
    },
    {
      href: "/documents",
      icon: <FileCheck className="mr-2 h-4 w-4" />,
      title: "Documents",
      enabled: config.modules.documents,
    },
    {
      href: "/espace-eleve",
      icon: <User className="mr-2 h-4 w-4" />,
      title: "Espace Élève",
      enabled: config.modules.espaceEleve,
    },
    {
      href: "/sante",
      icon: <Activity className="mr-2 h-4 w-4" />,
      title: "Santé",
      enabled: config.modules.sante,
    },
    {
      href: "/abonnement",
      icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
      title: "Abonnement",
      enabled: true, // Toujours activé
    },
    {
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      title: "Paramètres",
      enabled: true, // Toujours activé
    },
  ]

  // Filtrer les routes activées
  const enabledRoutes = routes.filter((route) => route.enabled)

  return (
    <nav className="grid items-start gap-2 py-4">
      {enabledRoutes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === route.href ? "font-medium" : "font-normal")}
          >
            {route.icon}
            {route.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
