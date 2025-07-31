import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { StaffTable } from "@/components/staff-table"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Personnel | School Management System",
  description: "Gestion du personnel enseignant et administratif",
}

export default function PersonnelPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Personnel" text="Gérez le personnel enseignant et administratif.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Membre
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="teachers">Enseignants</TabsTrigger>
          <TabsTrigger value="admin">Administratifs</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card className="p-4">
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Total du personnel</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">Enseignants</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Administratifs</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Personnel de support</p>
          </Card>
        </div>

        <TabsContent value="all" className="mt-6">
          <StaffTable staffType="all" />
        </TabsContent>
        <TabsContent value="teachers" className="mt-6">
          <StaffTable staffType="teachers" />
        </TabsContent>
        <TabsContent value="admin" className="mt-6">
          <StaffTable staffType="admin" />
        </TabsContent>
        <TabsContent value="support" className="mt-6">
          <StaffTable staffType="support" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
