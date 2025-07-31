"use client"

import { useState, useEffect } from "react"
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
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type StaffMember, initialStaffMembers } from "@/lib/data/staff"
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

interface StaffTableProps {
  staffType: "all" | "teachers" | "admin" | "support"
}

export function StaffTable({ staffType }: StaffTableProps) {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaffMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null)
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedStaff = localStorage.getItem("staffMembers")
    if (savedStaff) {
      setStaffMembers(JSON.parse(savedStaff))
    }
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("staffMembers", JSON.stringify(staffMembers))
  }, [staffMembers])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "En congé":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Inactif":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const handleDeleteStaff = () => {
    if (currentStaff) {
      setStaffMembers(staffMembers.filter((staff) => staff.id !== currentStaff.id))
      setIsDeleteDialogOpen(false)
      setCurrentStaff(null)
      toast({
        title: "Membre du personnel supprimé",
        description: `Le membre du personnel a été supprimé avec succès.`,
        variant: "destructive",
      })
    }
  }

  const openDeleteDialog = (staff: StaffMember) => {
    setCurrentStaff(staff)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (staff: StaffMember) => {
    setCurrentStaff(staff)
    setIsViewDialogOpen(true)
  }

  const filteredStaff = staffMembers
    .filter((staff) => staffType === "all" || staff.type === staffType)
    .filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Input
          placeholder="Rechercher un membre du personnel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Date d'embauche</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {staff.name}
                    </div>
                  </TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{staff.joinDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(staff.status)} variant="outline">
                      {staff.status}
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
                        <DropdownMenuItem onClick={() => openViewDialog(staff)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDeleteDialog(staff)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Gérer les absences
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Évaluation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Aucun membre du personnel trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Affichage de <strong>1</strong> à <strong>{filteredStaff.length}</strong> sur{" "}
          <strong>
            {staffType === "all" ? staffMembers.length : staffMembers.filter((s) => s.type === staffType).length}
          </strong>{" "}
          membres du personnel
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

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre du personnel ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à ce membre du personnel seront définitivement
              supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStaff} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de visualisation des détails */}
      <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Détails du membre du personnel</AlertDialogTitle>
          </AlertDialogHeader>
          {currentStaff && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informations personnelles</h3>
                <p>
                  <span className="font-medium">ID:</span> {currentStaff.id}
                </p>
                <p>
                  <span className="font-medium">Nom:</span> {currentStaff.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {currentStaff.email}
                </p>
                <p>
                  <span className="font-medium">Téléphone:</span> {currentStaff.phone}
                </p>
                <p>
                  <span className="font-medium">Adresse:</span> {currentStaff.address || "Non spécifiée"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Informations professionnelles</h3>
                <p>
                  <span className="font-medium">Poste:</span> {currentStaff.position}
                </p>
                <p>
                  <span className="font-medium">Département:</span> {currentStaff.department}
                </p>
                <p>
                  <span className="font-medium">Date d'embauche:</span> {currentStaff.joinDate}
                </p>
                <p>
                  <span className="font-medium">Statut:</span> {currentStaff.status}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Qualifications</h3>
                <p>
                  <span className="font-medium">Qualification:</span> {currentStaff.qualification || "Non spécifiée"}
                </p>
                <p>
                  <span className="font-medium">Spécialisation:</span> {currentStaff.specialization || "Non spécifiée"}
                </p>
                <p>
                  <span className="font-medium">Contact d'urgence:</span>{" "}
                  {currentStaff.emergencyContact || "Non spécifié"}
                </p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
