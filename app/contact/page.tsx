"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

const contactSchema = z.object({
  name: z.string().min(2, "Vul een geldige naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  message: z.string().min(10, "Uw bericht is te kort."),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(_: ContactFormValues) {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    toast.success("Bericht verzonden.")
    form.reset()
  }

  return (
    // Achtergrond ingesteld op #FAE170 (Sinopia Background)
    <main className="min-h-screen w-full font-sans uppercase select-none p-8 md:p-16" style={{ backgroundColor: '#FAE170', color: '#1A1A1A' }}>
      
      {/* Header Sectie */}
      <header className="flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-6 mb-16">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
            GET IN<br />TOUCH
          </h1>
        </div>
        <div className="mt-8 md:mt-0"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Linker Kolom: Info */}
        <div className="md:col-span-6 space-y-10">
          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] text-black/40 mb-8">Information</h2>
            <div className="space-y-8">
              <div>
                <p className="text-[9px] font-mono tracking-widest opacity-40 mb-1">Electronic Mail</p>
                <p className="text-lg font-bold tracking-tight">HELLO@EMAIL.COM</p>
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest opacity-40 mb-1">Geographic Base</p>
                <p className="text-lg font-bold tracking-tight">ANTWERP, BE</p>
              </div>
            </div>
          </section>

          <p className="normal-case italic text-gray-500 text-sm leading-relaxed max-w-sm">
            Ik sta open voor nieuwe uitdagingen en interessante samenwerkingen. 
            Stuur een bericht en ik neem zo spoedig mogelijk contact op.
          </p>
        </div>

        {/* Rechter Kolom: Formulier */}
        <div className="md:col-span-6 border border-black/10 p-8 md:p-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <Label className="text-[9px] font-mono tracking-widest opacity-40">NAME</Label>
              <Input
                {...form.register("name")}
                className="rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-sm font-bold uppercase focus-visible:ring-0 focus-visible:border-black transition-colors placeholder:text-black/20"
                placeholder="YOUR NAME"
              />
              {form.formState.errors.name && (
                <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-tighter">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-[9px] font-mono tracking-widest opacity-40">EMAIL</Label>
              <Input
                type="email"
                {...form.register("email")}
                className="rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-sm font-bold uppercase focus-visible:ring-0 focus-visible:border-black transition-colors placeholder:text-black/20"
                placeholder="EMAIL@PROVIDER.COM"
              />
              {form.formState.errors.email && (
                <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-tighter">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-[9px] font-mono tracking-widest opacity-40">MESSAGE</Label>
              <Textarea
                rows={4}
                {...form.register("message")}
                className="rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-sm font-bold uppercase focus-visible:ring-0 focus-visible:border-black transition-colors resize-none placeholder:text-black/20"
                placeholder="YOUR INQUIRY..."
              />
              {form.formState.errors.message && (
                <p className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-tighter">{form.formState.errors.message.message}</p>
              )}
            </div>

            <Button
              className="w-full h-12 rounded-none bg-black text-white font-bold uppercase tracking-[0.3em] transition-all text-[10px] 
                         hover:bg-[#125503] active:bg-[#C3F380] active:text-[#125503]"
              disabled={loading}
            >
              {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
            </Button>
          </form>
        </div>
      </div>

      <footer className="mt-32 pt-6 border-t border-black/5 opacity-30">
      </footer>
    </main>
  )
}