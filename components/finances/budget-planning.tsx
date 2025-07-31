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
import { Progress } from "@/components/ui/progress"
import { PlusCircle, Edit, Trash } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import type { FinancialData, BudgetItem } from "@/lib/data/finances"
import { generateId } from "@/lib/utils/crud-helpers"
import { useToast } from "@/components/ui/use-toast"

interface BudgetPlanningProps {
  data: FinancialData
  updateData: (newData: Partial<FinancialData>) => void
}

export function BudgetPlanning({ data, updateData }: BudgetPlanningProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<BudgetItem | null>(null)
  const [formData, setFormData] = useState<Partial<BudgetItem>>({
    category: "",
    allocated: 0,
    spent: 0,
    remaining: 0,
    period: "",
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

  const handleAddBudget = () => {
    if (!formData.category || !formData.allocated || !formData.period) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const spent = formData.spent || 0
    const remaining = formData.allocated! - spent

    const newBudget: BudgetItem = {
      id: generateId("bdg"),
      category: formData.category!,
      allocated: formData.allocated!,
      spent: spent,
      remaining: remaining,
      period: formData.period!,
    }

    const newBudgetItems = [...data.budgetItems, newBudget]

    updateData({
      budgetItems: newBudgetItems,
    })

    setFormData({
      category: "",
      allocated: 0,
      spent: 0,
      remaining: 0,
      period: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Budget ajouté",
      description: `Le budget pour "${newBudget.category}" a été ajouté avec succès.`,
    })
  }

  const handleEditBudget = () => {
    if (!selectedBudget || !formData.category || !formData.allocated || !formData.period) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const spent = formData.spent || 0
    const remaining = formData.allocated! - spent

    const updatedBudget: BudgetItem = {
      ...selectedBudget,
      category: formData.category!,
      allocated: formData.allocated!,
      spent: spent,
      remaining: remaining,
      period: formData.period!,
    }

    const newBudgetItems = data.budgetItems.map((budget) => (budget.id === updatedBudget.id ? updatedBudget : budget))

    updateData({
      budgetItems: newBudgetItems,
    })

    setSelectedBudget(null)
    setFormData({
      category: "",
      allocated: 0,
      spent: 0,
      remaining: 0,
      period: "",
    })
    setIsEditDialogOpen(false)

    toast({
      title: "Budget modifié",
      description: `Le budget pour "${updatedBudget.category}" a été modifié avec succès.`,
    })
  }

  const handleDeleteBudget = (budgetId: string) => {
    const newBudgetItems = data.budgetItems.filter((budget) => budget.id !== budgetId)

    updateData({
      budgetItems: newBudgetItems,
    })

    toast({
      title: "Budget supprimé",
      description: "Le budget a été supprimé avec succès.",
      variant: "destructive",
    })
  }

  // Préparer les données pour le graphique
  const chartData = data.budgetItems.map((budget) => ({
    name: budget.category,
    allocated: budget.allocated,
    spent: budget.spent,
    remaining: budget.remaining,
    percentUsed: Math.round((budget.spent / budget.allocated) * 100),
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Planification budgétaire</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un budget</DialogTitle>
              <DialogDescription>Créez un nouveau budget pour une catégorie de dépenses.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Catégorie
                </Label>
                <Input
                  id="category"
                  value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="allocated" className="text-right">
                  Montant alloué
                </Label>
                <Input
                  id="allocated"
                  type="number"
                  value={formData.allocated || ""}
                  onChange={(e) => setFormData({ ...formData, allocated: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="spent" className="text-right">
                  Montant dépensé
                </Label>
                <Input
                  id="spent"
                  type="number"
                  value={formData.spent || ""}
                  onChange={(e) => setFormData({ ...formData, spent: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="period" className="text-right">
                  Période
                </Label>
                <Input
                  id="period"
                  value={formData.period || ""}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="Ex: Année académique 2023-2024"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddBudget}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier un budget</DialogTitle>
              <DialogDescription>Modifiez les détails de ce budget.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Catégorie
                </Label>
                <Input
                  id="edit-category"
                  value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-allocated" className="text-right">
                  Montant alloué
                </Label>
                <Input
                  id="edit-allocated"
                  type="number"
                  value={formData.allocated || ""}
                  onChange={(e) => setFormData({ ...formData, allocated: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-spent" className="text-right">
                  Montant dépensé
                </Label>
                <Input
                  id="edit-spent"
                  type="number"
                  value={formData.spent || ""}
                  onChange={(e) => setFormData({ ...formData, spent: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-period" className="text-right">
                  Période
                </Label>
                <Input
                  id="edit-period"
                  value={formData.period || ""}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditBudget}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Utilisation du budget</CardTitle>
            <CardDescription>Pourcentage d'utilisation du budget par catégorie</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 100,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="percentUsed" name="Pourcentage utilisé" fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percentUsed > 90 ? "#ff0000" : entry.percentUsed > 70 ? "#ffc658" : "#82ca9d"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparaison budget/dépenses</CardTitle>
            <CardDescription>Montants alloués vs montants dépensés par catégorie</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => {
                    return (value / 1000000).toFixed(0) + "M"
                  }}
                />
                <Tooltip formatter={(value) => formatAmount(value as number)} />
                <Legend />
                <Bar dataKey="allocated" name="Budget alloué" fill="#8884d8" />
                <Bar dataKey="spent" name="Montant dépensé" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail des budgets</CardTitle>
          <CardDescription>Liste de tous les budgets de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catégorie</TableHead>
                <TableHead>Montant alloué</TableHead>
                <TableHead>Montant dépensé</TableHead>
                <TableHead>Montant restant</TableHead>
                <TableHead>Utilisation</TableHead>
                <TableHead>Période</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.budgetItems.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.category}</TableCell>
                  <TableCell>{formatAmount(budget.allocated)}</TableCell>
                  <TableCell>{formatAmount(budget.spent)}</TableCell>
                  <TableCell>{formatAmount(budget.remaining)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={(budget.spent / budget.allocated) * 100} className="h-2" />
                      <span className="text-sm">{Math.round((budget.spent / budget.allocated) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{budget.period}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedBudget(budget)
                          setFormData({
                            category: budget.category,
                            allocated: budget.allocated,
                            spent: budget.spent,
                            remaining: budget.remaining,
                            period: budget.period,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
