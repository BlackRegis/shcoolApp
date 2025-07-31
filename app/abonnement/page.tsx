import type { Metadata } from "next"
import AbonnementClientPage from "./abonnement-client-page"

export const metadata: Metadata = {
  title: "Abonnement | School Management System",
  description: "Gestion de l'abonnement de l'établissement",
}

export default function AbonnementPage() {
  return <AbonnementClientPage />
}
