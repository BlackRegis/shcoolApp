"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Données simulées pour l'historique des paiements
const paymentHistory = [
  {
    id: "PAY-2023-001",
    date: "15/09/2023",
    amount: "1,250,000 FCFA",
    method: "Virement bancaire",
    status: "Complété",
    description: "Abonnement annuel - 125 élèves",
  },
  {
    id: "PAY-2023-002",
    date: "20/10/2023",
    amount: "50,000 FCFA",
    method: "Mobile Money",
    status: "Complété",
    description: "Ajout de 5 élèves supplémentaires",
  },
  {
    id: "PAY-2024-001",
    date: "05/01/2024",
    amount: "100,000 FCFA",
    method: "Carte bancaire",
    status: "Complété",
    description: "Ajout de 10 élèves supplémentaires",
  },
  {
    id: "PAY-2024-002",
    date: "15/03/2024",
    amount: "1,400,000 FCFA",
    method: "Virement bancaire",
    status: "En attente",
    description: "Renouvellement abonnement - 140 élèves",
  },
]

export function PaymentHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complété":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Échoué":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des paiements</CardTitle>
        <CardDescription>Historique de tous les paiements effectués pour votre abonnement.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(payment.status)} variant="outline">
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
