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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Search, Edit, Trash, Eye, Plus } from "lucide-react"
import type { SchoolLevel } from "@/lib/data/levels"
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

interface LevelsListProps {
  levels: SchoolLevel[]
  onEdit: (level: SchoolLevel) => void
  onDelete: (levelId: string) => void
}

export function LevelsList({ levels, onEdit, onDelete }: LevelsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLevel, setCurrentLevel] = useState<SchoolLevel | null>(null)

  const handleDeleteLevel = () => {
    if (currentLevel) {
      onDelete(currentLevel.id)
      setIsDeleteDialogOpen(false)
      setCurrentLevel(null)
    }
  }

  const openDeleteDialog = (level: SchoolLevel) => {
    setCurrentLevel(level)
    setIsDeleteDialogOpen(true)
  }

  const filteredLevels = levels.filter(
    (level) =>
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculer le nombre total d'élèves par niveau
  const getTotalStudents = (level: SchoolLevel) => {
    return level.classes.reduce((total, cls) => total + cls.students, 0)
  }

  // Calculer le nombre total de classes par niveau
  const getTotalClasses = (level: SchoolLevel) => {
    return level.classes.length
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Niveaux scolaires</CardTitle>
        <CardDescription>Gérez les différents niveaux scolaires de votre établissement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 w-full max-w-sm mb-4">
          <Input
            placeholder="Rechercher un niveau..."
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
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Élèves</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLevels.length > 0 ? (
                filteredLevels.map((level) => (
                  <TableRow key={level.id}>
                    <TableCell className="font-medium">{level.name}</TableCell>
                    <TableCell>{level.description}</TableCell>
                    <TableCell>{level.order}</TableCell>
                    <TableCell>{getTotalClasses(level)}</TableCell>
                    <TableCell>{getTotalStudents(level)}</TableCell>
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
                          <DropdownMenuItem onClick={() => onEdit(level)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(level)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une classe
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun niveau trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Dialogue de confirmation de suppression */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce niveau ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Toutes les classes associées à ce niveau seront également supprimées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteLevel} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
