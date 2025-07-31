"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Données simulées pour les factures
const invoices = [
  {
    id: "INV-2023-001",
    date: "15/09/2023",
    amount: "1,250,000 FCFA",
    period: "Année académique 2023-2024",
    status: "Payée",
  },
  {
    id: "INV-2023-002",
    date: "20/10/2023",
    amount: "50,000 FCFA",
    period: "Ajout d'élèves - Octobre 2023",
    status: "Payée",
  },
  {
    id: "INV-2024-001",
    date: "05/01/2024",
    amount: "100,000 FCFA",
    period: "Ajout d'élèves - Janvier 2024",
    status: "Payée",
  },
  {
    id: "INV-2024-002",
    date: "15/03/2024",
    amount: "1,400,000 FCFA",
    period: "Année académique 2024-2025",
    status: "En attente",
  },
]

export function InvoiceList() {
  const { toast } = useToast()

  const handleViewInvoice = (id: string) => {
    toast({
      title: "Visualisation de facture",
      description: `Affichage de la facture ${id}`,
    })
  }

  const handleDownloadInvoice = (id: string) => {
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${id} a été téléchargée avec succès.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Factures</CardTitle>
        <CardDescription>Liste de toutes les factures générées pour votre abonnement.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.period}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewInvoice(invoice.id)}
                      title="Voir la facture"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      title="Télécharger la facture"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
