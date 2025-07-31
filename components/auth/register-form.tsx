"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "Le nom de l'établissement est requis"
    }

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Le nom de l'administrateur est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simuler une inscription
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Normalement, vous feriez une requête à votre API ici
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // })

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      })

      router.push("/auth/login")
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex justify-center">
        <div className="flex items-center justify-center space-x-2 rounded-full bg-primary p-4 text-white">
          <BookOpen className="h-6 w-6" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="schoolName">Nom de l'établissement</Label>
            <Input
              id="schoolName"
              placeholder="Lycée Moderne de..."
              value={formData.schoolName}
              onChange={(e) => handleChange("schoolName", e.target.value)}
              disabled={isLoading}
            />
            {errors.schoolName && <p className="text-sm text-red-500">{errors.schoolName}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adminName">Nom de l'administrateur</Label>
            <Input
              id="adminName"
              placeholder="Nom complet"
              value={formData.adminName}
              onChange={(e) => handleChange("adminName", e.target.value)}
              disabled={isLoading}
            />
            {errors.adminName && <p className="text-sm text-red-500">{errors.adminName}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@etablissement.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              J'accepte les{" "}
              <a href="#" className="text-primary hover:underline">
                conditions d'utilisation
              </a>{" "}
              et la{" "}
              <a href="#" className="text-primary hover:underline">
                politique de confidentialité
              </a>
            </Label>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
