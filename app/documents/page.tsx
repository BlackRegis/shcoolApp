import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DocumentsTable } from "@/components/documents-table"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Documents | School Management System",
  description: "Gestion des documents administratifs",
}

export default function DocumentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Documents" text="Gérez les documents administratifs et scolaires.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Document
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="certificates">Certificats</TabsTrigger>
          <TabsTrigger value="reports">Bulletins</TabsTrigger>
          <TabsTrigger value="forms">Formulaires</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card className="p-4">
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">Documents totaux</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Certificats</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Bulletins</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Formulaires</p>
          </Card>
        </div>

        <TabsContent value="all" className="mt-6">
          <DocumentsTable documentType="all" />
        </TabsContent>
        <TabsContent value="certificates" className="mt-6">
          <DocumentsTable documentType="certificates" />
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <DocumentsTable documentType="reports" />
        </TabsContent>
        <TabsContent value="forms" className="mt-6">
          <DocumentsTable documentType="forms" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
