// Types pour les données financières
export type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "revenue" | "expense"
  category: string
  paymentMethod: string
  status: "completed" | "pending" | "cancelled"
  reference?: string
}

export type BudgetItem = {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  period: string
}

export type RevenueSource = {
  id: string
  name: string
  amount: number
  percentage: number
}

export type ExpenseCategory = {
  id: string
  name: string
  amount: number
  percentage: number
}

export type MonthlyFinancial = {
  month: string
  revenue: number
  expense: number
  balance: number
}

export type FinancialData = {
  totalRevenue: number
  totalExpenses: number
  balance: number
  revenueSources: RevenueSource[]
  expenseCategories: ExpenseCategory[]
  transactions: Transaction[]
  budgetItems: BudgetItem[]
  monthlyData: MonthlyFinancial[]
  projectedRevenue: number
  projectedExpenses: number
  projectedBalance: number
}

// Données initiales
export const initialFinancialData: FinancialData = {
  totalRevenue: 45250000,
  totalExpenses: 32750000,
  balance: 12500000,
  revenueSources: [
    {
      id: "rev-001",
      name: "Frais de scolarité",
      amount: 35000000,
      percentage: 77.35,
    },
    {
      id: "rev-002",
      name: "Abonnement plateforme",
      amount: 1400000,
      percentage: 3.09,
    },
    {
      id: "rev-003",
      name: "Activités parascolaires",
      amount: 3500000,
      percentage: 7.73,
    },
    {
      id: "rev-004",
      name: "Cantine",
      amount: 4200000,
      percentage: 9.28,
    },
    {
      id: "rev-005",
      name: "Dons et subventions",
      amount: 1150000,
      percentage: 2.55,
    },
  ],
  expenseCategories: [
    {
      id: "exp-001",
      name: "Salaires",
      amount: 22500000,
      percentage: 68.7,
    },
    {
      id: "exp-002",
      name: "Équipements",
      amount: 3500000,
      percentage: 10.69,
    },
    {
      id: "exp-003",
      name: "Maintenance",
      amount: 1800000,
      percentage: 5.5,
    },
    {
      id: "exp-004",
      name: "Fournitures",
      amount: 2100000,
      percentage: 6.41,
    },
    {
      id: "exp-005",
      name: "Services publics",
      amount: 1350000,
      percentage: 4.12,
    },
    {
      id: "exp-006",
      name: "Loyer",
      amount: 1500000,
      percentage: 4.58,
    },
  ],
  transactions: [
    {
      id: "trx-001",
      date: "15/09/2023",
      description: "Paiement frais de scolarité - Trimestre 1",
      amount: 12500000,
      type: "revenue",
      category: "Frais de scolarité",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SCH-2023-T1",
    },
    {
      id: "trx-002",
      date: "20/09/2023",
      description: "Salaires du personnel - Septembre 2023",
      amount: 7500000,
      type: "expense",
      category: "Salaires",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SAL-2023-09",
    },
    {
      id: "trx-003",
      date: "05/10/2023",
      description: "Achat de matériel informatique",
      amount: 1200000,
      type: "expense",
      category: "Équipements",
      paymentMethod: "Chèque",
      status: "completed",
      reference: "EQP-2023-10",
    },
    {
      id: "trx-004",
      date: "15/10/2023",
      description: "Paiement activités parascolaires",
      amount: 1500000,
      type: "revenue",
      category: "Activités parascolaires",
      paymentMethod: "Mobile Money",
      status: "completed",
      reference: "ACT-2023-10",
    },
    {
      id: "trx-005",
      date: "20/10/2023",
      description: "Salaires du personnel - Octobre 2023",
      amount: 7500000,
      type: "expense",
      category: "Salaires",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SAL-2023-10",
    },
    {
      id: "trx-006",
      date: "01/11/2023",
      description: "Paiement services publics",
      amount: 450000,
      type: "expense",
      category: "Services publics",
      paymentMethod: "Prélèvement automatique",
      status: "completed",
      reference: "UTL-2023-11",
    },
    {
      id: "trx-007",
      date: "10/11/2023",
      description: "Recettes cantine - Octobre 2023",
      amount: 1400000,
      type: "revenue",
      category: "Cantine",
      paymentMethod: "Espèces",
      status: "completed",
      reference: "CNT-2023-10",
    },
    {
      id: "trx-008",
      date: "15/11/2023",
      description: "Don association des parents d'élèves",
      amount: 750000,
      type: "revenue",
      category: "Dons et subventions",
      paymentMethod: "Chèque",
      status: "completed",
      reference: "DON-2023-11",
    },
    {
      id: "trx-009",
      date: "20/11/2023",
      description: "Salaires du personnel - Novembre 2023",
      amount: 7500000,
      type: "expense",
      category: "Salaires",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SAL-2023-11",
    },
    {
      id: "trx-010",
      date: "01/12/2023",
      description: "Paiement loyer - Trimestre 4",
      amount: 1500000,
      type: "expense",
      category: "Loyer",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "LOY-2023-T4",
    },
    {
      id: "trx-011",
      date: "10/12/2023",
      description: "Paiement frais de scolarité - Trimestre 2",
      amount: 12500000,
      type: "revenue",
      category: "Frais de scolarité",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SCH-2023-T2",
    },
    {
      id: "trx-012",
      date: "15/12/2023",
      description: "Achat de fournitures scolaires",
      amount: 850000,
      type: "expense",
      category: "Fournitures",
      paymentMethod: "Carte bancaire",
      status: "completed",
      reference: "FRN-2023-12",
    },
    {
      id: "trx-013",
      date: "20/12/2023",
      description: "Salaires du personnel - Décembre 2023",
      amount: 7500000,
      type: "expense",
      category: "Salaires",
      paymentMethod: "Virement bancaire",
      status: "completed",
      reference: "SAL-2023-12",
    },
    {
      id: "trx-014",
      date: "05/01/2024",
      description: "Travaux de maintenance",
      amount: 950000,
      type: "expense",
      category: "Maintenance",
      paymentMethod: "Chèque",
      status: "completed",
      reference: "MNT-2024-01",
    },
    {
      id: "trx-015",
      date: "15/01/2024",
      description: "Recettes cantine - Décembre 2023",
      amount: 1400000,
      type: "revenue",
      category: "Cantine",
      paymentMethod: "Espèces",
      status: "completed",
      reference: "CNT-2023-12",
    },
    {
      id: "trx-016",
      date: "20/01/2024",
      description: "Salaires du personnel - Janvier 2024",
      amount: 7500000,
      type: "expense",
      category: "Salaires",
      paymentMethod: "Virement bancaire",
      status: "pending",
      reference: "SAL-2024-01",
    },
    {
      id: "trx-017",
      date: "01/02/2024",
      description: "Paiement services publics",
      amount: 450000,
      type: "expense",
      category: "Services publics",
      paymentMethod: "Prélèvement automatique",
      status: "pending",
      reference: "UTL-2024-02",
    },
    {
      id: "trx-018",
      date: "10/02/2024",
      description: "Paiement abonnement plateforme",
      amount: 1400000,
      type: "revenue",
      category: "Abonnement plateforme",
      paymentMethod: "Virement bancaire",
      status: "pending",
      reference: "ABN-2024-01",
    },
  ],
  budgetItems: [
    {
      id: "bdg-001",
      category: "Salaires",
      allocated: 90000000,
      spent: 22500000,
      remaining: 67500000,
      period: "Année académique 2023-2024",
    },
    {
      id: "bdg-002",
      category: "Équipements",
      allocated: 5000000,
      spent: 3500000,
      remaining: 1500000,
      period: "Année académique 2023-2024",
    },
    {
      id: "bdg-003",
      category: "Maintenance",
      allocated: 3000000,
      spent: 1800000,
      remaining: 1200000,
      period: "Année académique 2023-2024",
    },
    {
      id: "bdg-004",
      category: "Fournitures",
      allocated: 4000000,
      spent: 2100000,
      remaining: 1900000,
      period: "Année académique 2023-2024",
    },
    {
      id: "bdg-005",
      category: "Services publics",
      allocated: 5400000,
      spent: 1350000,
      remaining: 4050000,
      period: "Année académique 2023-2024",
    },
    {
      id: "bdg-006",
      category: "Loyer",
      allocated: 6000000,
      spent: 1500000,
      remaining: 4500000,
      period: "Année académique 2023-2024",
    },
  ],
  monthlyData: [
    {
      month: "Sep 2023",
      revenue: 12500000,
      expense: 7500000,
      balance: 5000000,
    },
    {
      month: "Oct 2023",
      revenue: 2900000,
      expense: 9150000,
      balance: -6250000,
    },
    {
      month: "Nov 2023",
      revenue: 2150000,
      expense: 7500000,
      balance: -5350000,
    },
    {
      month: "Déc 2023",
      revenue: 12500000,
      expense: 9850000,
      balance: 2650000,
    },
    {
      month: "Jan 2024",
      revenue: 1400000,
      expense: 8450000,
      balance: -7050000,
    },
    {
      month: "Fév 2024",
      revenue: 1400000,
      expense: 450000,
      balance: 950000,
    },
    {
      month: "Mar 2024",
      revenue: 12500000,
      expense: 7500000,
      balance: 5000000,
    },
    {
      month: "Avr 2024",
      revenue: 0,
      expense: 0,
      balance: 0,
    },
    {
      month: "Mai 2024",
      revenue: 0,
      expense: 0,
      balance: 0,
    },
    {
      month: "Juin 2024",
      revenue: 0,
      expense: 0,
      balance: 0,
    },
    {
      month: "Juil 2024",
      revenue: 0,
      expense: 0,
      balance: 0,
    },
    {
      month: "Août 2024",
      revenue: 0,
      expense: 0,
      balance: 0,
    },
  ],
  projectedRevenue: 90000000,
  projectedExpenses: 65000000,
  projectedBalance: 25000000,
}
