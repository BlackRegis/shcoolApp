"use client"

import { Users, DollarSign, XCircle, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Student } from "@/lib/data/students"

interface DashboardStatsProps {
  students: Student[]
}

export function DashboardStats({ students }: DashboardStatsProps) {
  const totalStudents = students.length
  const paidStudents = students.filter((s) => s.paymentStatus === "Payé").length
  const unpaidStudents = students.filter((s) => s.paymentStatus === "Non payé").length
  const partiallyPaidStudents = students.filter((s) => s.paymentStatus === "Partiel").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Élèves</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">Élèves inscrits</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Frais Payés</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paidStudents}</div>
          <p className="text-xs text-muted-foreground">Élèves avec frais payés</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Frais Partiels</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{partiallyPaidStudents}</div>
          <p className="text-xs text-muted-foreground">Élèves avec frais partiels</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Frais Non Payés</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unpaidStudents}</div>
          <p className="text-xs text-muted-foreground">Élèves avec frais non payés</p>
        </CardContent>
      </Card>
    </div>
  )
}
