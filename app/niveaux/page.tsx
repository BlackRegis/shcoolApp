import type { Metadata } from "next"
import NiveauxClientPage from "./niveaux-client-page"

export const metadata: Metadata = {
  title: "Niveaux et Classes | School Management System",
  description: "Gestion des niveaux scolaires et des classes",
}

export default function NiveauxPage() {
  return <NiveauxClientPage />
}
