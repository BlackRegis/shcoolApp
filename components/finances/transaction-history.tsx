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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter } from "lucide-react"
import type { FinancialData, Transaction } from "@/lib/data/finances"
import { generateId, formatDate } from "@/lib/utils/crud-helpers"
import { useToast } from "@/components/ui/use-toast"

interface TransactionHistoryProps {
  data: FinancialData
  updateData: (newData: Partial<FinancialData>) => void
}

export function TransactionHistory({ data, updateData }: TransactionHistoryProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [formData, setFormData] = useState<Partial<Transaction>>({
    date: formatDate(new Date()),
    description: "",
    amount: 0,
    type: "revenue",
    category: "",
    paymentMethod: "",
    status: "completed",
    reference: "",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "expense":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount || !formData.category || !formData.paymentMethod) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newTransaction: Transaction = {
      id: generateId("trx"),
      date: formData.date!,
      description: formData.description!,
      amount: formData.amount!,
      type: formData.type as "revenue" | "expense",
      category: formData.category!,
      paymentMethod: formData.paymentMethod!,
      status: formData.status as "completed" | "pending" | "cancelled",
      reference: formData.reference,
    }

    const newTransactions = [...data.transactions, newTransaction]

    // Mettre à jour les totaux
    let totalRevenue = data.totalRevenue
    let totalExpenses = data.totalExpenses

    if (newTransaction.type === "revenue" && newTransaction.status === "completed") {
      totalRevenue += newTransaction.amount
    } else if (newTransaction.type === "expense" && newTransaction.status === "completed") {
      totalExpenses += newTransaction.amount
    }

    updateData({
      transactions: newTransactions,
      totalRevenue,
      totalExpenses,
      balance: totalRevenue - totalExpenses,
    })

    setFormData({
      date: formatDate(new Date()),
      description: "",
      amount: 0,
      type: "revenue",
      category: "",
      paymentMethod: "",
      status: "completed",
      reference: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Transaction ajoutée",
      description: `La transaction a été ajoutée avec succès.`,
    })
  }

  // Filtrer les transactions
  const filteredTransactions = data.transactions
    .filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((transaction) => typeFilter === "all" || transaction.type === typeFilter)
    .filter((transaction) => statusFilter === "all" || transaction.status === statusFilter)
    .sort((a, b) => {
      // Convertir les dates au format JJ/MM/AAAA en objets Date pour le tri
      const dateA = a.date.split("/").reverse().join("-")
      const dateB = b.date.split("/").reverse().join("-")
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historique des transactions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter une transaction</DialogTitle>
              <DialogDescription>Enregistrez une nouvelle transaction financière.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="JJ/MM/AAAA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type || "revenue"}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenu</SelectItem>
                      <SelectItem value="expense">Dépense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de la transaction"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (FCFA)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount || ""}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    placeholder="Montant"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Catégorie"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Méthode de paiement</Label>
                  <Input
                    id="paymentMethod"
                    value={formData.paymentMethod || ""}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    placeholder="Ex: Virement, Espèces..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status || "completed"}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Complété</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Référence (optionnel)</Label>
                <Input
                  id="reference"
                  value={formData.reference || ""}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="Numéro de référence"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddTransaction}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Historique de toutes les transactions financières</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Input
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="revenue">Revenus</SelectItem>
                  <SelectItem value="expense">Dépenses</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Référence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell
                        className={
                          transaction.type === "revenue" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                        }
                      >
                        {transaction.type === "revenue" ? "+" : "-"}
                        {formatAmount(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(transaction.type)} variant="outline">
                          {transaction.type === "revenue" ? "Revenu" : "Dépense"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)} variant="outline">
                          {transaction.status === "completed"
                            ? "Complété"
                            : transaction.status === "pending"
                              ? "En attente"
                              : "Annulé"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.reference || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucune transaction trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
