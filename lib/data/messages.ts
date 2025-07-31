// Données des messages pour le module de communication
export type Message = {
  id: string
  subject: string
  recipients: string
  sentDate: string
  sentTime: string
  type: "Email" | "SMS" | "Email + SMS"
  status: "Envoyé" | "En attente" | "Échec"
  readRate: string
  content?: string
  sender?: string
  urgent?: boolean
}

// Données initiales
export const initialMessages: Message[] = [
  {
    id: "MSG-001",
    subject: "Réunion parents-professeurs",
    recipients: "Parents (Tous)",
    sentDate: "15/10/2023",
    sentTime: "14:30",
    type: "Email",
    status: "Envoyé",
    readRate: "72%",
    content:
      "Chers parents, nous vous invitons à la réunion parents-professeurs qui se tiendra le 25 octobre 2023 à partir de 15h00 dans les locaux de l'établissement. Votre présence est importante pour discuter des progrès de votre enfant.",
    sender: "Mme. Bamba Mariam",
    urgent: false,
  },
  {
    id: "MSG-002",
    subject: "Rappel: Paiement des frais de scolarité",
    recipients: "Parents (Impayés)",
    sentDate: "12/10/2023",
    sentTime: "09:15",
    type: "SMS",
    status: "Envoyé",
    readRate: "85%",
    content:
      "Rappel: La date limite pour le paiement des frais de scolarité est le 15 octobre. Veuillez régulariser votre situation au plus vite. Pour toute question, contactez le service comptabilité.",
    sender: "M. Koné Ibrahim",
    urgent: true,
  },
  {
    id: "MSG-003",
    subject: "Calendrier des examens trimestriels",
    recipients: "Parents et Élèves (Tous)",
    sentDate: "10/10/2023",
    sentTime: "16:45",
    type: "Email + SMS",
    status: "Envoyé",
    readRate: "91%",
    content:
      "Veuillez trouver ci-joint le calendrier des examens du premier trimestre qui se dérouleront du 20 au 30 novembre 2023. Les élèves sont priés de bien se préparer et d'être ponctuels.",
    sender: "Mme. Bamba Mariam",
    urgent: false,
  },
  {
    id: "MSG-004",
    subject: "Fermeture exceptionnelle - Journée pédagogique",
    recipients: "Parents (Tous)",
    sentDate: "05/10/2023",
    sentTime: "18:20",
    type: "Email + SMS",
    status: "Envoyé",
    readRate: "88%",
    content:
      "Nous vous informons que l'établissement sera fermé le vendredi 13 octobre en raison d'une journée pédagogique pour le personnel enseignant. Les cours reprendront normalement le lundi 16 octobre.",
    sender: "Direction",
    urgent: true,
  },
  {
    id: "MSG-005",
    subject: "Invitation: Journée portes ouvertes",
    recipients: "Parents (Tous)",
    sentDate: "01/10/2023",
    sentTime: "10:00",
    type: "Email",
    status: "Envoyé",
    readRate: "65%",
    content:
      "Nous avons le plaisir de vous inviter à notre journée portes ouvertes qui se tiendra le samedi 21 octobre de 9h à 16h. Venez découvrir les projets de nos élèves et rencontrer l'équipe pédagogique.",
    sender: "Direction",
    urgent: false,
  },
  {
    id: "MSG-006",
    subject: "Bulletin de notes - Premier trimestre",
    recipients: "Parents (Terminale)",
    sentDate: "25/09/2023",
    sentTime: "17:30",
    type: "Email",
    status: "Envoyé",
    readRate: "94%",
    content:
      "Les bulletins de notes du premier trimestre sont désormais disponibles dans l'espace parent. Vous pouvez les consulter et les télécharger dès maintenant.",
    sender: "Mme. Bamba Mariam",
    urgent: false,
  },
]
