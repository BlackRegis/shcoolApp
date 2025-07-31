"use client"

import { useState } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SchoolConfigForm } from "@/components/school-config-form"

export default function SettingsClientPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState(theme || "system")

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
    setTheme(value)
    toast({
      title: "Thème modifié",
      description: `Le thème a été changé avec succès.`,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Paramètres" text="Gérez les paramètres de l'application." />

      <Tabs defaultValue="appearance" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="school">Établissement</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thème</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label
                      htmlFor="light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Sun className="mb-3 h-6 w-6" />
                      Clair
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label
                      htmlFor="dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Moon className="mb-3 h-6 w-6" />
                      Sombre
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label
                      htmlFor="system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Monitor className="mb-3 h-6 w-6" />
                      Système
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Couleurs</CardTitle>
              <CardDescription>Personnalisez les couleurs de l'application.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les couleurs de l'application sont définies par le thème. Vous pouvez changer le thème pour modifier les
                couleurs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Gérez les informations de votre profil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <div className="rounded-md border p-2">Admin</div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="rounded-md border p-2">admin@ecole.com</div>
              </div>
              <div className="space-y-2">
                <Label>Rôle</Label>
                <div className="rounded-md border p-2">Administrateur</div>
              </div>
              <Button>Modifier le profil</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Gérez les paramètres de sécurité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button>Changer le mot de passe</Button>
              <Button variant="outline">Activer l'authentification à deux facteurs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="school" className="mt-6">
          <SchoolConfigForm />
        </TabsContent>

        <TabsContent value="system" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Système</CardTitle>
              <CardDescription>Gérez les paramètres système de l'application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Version</Label>
                <div className="rounded-md border p-2">1.0.0</div>
              </div>
              <div className="space-y-2">
                <Label>Date de dernière mise à jour</Label>
                <div className="rounded-md border p-2">15/04/2025</div>
              </div>
              <Button>Vérifier les mises à jour</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données</CardTitle>
              <CardDescription>Gérez les données de l'application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button>Exporter les données</Button>
              <Button variant="outline">Importer des données</Button>
              <Button variant="destructive">Réinitialiser les données</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
