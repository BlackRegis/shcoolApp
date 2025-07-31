"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash } from "lucide-react"
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
import type { FinancialData, RevenueSource } from "@/lib/data/finances"
import { generateId } from "@/lib/utils/crud-helpers"
import { useToast } from "@/components/ui/use-toast"

interface RevenueBreakdownProps {
  data: FinancialData
  updateData: (newData: Partial<FinancialData>) => void
}

export function RevenueBreakdown({ data, updateData }: RevenueBreakdownProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState<RevenueSource | null>(null)
  const [formData, setFormData] = useState<Partial<RevenueSource>>({
    name: "",
    amount: 0,
  })
  const { toast } = useToast()

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

  const handleAddSource = () => {
    if (!formData.name || !formData.amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const newSource: RevenueSource = {
      id: generateId("rev"),
      name: formData.name!,
      amount: formData.amount!,
      percentage: 0, // Sera calculé
    }

    const newSources = [...data.revenueSources, newSource]
    const totalRevenue = newSources.reduce((sum, source) => sum + source.amount, 0)

    // Recalculer les pourcentages
    const updatedSources = newSources.map((source) => ({
      ...source,
      percentage: Number.parseFloat(((source.amount / totalRevenue) * 100).toFixed(2)),
    }))

    updateData({
      revenueSources: updatedSources,
      totalRevenue,
      balance: totalRevenue - data.totalExpenses,
    })

    setFormData({ name: "", amount: 0 })
    setIsAddDialogOpen(false)

    toast({
      title: "Source de revenus ajoutée",
      description: `La source "${newSource.name}" a été ajoutée avec succès.`,
    })
  }

  const handleEditSource = () => {
    if (!selectedSource || !formData.name || !formData.amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const updatedSource: RevenueSource = {
      ...selectedSource,
      name: formData.name!,
      amount: formData.amount!,
    }

    const newSources = data.revenueSources.map((source) => (source.id === updatedSource.id ? updatedSource : source))
    const totalRevenue = newSources.reduce((sum, source) => sum + source.amount, 0)

    // Recalculer les pourcentages
    const updatedSources = newSources.map((source) => ({
      ...source,
      percentage: Number.parseFloat(((source.amount / totalRevenue) * 100).toFixed(2)),
    }))

    updateData({
      revenueSources: updatedSources,
      totalRevenue,
      balance: totalRevenue - data.totalExpenses,
    })

    setSelectedSource(null)
    setFormData({ name: "", amount: 0 })
    setIsEditDialogOpen(false)

    toast({
      title: "Source de revenus modifiée",
      description: `La source "${updatedSource.name}" a été modifiée avec succès.`,
    })
  }

  const handleDeleteSource = (sourceId: string) => {
    const newSources = data.revenueSources.filter((source) => source.id !== sourceId)
    const totalRevenue = newSources.reduce((sum, source) => sum + source.amount, 0)

    // Recalculer les pourcentages
    const updatedSources = newSources.map((source) => ({
      ...source,
      percentage: Number.parseFloat(((source.amount / totalRevenue) * 100).toFixed(2)),
    }))

    updateData({
      revenueSources: updatedSources,
      totalRevenue,
      balance: totalRevenue - data.totalExpenses,
    })

    toast({
      title: "Source de revenus supprimée",
      description: "La source a été supprimée avec succès.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analyse des revenus</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une source de revenus</DialogTitle>
              <DialogDescription>Ajoutez une nouvelle source de revenus à votre établissement.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Montant (FCFA)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddSource}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier une source de revenus</DialogTitle>
              <DialogDescription>Modifiez les détails de cette source de revenus.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">
                  Montant (FCFA)
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditSource}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des revenus</CardTitle>
            <CardDescription>Visualisation des sources de revenus</CardDescription>
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
            <CardTitle>Comparaison des revenus</CardTitle>
            <CardDescription>Montants par source de revenus</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.revenueSources}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 100,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => {
                    return (value / 1000000).toFixed(0) + "M"
                  }}
                />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
                <Bar dataKey="amount" name="Montant" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail des sources de revenus</CardTitle>
          <CardDescription>Liste de toutes les sources de revenus de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Pourcentage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.revenueSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>{formatAmount(source.amount)}</TableCell>
                  <TableCell>{source.percentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedSource(source)
                          setFormData({
                            name: source.name,
                            amount: source.amount,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteSource(source.id)}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">{formatAmount(data.totalRevenue)}</TableCell>
                <TableCell className="font-bold">100%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
