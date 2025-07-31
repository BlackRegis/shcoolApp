"use client"

import { useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LevelsList } from "@/components/niveaux/levels-list"
import { ClassesList } from "@/components/niveaux/classes-list"
import { LevelStatistics } from "@/components/niveaux/level-statistics"
import { type SchoolLevel, initialLevels } from "@/lib/data/levels"
import { LevelForm } from "@/components/niveaux/level-form"
import { ClassForm } from "@/components/niveaux/class-form"
import { useToast } from "@/components/ui/use-toast"

export default function NiveauxClientPage() {
  const [levels, setLevels] = useState<SchoolLevel[]>(initialLevels)
  const [isLevelFormOpen, setIsLevelFormOpen] = useState(false)
  const [isClassFormOpen, setIsClassFormOpen] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel | null>(null)
  const [activeTab, setActiveTab] = useState("levels")
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedLevels = localStorage.getItem("schoolLevels")
    if (savedLevels) {
      setLevels(JSON.parse(savedLevels))
    }
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("schoolLevels", JSON.stringify(levels))
  }, [levels])

  const handleAddLevel = (level: SchoolLevel) => {
    const newLevels = [...levels, level]
    setLevels(newLevels)
    setIsLevelFormOpen(false)
    toast({
      title: "Niveau ajouté",
      description: `Le niveau ${level.name} a été ajouté avec succès.`,
    })
  }

  const handleUpdateLevel = (updatedLevel: SchoolLevel) => {
    const newLevels = levels.map((level) => (level.id === updatedLevel.id ? updatedLevel : level))
    setLevels(newLevels)
    setIsLevelFormOpen(false)
    setSelectedLevel(null)
    toast({
      title: "Niveau mis à jour",
      description: `Le niveau ${updatedLevel.name} a été mis à jour avec succès.`,
    })
  }

  const handleDeleteLevel = (levelId: string) => {
    const newLevels = levels.filter((level) => level.id !== levelId)
    setLevels(newLevels)
    toast({
      title: "Niveau supprimé",
      description: "Le niveau a été supprimé avec succès.",
      variant: "destructive",
    })
  }

  const handleAddClass = (levelId: string, newClass: any) => {
    const newLevels = levels.map((level) => {
      if (level.id === levelId) {
        return {
          ...level,
          classes: [...level.classes, newClass],
        }
      }
      return level
    })
    setLevels(newLevels)
    setIsClassFormOpen(false)
    toast({
      title: "Classe ajoutée",
      description: `La classe ${newClass.name} a été ajoutée avec succès.`,
    })
  }

  const handleUpdateClass = (levelId: string, updatedClass: any) => {
    const newLevels = levels.map((level) => {
      if (level.id === levelId) {
        return {
          ...level,
          classes: level.classes.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls)),
        }
      }
      return level
    })
    setLevels(newLevels)
    setIsClassFormOpen(false)
    toast({
      title: "Classe mise à jour",
      description: `La classe ${updatedClass.name} a été mise à jour avec succès.`,
    })
  }

  const handleDeleteClass = (levelId: string, classId: string) => {
    const newLevels = levels.map((level) => {
      if (level.id === levelId) {
        return {
          ...level,
          classes: level.classes.filter((cls) => cls.id !== classId),
        }
      }
      return level
    })
    setLevels(newLevels)
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès.",
      variant: "destructive",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Niveaux et Classes"
        text="Gérez les niveaux scolaires et les classes de votre établissement."
      >
        {activeTab === "levels" ? (
          <Button onClick={() => setIsLevelFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Niveau
          </Button>
        ) : (
          <Button onClick={() => setIsClassFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Classe
          </Button>
        )}
      </DashboardHeader>

      <Tabs defaultValue="levels" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="levels">Niveaux</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="mt-6">
          <LevelsList
            levels={levels}
            onEdit={(level) => {
              setSelectedLevel(level)
              setIsLevelFormOpen(true)
            }}
            onDelete={handleDeleteLevel}
          />
        </TabsContent>

        <TabsContent value="classes" className="mt-6">
          <ClassesList
            levels={levels}
            onEdit={(levelId, classItem) => {
              setSelectedLevel(levels.find((level) => level.id === levelId) || null)
              setIsClassFormOpen(true)
            }}
            onDelete={handleDeleteClass}
          />
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <LevelStatistics levels={levels} />
        </TabsContent>
      </Tabs>

      {/* Formulaire d'ajout/modification de niveau */}
      <LevelForm
        isOpen={isLevelFormOpen}
        onClose={() => {
          setIsLevelFormOpen(false)
          setSelectedLevel(null)
        }}
        onSubmit={selectedLevel ? handleUpdateLevel : handleAddLevel}
        level={selectedLevel}
        isEditing={!!selectedLevel}
      />

      {/* Formulaire d'ajout/modification de classe */}
      <ClassForm
        isOpen={isClassFormOpen}
        onClose={() => {
          setIsClassFormOpen(false)
          setSelectedLevel(null)
        }}
        onSubmit={
          selectedLevel
            ? (classData) => handleUpdateClass(selectedLevel.id, classData)
            : (classData) => handleAddClass(levels[0].id, classData)
        }
        levels={levels}
        selectedLevel={selectedLevel}
        isEditing={!!selectedLevel}
      />
    </DashboardShell>
  )
}
