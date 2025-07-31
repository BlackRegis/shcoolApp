import type { Metadata } from "next"
import FinancesClientPage from "./finances-client-page"

export const metadata: Metadata = {
  title: "Finances | School Management System",
  description: "Tableau de bord financier pour suivre les revenus et dépenses",
}

export default function FinancesPage() {
  return <FinancesClientPage />
}
