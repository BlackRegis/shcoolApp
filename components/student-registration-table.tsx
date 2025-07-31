"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  Edit,
  Trash,
  Eye,
  FileText,
  MessageSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student } from "@/lib/data/students"
import { StudentForm } from "@/components/student-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface StudentRegistrationTableProps {
  students: Student[]
  setStudents: (students: Student[]) => void
}

export function StudentRegistrationTable({ students, setStudents }: StudentRegistrationTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Inactif":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Partiel":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Non payé":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)))
    setIsFormOpen(false)
    setIsEditing(false)
    setCurrentStudent(null)
    toast({
      title: "Élève modifié",
      description: `Les informations de ${updatedStudent.name} ont été mises à jour.`,
    })
  }

  const handleDeleteStudent = () => {
    if (currentStudent) {
      setStudents(students.filter((student) => student.id !== currentStudent.id))
      setIsDeleteDialogOpen(false)
      setCurrentStudent(null)
      toast({
        title: "Élève supprimé",
        description: `L'élève a été supprimé avec succès.`,
        variant: "destructive",
      })
    }
  }

  const openEditForm = (student: Student) => {
    setCurrentStudent(student)
    setIsEditing(true)
    setIsFormOpen(true)
  }

  const openDeleteDialog = (student: Student) => {
    setCurrentStudent(student)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (student: Student) => {
    setCurrentStudent(student)
    setIsViewDialogOpen(true)
  }

  const filteredStudents = students.filter((student) => {
    // Filtre de recherche
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtre de statut
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()

    // Filtre de classe
    const matchesClass = classFilter === "all" || student.class.toLowerCase().includes(classFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesClass
  })

  // Extraire les classes uniques pour le filtre
  const uniqueClasses = Array.from(new Set(students.map((student) => student.class)))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Input
            placeholder="Rechercher un élève..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="actif">Actif</SelectItem>
              <SelectItem value="en attente">En attente</SelectItem>
              <SelectItem value="inactif">Inactif</SelectItem>
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {uniqueClasses.map((className) => (
                <SelectItem key={className} value={className.toLowerCase()}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.registrationDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)} variant="outline">
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(student.paymentStatus)} variant="outline">
                      {student.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openViewDialog(student)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditForm(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDeleteDialog(student)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Imprimer la fiche
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Envoyer un message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucun élève trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Affichage de <strong>1</strong> à <strong>{filteredStudents.length}</strong> sur{" "}
          <strong>{students.length}</strong> élèves
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Formulaire d'ajout/modification d'élève */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setIsEditing(false)
          setCurrentStudent(null)
        }}
        onSubmit={isEditing ? handleUpdateStudent : handleUpdateStudent}
        student={currentStudent}
        isEditing={isEditing}
      />

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet élève ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à cet élève seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStudent} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de visualisation des détails */}
      <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Détails de l'élève</AlertDialogTitle>
          </AlertDialogHeader>
          {currentStudent && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informations personnelles</h3>
                <p>
                  <span className="font-medium">ID:</span> {currentStudent.id}
                </p>
                <p>
                  <span className="font-medium">Nom:</span> {currentStudent.name}
                </p>
                <p>
                  <span className="font-medium">Genre:</span> {currentStudent.gender}
                </p>
                <p>
                  <span className="font-medium">Date de naissance:</span> {currentStudent.birthDate}
                </p>
                <p>
                  <span className="font-medium">Adresse:</span> {currentStudent.address}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Informations scolaires</h3>
                <p>
                  <span className="font-medium">Classe:</span> {currentStudent.class}
                </p>
                <p>
                  <span className="font-medium">Date d'inscription:</span> {currentStudent.registrationDate}
                </p>
                <p>
                  <span className="font-medium">Statut:</span> {currentStudent.status}
                </p>
                <p>
                  <span className="font-medium">Statut de paiement:</span> {currentStudent.paymentStatus}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Informations des parents</h3>
                <p>
                  <span className="font-medium">Nom du parent:</span> {currentStudent.parentName}
                </p>
                <p>
                  <span className="font-medium">Téléphone:</span> {currentStudent.parentPhone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {currentStudent.parentEmail}
                </p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                openEditForm(currentStudent!)
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
