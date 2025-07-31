import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentPerformanceTable } from "@/components/student-performance-table"
import { StudentAttendanceTable } from "@/components/student-attendance-table"

export const metadata: Metadata = {
  title: "Suivi Académique | School Management System",
  description: "Suivi des performances académiques et des présences des élèves",
}

export default function SuiviPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Suivi Académique" text="Suivez les performances et les présences des élèves." />

      <Tabs defaultValue="performance" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performances</TabsTrigger>
          <TabsTrigger value="attendance">Présences</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card className="p-4">
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Moyenne générale</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Taux de présence</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">Taux de réussite</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Élèves en difficulté</p>
          </Card>
        </div>

        <TabsContent value="performance" className="mt-6">
          <StudentPerformanceTable />
        </TabsContent>
        <TabsContent value="attendance" className="mt-6">
          <StudentAttendanceTable />
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapports académiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette section vous permet de générer des rapports détaillés sur les performances académiques des élèves.
              </p>
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Rapport de performance par classe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Rapport de présence mensuel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Rapport d'évolution des notes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Rapport des élèves en difficulté
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
