"use client"
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
import { MoreHorizontal, FileText, Edit, Trash, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data
const exams = [
  {
    id: "EX-001",
    name: "Mathématiques - Contrôle 1",
    class: "Terminale D",
    date: "25/10/2023",
    time: "08:00 - 10:00",
    location: "Salle A1",
    status: "À venir",
  },
  {
    id: "EX-002",
    name: "Physique-Chimie - Devoir",
    class: "Première D",
    date: "26/10/2023",
    time: "10:30 - 12:30",
    location: "Laboratoire",
    status: "À venir",
  },
  {
    id: "EX-003",
    name: "Français - Dissertation",
    class: "Terminale A",
    date: "24/10/2023",
    time: "14:00 - 16:00",
    location: "Salle B2",
    status: "En cours",
  },
  {
    id: "EX-004",
    name: "Histoire-Géographie - Contrôle",
    class: "Seconde C",
    date: "23/10/2023",
    time: "08:00 - 10:00",
    location: "Salle C3",
    status: "Terminé",
  },
  {
    id: "EX-005",
    name: "SVT - Évaluation pratique",
    class: "Terminale D",
    date: "22/10/2023",
    time: "14:00 - 16:00",
    location: "Laboratoire",
    status: "Terminé",
  },
]

export function ExamScheduleTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "À venir":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "En cours":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Terminé":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Examen</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Horaire</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell className="font-medium">{exam.id}</TableCell>
              <TableCell>{exam.name}</TableCell>
              <TableCell>{exam.class}</TableCell>
              <TableCell>{exam.date}</TableCell>
              <TableCell>{exam.time}</TableCell>
              <TableCell>{exam.location}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(exam.status)} variant="outline">
                  {exam.status}
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir les détails
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Saisir les notes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
