import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { PaymentsTable } from "@/components/payments-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Paiements | School Management System",
  description: "Gestion des paiements et frais de scolarité",
}

export default function PaymentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Paiements" text="Gérez les paiements et les frais de scolarité.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Paiement
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des recettes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,500,000 FCFA</div>
            <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,200,000 FCFA</div>
            <p className="text-xs text-muted-foreground">42 élèves concernés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de recouvrement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en ligne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <p className="text-xs text-muted-foreground">Des paiements effectués en ligne</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <PaymentsTable />
      </div>
    </DashboardShell>
  )
}
