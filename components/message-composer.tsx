"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function MessageComposer() {
  const [messageType, setMessageType] = useState("email")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Composer un message</CardTitle>
        <CardDescription>Créez et envoyez un message aux parents ou aux élèves.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Sujet</Label>
          <Input id="subject" placeholder="Entrez le sujet du message" />
        </div>

        <div className="space-y-2">
          <Label>Type de message</Label>
          <RadioGroup defaultValue="email" className="flex space-x-4" onValueChange={setMessageType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms">SMS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Email + SMS</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipients">Destinataires</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez les destinataires" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parents</SelectLabel>
                <SelectItem value="all-parents">Tous les parents</SelectItem>
                <SelectItem value="unpaid-parents">Parents avec paiements en attente</SelectItem>
                <SelectItem value="terminal-parents">Parents d'élèves en Terminale</SelectItem>
                <SelectItem value="premiere-parents">Parents d'élèves en Première</SelectItem>
                <SelectItem value="seconde-parents">Parents d'élèves en Seconde</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Élèves</SelectLabel>
                <SelectItem value="all-students">Tous les élèves</SelectItem>
                <SelectItem value="terminal-students">Élèves en Terminale</SelectItem>
                <SelectItem value="premiere-students">Élèves en Première</SelectItem>
                <SelectItem value="seconde-students">Élèves en Seconde</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Personnel</SelectLabel>
                <SelectItem value="all-staff">Tout le personnel</SelectItem>
                <SelectItem value="teachers">Enseignants</SelectItem>
                <SelectItem value="admin-staff">Personnel administratif</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {messageType !== "sms" && (
          <div className="space-y-2">
            <Label htmlFor="message">Message (Email)</Label>
            <Textarea id="message" placeholder="Rédigez votre message..." className="min-h-[200px]" />
          </div>
        )}

        {(messageType === "sms" || messageType === "both") && (
          <div className="space-y-2">
            <Label htmlFor="sms-message">Message SMS</Label>
            <Textarea
              id="sms-message"
              placeholder="Rédigez votre SMS (160 caractères max)"
              className="min-h-[100px]"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">Les SMS sont limités à 160 caractères.</p>
          </div>
        )}

        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="urgent" />
              <Label htmlFor="urgent">Marquer comme urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="receipt" />
              <Label htmlFor="receipt">Demander un accusé de réception</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="schedule" />
              <Label htmlFor="schedule">Programmer l'envoi</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Enregistrer comme brouillon</Button>
        <Button>Envoyer</Button>
      </CardFooter>
    </Card>
  )
}
