import type { Metadata } from "next"
import SettingsClientPage from "./settings-client-page"

export const metadata: Metadata = {
  title: "Paramètres | School Management System",
  description: "Paramètres de l'application",
}

export default function SettingsPage() {
  return <SettingsClientPage />
}
