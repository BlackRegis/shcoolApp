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
import type { SchoolLevel } from "@/lib/data/levels"
import { generateId } from "@/lib/utils/crud-helpers"

interface LevelFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (level: SchoolLevel) => void
  level: SchoolLevel | null
  isEditing: boolean
}

export function LevelForm({ isOpen, onClose, onSubmit, level, isEditing }: LevelFormProps) {
  const [formData, setFormData] = useState<Partial<SchoolLevel>>({
    name: "",
    description: "",
    order: 1,
    classes: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (level && isEditing) {
      setFormData(level)
    } else {
      setFormData({
        name: "",
        description: "",
        order: 1,
        classes: [],
      })
    }
  }, [level, isEditing])

  const handleChange = (field: keyof SchoolLevel, value: any) => {
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

    if (!formData.description?.trim()) {
      newErrors.description = "La description est requise"
    }

    if (formData.order === undefined || formData.order < 1) {
      newErrors.order = "L'ordre doit être un nombre positif"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const completeLevel: SchoolLevel = {
      id: isEditing && level ? level.id : generateId("LVL"),
      name: formData.name!,
      description: formData.description!,
      order: formData.order!,
      classes: formData.classes || [],
    }

    onSubmit(completeLevel)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier un niveau" : "Ajouter un nouveau niveau"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du niveau scolaire ci-dessous."
              : "Remplissez le formulaire ci-dessous pour ajouter un nouveau niveau scolaire."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du niveau</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ex: Primaire, Collège, Lycée"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Ex: Classes du CP au CM2"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Ordre d'affichage</Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order || 1}
              onChange={(e) => handleChange("order", Number.parseInt(e.target.value))}
              placeholder="Ex: 1, 2, 3..."
            />
            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
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
