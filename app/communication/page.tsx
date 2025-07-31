import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessagesTable } from "@/components/messages-table"
import { MessageComposer } from "@/components/message-composer"

export const metadata: Metadata = {
  title: "Communication | School Management System",
  description: "Communication avec les parents et les élèves",
}

export default function CommunicationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Communication" text="Gérez la communication avec les parents et les élèves.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Message
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="messages" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="compose">Composer</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card className="p-4">
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Messages envoyés</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">Messages lus</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">389</div>
            <p className="text-xs text-muted-foreground">Messages non lus</p>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Taux de lecture</p>
          </Card>
        </div>

        <TabsContent value="messages" className="mt-6">
          <MessagesTable />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Gérez les notifications automatiques envoyées aux parents et élèves.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette section vous permet de configurer les notifications automatiques pour les événements importants
                comme les examens, les réunions, et les échéances de paiement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compose" className="mt-6">
          <MessageComposer />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
