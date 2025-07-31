// Fonctions utilitaires pour les opérations CRUD

// Génère un ID unique basé sur un préfixe et la date actuelle
export function generateId(prefix: string): string {
  const date = new Date()
  const year = date.getFullYear()
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}-${randomNum}-${year}`
}

// Formate la date au format JJ/MM/AAAA
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Formate l'heure au format HH:MM
export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

// Vérifie si une chaîne est un email valide
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Vérifie si une chaîne est un numéro de téléphone valide
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9\s-]{8,15}$/
  return phoneRegex.test(phone)
}
