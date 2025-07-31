"use client"

import { useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"
import type { Student } from "@/lib/data/students"
import { PaymentHistory } from "@/components/abonnement/payment-history"
import { InvoiceList } from "@/components/abonnement/invoice-list"
import { CreditCard, Download, Users } from "lucide-react"

export default function AbonnementClientPage() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }

    const savedStudents = localStorage.getItem("students")
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }

    setLoading(false)
  }, [])

  // Calcul du coût de l'abonnement
  const COST_PER_STUDENT = 10000 // FCFA par élève par an
  const totalStudents = students.length
  const totalCost = totalStudents * COST_PER_STUDENT

  // Simuler un abonnement actif jusqu'à une date future
  const today = new Date()
  const expiryDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
  const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const percentRemaining = (daysRemaining / 365) * 100

  // Simuler un paiement
  const handlePayment = () => {
    toast({
      title: "Paiement initié",
      description: "Vous allez être redirigé vers la page de paiement.",
    })
  }

  // Simuler un téléchargement de facture
  const handleDownloadInvoice = () => {
    toast({
      title: "Téléchargement de facture",
      description: "La facture a été téléchargée avec succès.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Abonnement" text="Gérez votre abonnement à la plateforme EduManager." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut de l'abonnement</CardTitle>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Actif
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{config.name}</div>
            <p className="text-xs text-muted-foreground">Expire le {expiryDate.toLocaleDateString()}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">Temps restant: {daysRemaining} jours</p>
              <Progress value={percentRemaining} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Année académique: {config.academicYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCost.toLocaleString()} FCFA</div>
            <p className="text-xs text-muted-foreground">
              {COST_PER_STUDENT.toLocaleString()} FCFA × {totalStudents} élèves
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'abonnement</CardTitle>
              <CardDescription>
                Votre abonnement est basé sur le nombre d'élèves inscrits dans votre établissement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Établissement</h3>
                  <p className="text-sm">Nom: {config.name}</p>
                  <p className="text-sm">
                    Adresse: {config.address}, {config.city}
                  </p>
                  <p className="text-sm">Email: {config.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Abonnement</h3>
                  <p className="text-sm">Type: Premium</p>
                  <p className="text-sm">Tarif: {COST_PER_STUDENT.toLocaleString()} FCFA par élève par an</p>
                  <p className="text-sm">Date d'expiration: {expiryDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Calcul du coût</h3>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between mb-2">
                    <span>Nombre d'élèves:</span>
                    <span>{totalStudents}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Coût par élève:</span>
                    <span>{COST_PER_STUDENT.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 mt-2">
                    <span>Coût total:</span>
                    <span>{totalCost.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleDownloadInvoice}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger la facture
              </Button>
              <Button onClick={handlePayment}>
                <CreditCard className="mr-2 h-4 w-4" />
                Renouveler l'abonnement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <PaymentHistory />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceList />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
