"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { FinancialData } from "@/lib/data/finances"
import type { SchoolConfig } from "@/lib/data/school-config"

interface FinancialOverviewProps {
  data: FinancialData
  config: SchoolConfig
}

export function FinancialOverview({ data, config }: FinancialOverviewProps) {
  // Calculer les tendances (comparaison avec le mois précédent)
  const currentMonth = new Date().getMonth()
  const previousMonthIndex = currentMonth > 0 ? currentMonth - 1 : 11
  const currentMonthData = data.monthlyData[currentMonth]
  const previousMonthData = data.monthlyData[previousMonthIndex]

  const revenueTrend =
    previousMonthData.revenue > 0
      ? ((currentMonthData.revenue - previousMonthData.revenue) / previousMonthData.revenue) * 100
      : 0
  const expenseTrend =
    previousMonthData.expense > 0
      ? ((currentMonthData.expense - previousMonthData.expense) / previousMonthData.expense) * 100
      : 0
  const balanceTrend =
    previousMonthData.balance !== 0
      ? ((currentMonthData.balance - previousMonthData.balance) / Math.abs(previousMonthData.balance)) * 100
      : 0

  // Formater les montants en FCFA
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Couleurs pour les graphiques
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {revenueTrend > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+{revenueTrend.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{revenueTrend.toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dépenses totales</CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.totalExpenses)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {expenseTrend > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">+{expenseTrend.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{expenseTrend.toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(data.balance)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {balanceTrend > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+{balanceTrend.toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{balanceTrend.toFixed(1)}%</span>
                </>
              )}
              <span className="ml-1">par rapport au mois précédent</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution financière</CardTitle>
          <CardDescription>Suivi des revenus, dépenses et solde au cours de l'année académique</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="area">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="area">Courbe</TabsTrigger>
              <TabsTrigger value="bar">Histogramme</TabsTrigger>
              <TabsTrigger value="cumulative">Cumulatif</TabsTrigger>
            </TabsList>
            <TabsContent value="area" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                  <Area type="monotone" dataKey="revenue" name="Revenus" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="expense" name="Dépenses" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="balance" name="Solde" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="bar" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                  <Bar dataKey="revenue" name="Revenus" fill="#8884d8" />
                  <Bar dataKey="expense" name="Dépenses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="cumulative" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.monthlyData.map((item, index, array) => {
                    // Calculer les valeurs cumulatives
                    const cumulativeRevenue = array
                      .slice(0, index + 1)
                      .reduce((sum, current) => sum + current.revenue, 0)
                    const cumulativeExpense = array
                      .slice(0, index + 1)
                      .reduce((sum, current) => sum + current.expense, 0)
                    const cumulativeBalance = cumulativeRevenue - cumulativeExpense

                    return {
                      ...item,
                      cumulativeRevenue,
                      cumulativeExpense,
                      cumulativeBalance,
                    }
                  })}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                  <Area
                    type="monotone"
                    dataKey="cumulativeRevenue"
                    name="Revenus cumulés"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeExpense"
                    name="Dépenses cumulées"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Solde cumulé"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des revenus</CardTitle>
            <CardDescription>Sources de revenus pour l'année académique {config.academicYear}</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.revenueSources}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="name"
                >
                  {data.revenueSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <CardDescription>Catégories de dépenses pour l'année académique {config.academicYear}</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="name"
                >
                  {data.expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé financier</CardTitle>
          <CardDescription>Vue d'ensemble des finances de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Revenus</h3>
                <div className="space-y-2">
                  {data.revenueSources.map((source) => (
                    <div key={source.id} className="flex justify-between">
                      <span>{source.name}</span>
                      <span className="font-medium">{formatAmount(source.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total des revenus</span>
                    <span>{formatAmount(data.totalRevenue)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Dépenses</h3>
                <div className="space-y-2">
                  {data.expenseCategories.map((category) => (
                    <div key={category.id} className="flex justify-between">
                      <span>{category.name}</span>
                      <span className="font-medium">{formatAmount(category.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total des dépenses</span>
                    <span>{formatAmount(data.totalExpenses)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Solde</span>
                <span className={data.balance >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatAmount(data.balance)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
