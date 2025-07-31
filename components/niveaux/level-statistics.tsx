"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SchoolLevel } from "@/lib/data/levels"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface LevelStatisticsProps {
  levels: SchoolLevel[]
}

export function LevelStatistics({ levels }: LevelStatisticsProps) {
  // Calculer le nombre total d'élèves par niveau
  const levelData = levels.map((level) => {
    const totalStudents = level.classes.reduce((total, cls) => total + cls.students, 0)
    const totalCapacity = level.classes.reduce((total, cls) => total + cls.capacity, 0)
    const occupationRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0

    return {
      name: level.name,
      students: totalStudents,
      classes: level.classes.length,
      capacity: totalCapacity,
      occupationRate,
    }
  })

  // Données pour le graphique en camembert
  const pieData = levelData.map((item) => ({
    name: item.name,
    value: item.students,
  }))

  // Couleurs pour le graphique en camembert
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Calculer les totaux
  const totalStudents = levelData.reduce((sum, item) => sum + item.students, 0)
  const totalClasses = levelData.reduce((sum, item) => sum + item.classes, 0)
  const totalCapacity = levelData.reduce((sum, item) => sum + item.capacity, 0)
  const globalOccupationRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des élèves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalOccupationRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des élèves par niveau</CardTitle>
            <CardDescription>Nombre d'élèves dans chaque niveau scolaire</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" name="Élèves" fill="#045bac" />
                <Bar dataKey="capacity" name="Capacité" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution des élèves</CardTitle>
            <CardDescription>Pourcentage d'élèves par niveau</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails par niveau</CardTitle>
          <CardDescription>Statistiques détaillées pour chaque niveau scolaire</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Niveau</th>
                  <th className="p-2 text-left font-medium">Classes</th>
                  <th className="p-2 text-left font-medium">Élèves</th>
                  <th className="p-2 text-left font-medium">Capacité</th>
                  <th className="p-2 text-left font-medium">Taux d'occupation</th>
                </tr>
              </thead>
              <tbody>
                {levelData.map((level, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{level.name}</td>
                    <td className="p-2">{level.classes}</td>
                    <td className="p-2">{level.students}</td>
                    <td className="p-2">{level.capacity}</td>
                    <td className="p-2">{level.occupationRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
