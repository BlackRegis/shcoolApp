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
import type { FinancialData, ExpenseCategory } from "@/lib/data/finances"
import { generateId } from "@/lib/utils/crud-helpers"
import { useToast } from "@/components/ui/use-toast"

interface ExpenseBreakdownProps {
  data: FinancialData
  updateData: (newData: Partial<FinancialData>) => void
}

export function ExpenseBreakdown({ data, updateData }: ExpenseBreakdownProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null)
  const [formData, setFormData] = useState<Partial<ExpenseCategory>>({
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

  const handleAddCategory = () => {
    if (!formData.name || !formData.amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const newCategory: ExpenseCategory = {
      id: generateId("exp"),
      name: formData.name!,
      amount: formData.amount!,
      percentage: 0, // Sera calculé
    }

    const newCategories = [...data.expenseCategories, newCategory]
    const totalExpenses = newCategories.reduce((sum, category) => sum + category.amount, 0)

    // Recalculer les pourcentages
    const updatedCategories = newCategories.map((category) => ({
      ...category,
      percentage: Number.parseFloat(((category.amount / totalExpenses) * 100).toFixed(2)),
    }))

    updateData({
      expenseCategories: updatedCategories,
      totalExpenses,
      balance: data.totalRevenue - totalExpenses,
    })

    setFormData({ name: "", amount: 0 })
    setIsAddDialogOpen(false)

    toast({
      title: "Catégorie de dépenses ajoutée",
      description: `La catégorie "${newCategory.name}" a été ajoutée avec succès.`,
    })
  }

  const handleEditCategory = () => {
    if (!selectedCategory || !formData.name || !formData.amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const updatedCategory: ExpenseCategory = {
      ...selectedCategory,
      name: formData.name!,
      amount: formData.amount!,
    }

    const newCategories = data.expenseCategories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category,
    )
    const totalExpenses = newCategories.reduce((sum, category) => sum + category.amount, 0)

    // Recalculer les pourcentages
    const updatedCategories = newCategories.map((category) => ({
      ...category,
      percentage: Number.parseFloat(((category.amount / totalExpenses) * 100).toFixed(2)),
    }))

    updateData({
      expenseCategories: updatedCategories,
      totalExpenses,
      balance: data.totalRevenue - totalExpenses,
    })

    setSelectedCategory(null)
    setFormData({ name: "", amount: 0 })
    setIsEditDialogOpen(false)

    toast({
      title: "Catégorie de dépenses modifiée",
      description: `La catégorie "${updatedCategory.name}" a été modifiée avec succès.`,
    })
  }

  const handleDeleteCategory = (categoryId: string) => {
    const newCategories = data.expenseCategories.filter((category) => category.id !== categoryId)
    const totalExpenses = newCategories.reduce((sum, category) => sum + category.amount, 0)

    // Recalculer les pourcentages
    const updatedCategories = newCategories.map((category) => ({
      ...category,
      percentage: Number.parseFloat(((category.amount / totalExpenses) * 100).toFixed(2)),
    }))

    updateData({
      expenseCategories: updatedCategories,
      totalExpenses,
      balance: data.totalRevenue - totalExpenses,
    })

    toast({
      title: "Catégorie de dépenses supprimée",
      description: "La catégorie a été supprimée avec succès.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analyse des dépenses</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une catégorie de dépenses</DialogTitle>
              <DialogDescription>Ajoutez une nouvelle catégorie de dépenses à votre établissement.</DialogDescription>
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
              <Button onClick={handleAddCategory}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier une catégorie de dépenses</DialogTitle>
              <DialogDescription>Modifiez les détails de cette catégorie de dépenses.</DialogDescription>
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
              <Button onClick={handleEditCategory}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des dépenses</CardTitle>
            <CardDescription>Visualisation des catégories de dépenses</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Comparaison des dépenses</CardTitle>
            <CardDescription>Montants par catégorie de dépenses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.expenseCategories}
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
                <Bar dataKey="amount" name="Montant" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail des catégories de dépenses</CardTitle>
          <CardDescription>Liste de toutes les catégories de dépenses de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catégorie</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Pourcentage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenseCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{formatAmount(category.amount)}</TableCell>
                  <TableCell>{category.percentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(category)
                          setFormData({
                            name: category.name,
                            amount: category.amount,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
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
                <TableCell className="font-bold">{formatAmount(data.totalExpenses)}</TableCell>
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
