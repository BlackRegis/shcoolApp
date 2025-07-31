"use client"

import { useState, useEffect } from "react"
import DashboardShell from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { StudentRegistrationTable } from "@/components/student-registration-table"
import { Card } from "@/components/ui/card"
import { StudentForm } from "@/components/student-form"
import { type Student, initialStudents } from "@/lib/data/students"
import { generateId, formatDate } from "@/lib/utils/crud-helpers"
import { useToast } from "@/components/ui/use-toast"

export default function InscriptionsClientPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedStudents = localStorage.getItem("students")
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  const handleAddStudent = (student: Student) => {
    // Générer un ID et ajouter la date d'inscription si ce n'est pas déjà fait
    const newStudent = {
      ...student,
      id: student.id || generateId("STD"),
      registrationDate: student.registrationDate || formatDate(new Date()),
    }

    setStudents([...students, newStudent])
    setIsFormOpen(false)
    toast({
      title: "Élève ajouté",
      description: `L'élève ${student.name} a été ajouté avec succès.`,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Inscriptions" text="Gérez les inscriptions et les dossiers des élèves.">
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle Inscription
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card className="p-4">
          <div className="text-2xl font-bold">{students.length}</div>
          <p className="text-xs text-muted-foreground">Élèves inscrits</p>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">
            {
              students.filter((s) => {
                const parts = s.registrationDate.split("/")
                const regDate = new Date(
                  Number.parseInt(parts[2]),
                  Number.parseInt(parts[1]) - 1,
                  Number.parseInt(parts[0]),
                )
                const oneMonthAgo = new Date()
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
                return regDate > oneMonthAgo
              }).length
            }
          </div>
          <p className="text-xs text-muted-foreground">Nouvelles inscriptions</p>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{students.filter((s) => s.status === "En attente").length}</div>
          <p className="text-xs text-muted-foreground">En attente</p>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Transferts</p>
        </Card>
      </div>

      <div className="mt-6">
        <StudentRegistrationTable students={students} setStudents={setStudents} />
      </div>

      {/* Formulaire d'ajout d'élève */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddStudent}
        student={null}
        isEditing={false}
      />
    </DashboardShell>
  )
}
