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
  Eye,
  Send,
  Copy,
  BarChart,
  Trash,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Message, initialMessages } from "@/lib/data/messages"
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

export function MessagesTable() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const { toast } = useToast()

  // Récupérer les données du localStorage au chargement
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Sauvegarder les données dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages))
  }, [messages])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Email":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "SMS":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Email + SMS":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const handleDeleteMessage = () => {
    if (currentMessage) {
      setMessages(messages.filter((message) => message.id !== currentMessage.id))
      setIsDeleteDialogOpen(false)
      setCurrentMessage(null)
      toast({
        title: "Message supprimé",
        description: `Le message a été supprimé avec succès.`,
        variant: "destructive",
      })
    }
  }

  const openDeleteDialog = (message: Message) => {
    setCurrentMessage(message)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (message: Message) => {
    setCurrentMessage(message)
    setIsViewDialogOpen(true)
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.recipients.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <Input
          placeholder="Rechercher un message..."
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
              <TableHead>Sujet</TableHead>
              <TableHead>Destinataires</TableHead>
              <TableHead>Date d'envoi</TableHead>
              <TableHead>Heure</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Taux de lecture</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.id}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>{message.recipients}</TableCell>
                  <TableCell>{message.sentDate}</TableCell>
                  <TableCell>{message.sentTime}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(message.type)} variant="outline">
                      {message.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{message.readRate}</TableCell>
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
                        <DropdownMenuItem onClick={() => openViewDialog(message)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart className="mr-2 h-4 w-4" />
                          Voir les statistiques
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Renvoyer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Dupliquer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(message)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucun message trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Affichage de <strong>1</strong> à <strong>{filteredMessages.length}</strong> sur{" "}
          <strong>{messages.length}</strong> messages
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
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce message ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le message sera définitivement supprimé du système.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMessage} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de visualisation des détails */}
      <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Détails du message</AlertDialogTitle>
          </AlertDialogHeader>
          {currentMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations générales</h3>
                  <p>
                    <span className="font-medium">ID:</span> {currentMessage.id}
                  </p>
                  <p>
                    <span className="font-medium">Sujet:</span> {currentMessage.subject}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {currentMessage.type}
                  </p>
                  <p>
                    <span className="font-medium">Expéditeur:</span> {currentMessage.sender || "Non spécifié"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Détails d'envoi</h3>
                  <p>
                    <span className="font-medium">Destinataires:</span> {currentMessage.recipients}
                  </p>
                  <p>
                    <span className="font-medium">Date d'envoi:</span> {currentMessage.sentDate}
                  </p>
                  <p>
                    <span className="font-medium">Heure d'envoi:</span> {currentMessage.sentTime}
                  </p>
                  <p>
                    <span className="font-medium">Taux de lecture:</span> {currentMessage.readRate}
                  </p>
                  <p>
                    <span className="font-medium">Urgent:</span> {currentMessage.urgent ? "Oui" : "Non"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contenu du message</h3>
                <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                  {currentMessage.content || "Aucun contenu disponible."}
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Renvoyer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
