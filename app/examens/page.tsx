import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ExamScheduleTable } from "@/components/exam-schedule-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Examens | School Management System",
  description: "Gestion des examens et évaluations",
}

export default function ExamsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Examens et Évaluations" text="Planifiez et gérez les examens et les évaluations.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel Examen
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="schedule" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Calendrier</TabsTrigger>
          <TabsTrigger value="results">Résultats</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Examens à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Examens en cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Examens terminés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
              </CardContent>
            </Card>
          </div>

          <ExamScheduleTable />
        </TabsContent>
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Résultats des examens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sélectionnez un examen dans le calendrier pour voir les résultats.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des examens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Les statistiques détaillées des examens seront affichées ici.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
