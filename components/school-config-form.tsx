"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type SchoolConfig, defaultSchoolConfig } from "@/lib/data/school-config"
import { Loader2, Save } from "lucide-react"

export function SchoolConfigForm() {
  const [config, setConfig] = useState<SchoolConfig>(defaultSchoolConfig)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Récupérer la configuration depuis le localStorage au chargement
  useEffect(() => {
    const savedConfig = localStorage.getItem("schoolConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const handleChange = (field: string, value: any) => {
    setConfig((prev) => {
      // Gestion des champs imbriqués (modules)
      if (field.startsWith("modules.")) {
        const moduleField = field.split(".")[1]
        return {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleField]: value,
          },
        }
      }

      // Champs normaux
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler une sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sauvegarder dans le localStorage
      localStorage.setItem("schoolConfig", JSON.stringify(config))

      toast({
        title: "Configuration sauvegardée",
        description: "Les paramètres de l'établissement ont été mis à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Configurez les informations de base de votre établissement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'établissement</Label>
                  <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Nom complet de l'établissement"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortName">Nom court</Label>
                  <Input
                    id="shortName"
                    value={config.shortName}
                    onChange={(e) => handleChange("shortName", e.target.value)}
                    placeholder="Acronyme ou nom court"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Année académique</Label>
                  <Input
                    id="academicYear"
                    value={config.academicYear}
                    onChange={(e) => handleChange("academicYear", e.target.value)}
                    placeholder="Ex: 2024-2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select value={config.currency} onValueChange={(value) => handleChange("currency", value)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Sélectionner une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCFA">FCFA</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordonnées</CardTitle>
              <CardDescription>Configurez les coordonnées de votre établissement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={config.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Adresse physique"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={config.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Ville"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={config.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Pays"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={config.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Numéro de téléphone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={config.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email de contact"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    value={config.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="Site web"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de votre plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-2">
                    {config.logo && (
                      <div className="h-10 w-10 rounded-md border overflow-hidden">
                        <img
                          src={config.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            handleChange("logo", event.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Couleur principale</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      placeholder="#045bac"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={config.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      placeholder="#f8f9fa"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
              <CardDescription>Activez ou désactivez les modules de la plateforme.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="inscriptions" className="flex flex-col space-y-1">
                    <span>Inscriptions</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Gestion des inscriptions et des dossiers élèves
                    </span>
                  </Label>
                  <Switch
                    id="inscriptions"
                    checked={config.modules.inscriptions}
                    onCheckedChange={(checked) => handleChange("modules.inscriptions", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="personnel" className="flex flex-col space-y-1">
                    <span>Personnel</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Gestion du personnel enseignant et administratif
                    </span>
                  </Label>
                  <Switch
                    id="personnel"
                    checked={config.modules.personnel}
                    onCheckedChange={(checked) => handleChange("modules.personnel", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="comptabilite" className="flex flex-col space-y-1">
                    <span>Comptabilité</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Gestion des finances de l'établissement
                    </span>
                  </Label>
                  <Switch
                    id="comptabilite"
                    checked={config.modules.comptabilite}
                    onCheckedChange={(checked) => handleChange("modules.comptabilite", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="examens" className="flex flex-col space-y-1">
                    <span>Examens</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Planification et gestion des évaluations
                    </span>
                  </Label>
                  <Switch
                    id="examens"
                    checked={config.modules.examens}
                    onCheckedChange={(checked) => handleChange("modules.examens", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="agenda" className="flex flex-col space-y-1">
                    <span>Agenda</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Calendrier académique et événements
                    </span>
                  </Label>
                  <Switch
                    id="agenda"
                    checked={config.modules.agenda}
                    onCheckedChange={(checked) => handleChange("modules.agenda", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="suivi" className="flex flex-col space-y-1">
                    <span>Suivi Académique</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Suivi des notes, absences et performances
                    </span>
                  </Label>
                  <Switch
                    id="suivi"
                    checked={config.modules.suivi}
                    onCheckedChange={(checked) => handleChange("modules.suivi", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="transferts" className="flex flex-col space-y-1">
                    <span>Transferts</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Gestion des transferts entre établissements
                    </span>
                  </Label>
                  <Switch
                    id="transferts"
                    checked={config.modules.transferts}
                    onCheckedChange={(checked) => handleChange("modules.transferts", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="communication" className="flex flex-col space-y-1">
                    <span>Communication</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Messagerie et notifications aux parents
                    </span>
                  </Label>
                  <Switch
                    id="communication"
                    checked={config.modules.communication}
                    onCheckedChange={(checked) => handleChange("modules.communication", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="paiements" className="flex flex-col space-y-1">
                    <span>Paiements</span>
                    <span className="text-xs font-normal text-muted-foreground">Gestion des frais de scolarité</span>
                  </Label>
                  <Switch
                    id="paiements"
                    checked={config.modules.paiements}
                    onCheckedChange={(checked) => handleChange("modules.paiements", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="documents" className="flex flex-col space-y-1">
                    <span>Documents</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Accès aux documents administratifs
                    </span>
                  </Label>
                  <Switch
                    id="documents"
                    checked={config.modules.documents}
                    onCheckedChange={(checked) => handleChange("modules.documents", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="espaceEleve" className="flex flex-col space-y-1">
                    <span>Espace Élève</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Espace personnalisé pour les élèves
                    </span>
                  </Label>
                  <Switch
                    id="espaceEleve"
                    checked={config.modules.espaceEleve}
                    onCheckedChange={(checked) => handleChange("modules.espaceEleve", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <Label htmlFor="sante" className="flex flex-col space-y-1">
                    <span>Santé</span>
                    <span className="text-xs font-normal text-muted-foreground">Gestion de la santé scolaire</span>
                  </Label>
                  <Switch
                    id="sante"
                    checked={config.modules.sante}
                    onCheckedChange={(checked) => handleChange("modules.sante", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres avancés</CardTitle>
              <CardDescription>Configurez les paramètres avancés de votre établissement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={config.language} onValueChange={(value) => handleChange("language", value)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Fuseau horaire</Label>
                  <Select value={config.timeZone} onValueChange={(value) => handleChange("timeZone", value)}>
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Sélectionner un fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Abidjan">Abidjan (GMT+0)</SelectItem>
                      <SelectItem value="Africa/Accra">Accra (GMT+0)</SelectItem>
                      <SelectItem value="Africa/Lagos">Lagos (GMT+1)</SelectItem>
                      <SelectItem value="Africa/Kinshasa">Kinshasa (GMT+1)</SelectItem>
                      <SelectItem value="Africa/Cairo">Le Caire (GMT+2)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (GMT+1/+2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
