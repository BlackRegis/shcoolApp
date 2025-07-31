"use client"

import { useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinancialOverview } from "@/components/finances/financial-overview"
import { RevenueBreakdown } from "@/components/finances/revenue-breakdown"
import { ExpenseBreakdown } from "@/components/finances/expense-breakdown"
import { TransactionHistory } from "@/components/finances/transaction-history"
import { FinancialProjections } from "@/components/finances/financial-projections"
import { BudgetPlanning } from "@/components/finances/budget-planning"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"
import { type FinancialData, initialFinancialData } from "@/lib/data/finances"

export default function FinancesClientPage() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)
  const [financialData, setFinancialData] = useState<FinancialData>(initialFinancialData)
  const [loading, setLoading] = useState(true)

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }

    const savedFinancialData = localStorage.getItem("financialData")
    if (savedFinancialData) {
      setFinancialData(JSON.parse(savedFinancialData))
    }

    setLoading(false)
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("financialData", JSON.stringify(financialData))
  }, [financialData])

  // Fonction pour mettre à jour les données financières
  const updateFinancialData = (newData: Partial<FinancialData>) => {
    setFinancialData((prev) => ({ ...prev, ...newData }))
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tableau de Bord Financier"
        text={`Suivez les finances de ${config.name} pour l'année académique ${config.academicYear}`}
      />

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <FinancialOverview data={financialData} config={config} />
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <RevenueBreakdown data={financialData} updateData={updateFinancialData} />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <ExpenseBreakdown data={financialData} updateData={updateFinancialData} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionHistory data={financialData} updateData={updateFinancialData} />
        </TabsContent>

        <TabsContent value="projections" className="mt-6">
          <FinancialProjections data={financialData} config={config} />
        </TabsContent>

        <TabsContent value="budget" className="mt-6">
          <BudgetPlanning data={financialData} updateData={updateFinancialData} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
