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
import type { SchoolLevel, SchoolClass } from "@/lib/data/levels"
import { generateId } from "@/lib/utils/crud-helpers"

interface ClassFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (classData: SchoolClass) => void
  levels: SchoolLevel[]
  selectedLevel: SchoolLevel | null
  isEditing: boolean
}

export function ClassForm({ isOpen, onClose, onSubmit, levels, selectedLevel, isEditing }: ClassFormProps) {
  const [formData, setFormData] = useState<Partial<SchoolClass>>({
    name: "",
    capacity: 30,
    teacher: "",
    students: 0,
  })
  const [levelId, setLevelId] = useState<string>(selectedLevel?.id || (levels.length > 0 ? levels[0].id : ""))
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (selectedLevel) {
      setLevelId(selectedLevel.id)

      // Si nous sommes en mode édition, chercher la classe dans le niveau sélectionné
      if (isEditing && selectedLevel.classes.length > 0) {
        // Nous supposons que la première classe du niveau est celle que nous voulons éditer
        // Dans une implémentation réelle, vous devriez passer l'ID de la classe à éditer
        const classToEdit = selectedLevel.classes[0]
        setFormData(classToEdit)
      }
    } else if (levels.length > 0) {
      setLevelId(levels[0].id)
    }
  }, [selectedLevel, isEditing, levels])

  const handleChange = (field: keyof SchoolClass, value: any) => {
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

    if (!formData.teacher?.trim()) {
      newErrors.teacher = "Le nom de l'enseignant est requis"
    }

    if (formData.capacity === undefined || formData.capacity < 1) {
      newErrors.capacity = "La capacité doit être un nombre positif"
    }

    if (formData.students === undefined || formData.students < 0) {
      newErrors.students = "Le nombre d'élèves doit être un nombre positif ou zéro"
    }

    if (formData.capacity !== undefined && formData.students !== undefined && formData.students > formData.capacity) {
      newErrors.students = "Le nombre d'élèves ne peut pas dépasser la capacité"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const completeClass: SchoolClass = {
      id: isEditing && formData.id ? formData.id : generateId("CLS"),
      name: formData.name!,
      capacity: formData.capacity!,
      teacher: formData.teacher!,
      students: formData.students!,
    }

    onSubmit(completeClass)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier une classe" : "Ajouter une nouvelle classe"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de la classe ci-dessous."
              : "Remplissez le formulaire ci-dessous pour ajouter une nouvelle classe."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="levelId">Niveau</Label>
              <Select value={levelId} onValueChange={setLevelId}>
                <SelectTrigger id="levelId">
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la classe</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ex: 6ème A, CP, Terminale D"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Enseignant principal</Label>
            <Input
              id="teacher"
              value={formData.teacher || ""}
              onChange={(e) => handleChange("teacher", e.target.value)}
              placeholder="Nom de l'enseignant"
            />
            {errors.teacher && <p className="text-sm text-red-500">{errors.teacher}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacité</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity || 30}
              onChange={(e) => handleChange("capacity", Number.parseInt(e.target.value))}
              placeholder="Nombre maximum d'élèves"
            />
            {errors.capacity && <p className="text-sm text-red-500">{errors.capacity}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="students">Nombre d'élèves</Label>
            <Input
              id="students"
              type="number"
              min="0"
              value={formData.students || 0}
              onChange={(e) => handleChange("students", Number.parseInt(e.target.value))}
              placeholder="Nombre actuel d'élèves"
            />
            {errors.students && <p className="text-sm text-red-500">{errors.students}</p>}
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
