"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

const contactSchema = z.object({
  name: z.string().min(2, "Vul een geldige naam in (minimaal 2 tekens)."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  subject: z.string().min(3, "Vul een onderwerp in (minimaal 3 tekens)."),
  message: z.string().min(10, "Uw bericht moet minimaal 10 tekens bevatten."),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(_: ContactFormValues) {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    toast.success("Uw bericht is succesvol verzonden.")
    form.reset()
  }

  return (
    <main className="relative min-h-screen bg-white px-4 pb-16 pt-28 md:px-10 lg:px-16">

      <section className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="slide-up [animation-delay:0.08s]">
          <p className="mb-5 inline-block border border-black/20 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.28em] text-black/70 backdrop-blur">
            Contactinformatie
          </p>
          <h1
            className="text-5xl font-bold leading-[0.95] tracking-tight text-[#1f1611] md:text-6xl"
            style={{ fontFamily: "Georgia, Times, serif" }}
          >
            Contact
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#2a1f18]/85 md:text-lg">
            Heeft u een vraag, voorstel of interesse in een samenwerking? Neem gerust contact op. Ik reageer zo spoedig mogelijk.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="slide-up rounded-none border-black/10 bg-white [animation-delay:0.14s]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#1f1611]">Email</CardTitle>
                <CardDescription className="text-[#4f3a2c]">lisa@example.com</CardDescription>
              </CardHeader>
            </Card>
            <Card className="slide-up rounded-none border-black/10 bg-white [animation-delay:0.2s]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#1f1611]">Locatie</CardTitle>
                <CardDescription className="text-[#4f3a2c]">Belgie</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Card className="slide-up rounded-none border-0 bg-white/86 shadow-[0_24px_48px_rgba(37,20,9,0.12)] backdrop-blur [animation-delay:0.22s]">
          <CardHeader>
            <CardTitle className="text-2xl text-[#1f1611]">Stuur een bericht</CardTitle>
            <CardDescription className="text-[#4f3a2c]">
              U ontvangt doorgaans binnen 1-2 werkdagen een reactie.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#2b1f17]">Naam</Label>
                <Input
                  {...form.register("name")}
                  className="border-[#d8c7b7] bg-white/90 focus-visible:ring-[#b1784e]"
                  placeholder="Uw volledige naam"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[#2b1f17]">Email</Label>
                <Input
                  type="email"
                  {...form.register("email")}
                  className="border-[#d8c7b7] bg-white/90 focus-visible:ring-[#b1784e]"
                  placeholder="naam@voorbeeld.be"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[#2b1f17]">Onderwerp</Label>
                <Input
                  {...form.register("subject")}
                  className="border-[#d8c7b7] bg-white/90 focus-visible:ring-[#b1784e]"
                  placeholder="Onderwerp van uw bericht"
                />
                {form.formState.errors.subject && (
                  <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[#2b1f17]">Bericht</Label>
                <Textarea
                  rows={6}
                  {...form.register("message")}
                  className="border-[#d8c7b7] bg-white/90 focus-visible:ring-[#b1784e]"
                  placeholder="Beschrijf uw vraag of project zo concreet mogelijk."
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button
                className="w-full bg-[#1f1611] text-white hover:bg-[#3a281d]"
                disabled={loading}
              >
                {loading ? "Bericht wordt verzonden..." : "Bericht verzenden"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <style jsx>{`
        .slide-up {
          opacity: 0;
          animation: contactSlideUp 0.75s cubic-bezier(0.2, 0.75, 0.2, 1) forwards;
        }

        @keyframes contactSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
