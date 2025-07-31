"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import type { FinancialData } from "@/lib/data/finances"
import type { SchoolConfig } from "@/lib/data/school-config"
import { useToast } from "@/components/ui/use-toast"

interface FinancialProjectionsProps {
  data: FinancialData
  config: SchoolConfig
}

export function FinancialProjections({ data, config }: FinancialProjectionsProps) {
  const [projectedRevenue, setProjectedRevenue] = useState(data.projectedRevenue)
  const [projectedExpenses, setProjectedExpenses] = useState(data.projectedExpenses)
  const [growthRate, setGrowthRate] = useState(5)
  const [inflationRate, setInflationRate] = useState(3)
  const { toast } = useToast()

  // Formater les montants en FCFA
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Générer des données de projection pour les 5 prochaines années
  const generateProjections = () => {
    const currentYear = new Date().getFullYear()
    const projections = []

    let revenue = data.totalRevenue
    let expenses = data.totalExpenses

    for (let i = 0; i < 5; i++) {
      const year = currentYear + i
      revenue = revenue * (1 + growthRate / 100)
      expenses = expenses * (1 + inflationRate / 100)

      projections.push({
        year: year.toString(),
        revenue,
        expenses,
        balance: revenue - expenses,
      })
    }

    return projections
  }

  const projectionData = generateProjections()

  // Calculer le retour sur investissement (ROI)
  const calculateROI = () => {
    const totalRevenue = projectionData.reduce((sum, item) => sum + item.revenue, 0)
    const totalExpenses = projectionData.reduce((sum, item) => sum + item.expenses, 0)
    const profit = totalRevenue - totalExpenses
    return (profit / totalExpenses) * 100
  }

  const roi = calculateROI()

  // Mettre à jour les projections
  const updateProjections = () => {
    toast({
      title: "Projections mises à jour",
      description: "Les projections financières ont été mises à jour avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projections financières</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus projetés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.projectedRevenue)}</div>
            <p className="text-xs text-muted-foreground">Année académique {config.academicYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dépenses projetées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.projectedExpenses)}</div>
            <p className="text-xs text-muted-foreground">Année académique {config.academicYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde projeté</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.projectedBalance)}</div>
            <p className="text-xs text-muted-foreground">Année académique {config.academicYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI projeté</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roi.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Sur 5 ans</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projections sur 5 ans</CardTitle>
          <CardDescription>Évolution projetée des revenus et dépenses pour les 5 prochaines années</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={projectionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => {
                  return (value / 1000000).toFixed(0) + "M"
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatAmount(value),
                  value > 0 ? "Revenus" : value < 0 ? "Dépenses" : "Solde",
                ]}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenus" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" name="Dépenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="balance" name="Solde" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Comparaison annuelle</CardTitle>
            <CardDescription>Comparaison des revenus et dépenses projetés par année</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  tickFormatter={(value) => {
                    return (value / 1000000).toFixed(0) + "M"
                  }}
                />
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
                <Bar dataKey="revenue" name="Revenus" fill="#8884d8" />
                <Bar dataKey="expenses" name="Dépenses" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres de projection</CardTitle>
            <CardDescription>Ajustez les paramètres pour affiner vos projections financières</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="growthRate">Taux de croissance des revenus (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Taux de croissance annuel prévu pour les revenus de l'établissement
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inflationRate">Taux d'inflation des dépenses (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Taux d'augmentation annuel prévu pour les dépenses de l'établissement
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectedRevenue">Revenus projetés pour {config.academicYear}</Label>
                <Input
                  id="projectedRevenue"
                  type="number"
                  value={projectedRevenue}
                  onChange={(e) => setProjectedRevenue(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectedExpenses">Dépenses projetées pour {config.academicYear}</Label>
                <Input
                  id="projectedExpenses"
                  type="number"
                  value={projectedExpenses}
                  onChange={(e) => setProjectedExpenses(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateProjections} className="w-full">
              Mettre à jour les projections
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
