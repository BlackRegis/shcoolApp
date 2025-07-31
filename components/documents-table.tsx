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
  Download,
  Eye,
  Send,
  Lock,
  Trash,
  Edit,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Document, initialDocuments } from "@/lib/data/documents"
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

interface DocumentsTableProps {
  documentType: "all" | "certificates" | "reports" | "forms"
}

export function DocumentsTable({ documentType }: DocumentsTableProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedDocuments = localStorage.getItem("documents")
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments))
    }
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents))
  }, [documents])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Archivé":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Standard":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Restreint":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      case "Confidentiel":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getTypeMapping = () => {
    switch (documentType) {
      case "certificates":
        return "Certificat"
      case "reports":
        return "Bulletin"
      case "forms":
        return "Formulaire"
      default:
        return null
    }
  }

  const handleDeleteDocument = () => {
    if (currentDocument) {
      setDocuments(documents.filter((doc) => doc.id !== currentDocument.id))
      setIsDeleteDialogOpen(false)
      setCurrentDocument(null)
      toast({
        title: "Document supprimé",
        description: `Le document a été supprimé avec succès.`,
        variant: "destructive",
      })
    }
  }

  const openDeleteDialog = (document: Document) => {
    setCurrentDocument(document)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (document: Document) => {
    setCurrentDocument(document)
    setIsViewDialogOpen(true)
  }

  const filteredDocuments = documents
    .filter((doc) => {
      const typeMapping = getTypeMapping()
      return typeMapping === null || doc.type === typeMapping
    })
    .filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Input
          placeholder="Rechercher un document..."
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
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Élève</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Niveau d'accès</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.id}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.student}</TableCell>
                  <TableCell>{doc.createdDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.status)} variant="outline">
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccessLevelColor(doc.accessLevel)} variant="outline">
                      {doc.accessLevel === "Confidentiel" && <Lock className="mr-1 h-3 w-3" />}
                      {doc.accessLevel}
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
                        <DropdownMenuItem onClick={() => openViewDialog(doc)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualiser
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDeleteDialog(doc)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer par email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucun document trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Affichage de <strong>1</strong> à <strong>{filteredDocuments.length}</strong> sur{" "}
          <strong>
            {documentType === "all"
              ? documents.length
              : documents.filter((doc) => doc.type === getTypeMapping()).length}
          </strong>{" "}
          documents
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
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce document ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le document sera définitivement supprimé du système.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDocument} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de visualisation des détails */}
      <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Détails du document</AlertDialogTitle>
          </AlertDialogHeader>
          {currentDocument && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informations du document</h3>
                <p>
                  <span className="font-medium">ID:</span> {currentDocument.id}
                </p>
                <p>
                  <span className="font-medium">Nom:</span> {currentDocument.name}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {currentDocument.type}
                </p>
                <p>
                  <span className="font-medium">Date de création:</span> {currentDocument.createdDate}
                </p>
                <p>
                  <span className="font-medium">Statut:</span> {currentDocument.status}
                </p>
                <p>
                  <span className="font-medium">Niveau d'accès:</span> {currentDocument.accessLevel}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Informations associées</h3>
                <p>
                  <span className="font-medium">Élève:</span> {currentDocument.student}
                </p>
                <p>
                  <span className="font-medium">ID de l'élève:</span> {currentDocument.studentId}
                </p>
                <p>
                  <span className="font-medium">Créé par:</span> {currentDocument.createdBy || "Non spécifié"}
                </p>
                <p>
                  <span className="font-medium">Taille du fichier:</span> {currentDocument.fileSize || "Non spécifiée"}
                </p>
                <p>
                  <span className="font-medium">Dernière modification:</span>{" "}
                  {currentDocument.lastModified || "Non spécifiée"}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{currentDocument.description || "Aucune description disponible."}</p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
