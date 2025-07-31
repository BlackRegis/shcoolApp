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
import type { StaffMember } from "@/lib/data/staff"
import { generateId, formatDate, isValidEmail, isValidPhone } from "@/lib/utils/crud-helpers"

interface StaffFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (staff: StaffMember) => void
  staff: StaffMember | null
  isEditing: boolean
}

export function StaffForm({ isOpen, onClose, onSubmit, staff, isEditing }: StaffFormProps) {
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    status: "Actif",
    type: "teachers",
    address: "",
    qualification: "",
    specialization: "",
    emergencyContact: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (staff && isEditing) {
      setFormData(staff)
    } else {
      setFormData({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        status: "Actif",
        type: "teachers",
        address: "",
        qualification: "",
        specialization: "",
        emergencyContact: "",
      })
    }
  }, [staff, isEditing])

  const handleChange = (field: keyof StaffMember, value: string) => {
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

    if (!formData.position?.trim()) {
      newErrors.position = "Le poste est requis"
    }

    if (!formData.department?.trim()) {
      newErrors.department = "Le département est requis"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Le format de l'email est invalide"
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Le téléphone est requis"
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Le format du numéro de téléphone est invalide"
    }

    if (formData.emergencyContact?.trim() && !isValidPhone(formData.emergencyContact)) {
      newErrors.emergencyContact = "Le format du numéro de téléphone est invalide"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const currentDate = new Date()

    const completeStaff: StaffMember = {
      id: isEditing && staff ? staff.id : generateId("EMP"),
      name: formData.name!,
      position: formData.position!,
      department: formData.department!,
      email: formData.email!,
      phone: formData.phone!,
      joinDate: isEditing && staff ? staff.joinDate : formatDate(currentDate),
      status: formData.status as "Actif" | "En congé" | "Inactif",
      type: formData.type as "teachers" | "admin" | "support",
      address: formData.address,
      qualification: formData.qualification,
      specialization: formData.specialization,
      emergencyContact: formData.emergencyContact,
    }

    onSubmit(completeStaff)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier un membre du personnel" : "Ajouter un nouveau membre"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du membre du personnel ci-dessous."
              : "Remplissez le formulaire ci-dessous pour ajouter un nouveau membre du personnel."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nom et prénom"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              value={formData.position || ""}
              onChange={(e) => handleChange("position", e.target.value)}
              placeholder="Ex: Professeur de Mathématiques"
            />
            {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Département</Label>
            <Input
              id="department"
              value={formData.department || ""}
              onChange={(e) => handleChange("department", e.target.value)}
              placeholder="Ex: Sciences"
            />
            {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type || "teachers"} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teachers">Enseignant</SelectItem>
                <SelectItem value="admin">Administratif</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status || "Actif"} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="En congé">En congé</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email professionnel"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Ex: +225 07 12 34 56 78"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Adresse complète"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              value={formData.qualification || ""}
              onChange={(e) => handleChange("qualification", e.target.value)}
              placeholder="Ex: Doctorat en Mathématiques"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialization">Spécialisation</Label>
            <Input
              id="specialization"
              value={formData.specialization || ""}
              onChange={(e) => handleChange("specialization", e.target.value)}
              placeholder="Ex: Algèbre et Géométrie"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Contact d'urgence</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact || ""}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              placeholder="Ex: +225 07 98 76 54 32"
            />
            {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
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
