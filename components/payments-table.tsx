"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  FileText,
  Send,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data
const payments = [
  {
    id: "PAY-001-2023",
    student: "Konan Kouamé",
    studentId: "STD-001-2023",
    class: "Terminale A",
    amount: "150,000 FCFA",
    date: "15/09/2023",
    type: "Frais de scolarité",
    method: "Mobile Money",
    status: "Payé",
  },
  {
    id: "PAY-002-2023",
    student: "Diallo Aminata",
    studentId: "STD-002-2023",
    class: "Seconde C",
    amount: "75,000 FCFA",
    date: "12/09/2023",
    type: "Acompte",
    method: "Virement bancaire",
    status: "Payé",
  },
  {
    id: "PAY-003-2023",
    student: "Ouattara Ibrahim",
    studentId: "STD-003-2023",
    class: "Première D",
    amount: "150,000 FCFA",
    date: "14/09/2023",
    type: "Frais de scolarité",
    method: "Carte bancaire",
    status: "Payé",
  },
  {
    id: "PAY-004-2023",
    student: "Bamba Fatoumata",
    studentId: "STD-004-2023",
    class: "Troisième",
    amount: "150,000 FCFA",
    date: "10/09/2023",
    type: "Frais de scolarité",
    method: "En attente",
    status: "En attente",
  },
  {
    id: "PAY-005-2023",
    student: "Koffi Jean",
    studentId: "STD-005-2023",
    class: "Terminale D",
    amount: "150,000 FCFA",
    date: "11/09/2023",
    type: "Frais de scolarité",
    method: "Mobile Money",
    status: "Payé",
  },
]

export function PaymentsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Annulé":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const filteredPayments = payments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Input
          placeholder="Rechercher un paiement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Élève</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.student}</TableCell>
                <TableCell>{payment.class}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(payment.status)} variant="outline">
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Imprimer le reçu
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le reçu
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Affichage de <strong>1</strong> à <strong>{filteredPayments.length}</strong> sur{" "}
          <strong>{payments.length}</strong> paiements
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
