"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student } from "@/lib/data/students"
import { generateId, formatDate, isValidEmail, isValidPhone } from "@/lib/utils/crud-helpers"

interface StudentFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (student: Student) => void
  student: Student | null
  isEditing: boolean
}

export function StudentForm({ isOpen, onClose, onSubmit, student, isEditing }: StudentFormProps) {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    class: "",
    status: "Actif",
    paymentStatus: "Non payé",
    gender: "Masculin",
    birthDate: "",
    address: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (student && isEditing) {
      setFormData(student)
    } else {
      setFormData({
        name: "",
        class: "",
        status: "Actif",
        paymentStatus: "Non payé",
        gender: "Masculin",
        birthDate: "",
        address: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
      })
    }
  }, [student, isEditing])

  const handleChange = (field: keyof Student, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.class?.trim()) {
      newErrors.class = "La classe est requise"
    }

    if (!formData.birthDate?.trim()) {
      newErrors.birthDate = "La date de naissance est requise"
    }

    if (!formData.address?.trim()) {
      newErrors.address = "L'adresse est requise"
    }

    if (!formData.parentName?.trim()) {
      newErrors.parentName = "Le nom du parent est requis"
    }

    if (!formData.parentPhone?.trim()) {
      newErrors.parentPhone = "Le téléphone du parent est requis"
    } else if (!isValidPhone(formData.parentPhone)) {
      newErrors.parentPhone = "Le format du numéro de téléphone est invalide"
    }

    if (formData.parentEmail?.trim() && !isValidEmail(formData.parentEmail)) {
      newErrors.parentEmail = "Le format de l'email est invalide"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const currentDate = new Date()

    const completeStudent: Student = {
      id: isEditing && student ? student.id : generateId("STD"),
      name: formData.name!,
      class: formData.class!,
      registrationDate: isEditing && student ? student.registrationDate : formatDate(currentDate),
      status: formData.status as "Actif" | "En attente" | "Inactif",
      paymentStatus: formData.paymentStatus as "Payé" | "Partiel" | "Non payé",
      gender: formData.gender as "Masculin" | "Féminin",
      birthDate: formData.birthDate!,
      address: formData.address!,
      parentName: formData.parentName!,
      parentPhone: formData.parentPhone!,
      parentEmail: formData.parentEmail || "",
    }

    onSubmit(completeStudent)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier un élève" : "Ajouter un nouvel élève"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'élève ci-dessous."
              : "Remplissez le formulaire ci-dessous pour ajouter un nouvel élève."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nom et prénom de l'élève"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">Classe</Label>
            <Input
              id="class"
              value={formData.class || ""}
              onChange={(e) => handleChange("class", e.target.value)}
              placeholder="Ex: Terminale A"
            />
            {errors.class && <p className="text-sm text-red-500">{errors.class}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Genre</Label>
            <Select value={formData.gender || "Masculin"} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Sélectionner le genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculin">Masculin</SelectItem>
                <SelectItem value="Féminin">Féminin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Date de naissance</Label>
            <Input
              id="birthDate"
              value={formData.birthDate || ""}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="JJ/MM/AAAA"
            />
            {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status || "Actif"} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Statut de paiement</Label>
            <Select
              value={formData.paymentStatus || "Non payé"}
              onValueChange={(value) => handleChange("paymentStatus", value)}
            >
              <SelectTrigger id="paymentStatus">
                <SelectValue placeholder="Sélectionner le statut de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="Partiel">Partiel</SelectItem>
                <SelectItem value="Non payé">Non payé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Adresse complète"
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="parentName">Nom du parent/tuteur</Label>
            <Input
              id="parentName"
              value={formData.parentName || ""}
              onChange={(e) => handleChange("parentName", e.target.value)}
              placeholder="Nom complet du parent ou tuteur"
            />
            {errors.parentName && <p className="text-sm text-red-500">{errors.parentName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentPhone">Téléphone du parent</Label>
            <Input
              id="parentPhone"
              value={formData.parentPhone || ""}
              onChange={(e) => handleChange("parentPhone", e.target.value)}
              placeholder="Ex: +225 07 12 34 56 78"
            />
            {errors.parentPhone && <p className="text-sm text-red-500">{errors.parentPhone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentEmail">Email du parent</Label>
            <Input
              id="parentEmail"
              value={formData.parentEmail || ""}
              onChange={(e) => handleChange("parentEmail", e.target.value)}
              placeholder="Email du parent (optionnel)"
            />
            {errors.parentEmail && <p className="text-sm text-red-500">{errors.parentEmail}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>{isEditing ? "Mettre à jour" : "Ajouter"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
