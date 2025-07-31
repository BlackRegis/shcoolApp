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
const attendanceRecords = [
  {
    id: "ATT-001",
    student: "Konan Kouamé",
    studentId: "STD-001-2023",
    class: "Terminale A",
    date: "15/10/2023",
    status: "Présent",
    arrivalTime: "07:45",
    departureTime: "17:30",
    absenceReason: "-",
  },
  {
    id: "ATT-002",
    student: "Diallo Aminata",
    studentId: "STD-002-2023",
    class: "Seconde C",
    date: "15/10/2023",
    status: "Présent",
    arrivalTime: "07:50",
    departureTime: "17:30",
    absenceReason: "-",
  },
  {
    id: "ATT-003",
    student: "Ouattara Ibrahim",
    studentId: "STD-003-2023",
    class: "Première D",
    date: "15/10/2023",
    status: "Retard",
    arrivalTime: "08:15",
    departureTime: "17:30",
    absenceReason: "Transport",
  },
  {
    id: "ATT-004",
    student: "Bamba Fatoumata",
    studentId: "STD-004-2023",
    class: "Troisième",
    date: "15/10/2023",
    status: "Absent",
    arrivalTime: "-",
    departureTime: "-",
    absenceReason: "Maladie",
  },
  {
    id: "ATT-005",
    student: "Koffi Jean",
    studentId: "STD-005-2023",
    class: "Terminale D",
    date: "15/10/2023",
    status: "Présent",
    arrivalTime: "07:40",
    departureTime: "17:30",
    absenceReason: "-",
  },
  {
    id: "ATT-006",
    student: "Touré Mariam",
    studentId: "STD-006-2023",
    class: "Première A",
    date: "15/10/2023",
    status: "Absent",
    arrivalTime: "-",
    departureTime: "-",
    absenceReason: "Rendez-vous médical",
  },
]

export function StudentAttendanceTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Présent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Retard":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Absent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.class.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <Select defaultValue="15-10-2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15-10-2023">15/10/2023</SelectItem>
              <SelectItem value="14-10-2023">14/10/2023</SelectItem>
              <SelectItem value="13-10-2023">13/10/2023</SelectItem>
              <SelectItem value="12-10-2023">12/10/2023</SelectItem>
              <SelectItem value="11-10-2023">11/10/2023</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="present">Présent</SelectItem>
              <SelectItem value="late">Retard</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Élève</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Arrivée</TableHead>
              <TableHead>Départ</TableHead>
              <TableHead>Motif d'absence</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.student}</TableCell>
                <TableCell>{record.class}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)} variant="outline">
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>{record.arrivalTime}</TableCell>
                <TableCell>{record.departureTime}</TableCell>
                <TableCell>{record.absenceReason}</TableCell>
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
                      <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
                      <DropdownMenuItem>Ajouter un motif</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Historique de présence</DropdownMenuItem>
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
          Affichage de <strong>1</strong> à <strong>{filteredRecords.length}</strong> sur{" "}
          <strong>{attendanceRecords.length}</strong> enregistrements
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
