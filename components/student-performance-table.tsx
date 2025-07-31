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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const students = [
  {
    id: "STD-001-2023",
    name: "Konan Kouamé",
    class: "Terminale A",
    average: "16.5/20",
    rank: "1/35",
    attendance: "98%",
    status: "Excellent",
  },
  {
    id: "STD-002-2023",
    name: "Diallo Aminata",
    class: "Seconde C",
    average: "14.2/20",
    rank: "3/42",
    attendance: "95%",
    status: "Bien",
  },
  {
    id: "STD-003-2023",
    name: "Ouattara Ibrahim",
    class: "Première D",
    average: "12.8/20",
    rank: "8/38",
    attendance: "92%",
    status: "Assez bien",
  },
  {
    id: "STD-004-2023",
    name: "Bamba Fatoumata",
    class: "Troisième",
    average: "9.5/20",
    rank: "25/45",
    attendance: "85%",
    status: "En difficulté",
  },
  {
    id: "STD-005-2023",
    name: "Koffi Jean",
    class: "Terminale D",
    average: "15.7/20",
    rank: "2/40",
    attendance: "97%",
    status: "Très bien",
  },
  {
    id: "STD-006-2023",
    name: "Touré Mariam",
    class: "Première A",
    average: "11.2/20",
    rank: "15/36",
    attendance: "90%",
    status: "Passable",
  },
  {
    id: "STD-007-2023",
    name: "Coulibaly Seydou",
    class: "Terminale C",
    average: "8.5/20",
    rank: "30/38",
    attendance: "78%",
    status: "En difficulté",
  },
]

export function StudentPerformanceTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Très bien":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Bien":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Assez bien":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Passable":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "En difficulté":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="terminale-a">Terminale A</SelectItem>
              <SelectItem value="terminale-c">Terminale C</SelectItem>
              <SelectItem value="terminale-d">Terminale D</SelectItem>
              <SelectItem value="premiere-a">Première A</SelectItem>
              <SelectItem value="premiere-d">Première D</SelectItem>
              <SelectItem value="seconde-c">Seconde C</SelectItem>
              <SelectItem value="troisieme">Troisième</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="tres-bien">Très bien</SelectItem>
              <SelectItem value="bien">Bien</SelectItem>
              <SelectItem value="assez-bien">Assez bien</SelectItem>
              <SelectItem value="passable">Passable</SelectItem>
              <SelectItem value="difficulte">En difficulté</SelectItem>
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
              <TableHead>Moyenne</TableHead>
              <TableHead>Rang</TableHead>
              <TableHead>Présence</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.average}</TableCell>
                <TableCell>{student.rank}</TableCell>
                <TableCell>{student.attendance}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(student.status)} variant="outline">
                    {student.status}
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
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Voir le bulletin</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Historique des notes</DropdownMenuItem>
                      <DropdownMenuItem>Contacter les parents</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  )
}
