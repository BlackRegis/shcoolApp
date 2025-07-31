import type { Metadata } from "next"
import InscriptionsClientPage from "./inscriptions-client-page"

export const metadata: Metadata = {
  title: "Inscriptions | School Management System",
  description: "Gestion des inscriptions des élèves",
}

export default function InscriptionsPage() {
  return <InscriptionsClientPage />
}
