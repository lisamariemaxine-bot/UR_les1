"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

/**
 * FULL AUTH FLOW (UI ONLY)
 * - Login
 * - Register
 * - Forgot Password
 * - Reset Password
 *
 * Backend / API calls intentionally mocked.
 */

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)

  async function mockSubmit(e: React.FormEvent, actionName: string) {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      toast.success(`${actionName} succesvol verzonden!`)
    } catch {
      toast.error(`Verzenden mislukt: ${actionName}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welkom</CardTitle>
          <CardDescription>
            Log in, maak een account aan of reset je wachtwoord
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Inloggen</TabsTrigger>
              <TabsTrigger value="register">Registreren</TabsTrigger>
              <TabsTrigger value="forgot">Resetten</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={(e) => mockSubmit(e, 'Inloggen')} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required />
                </div>

                <div className="space-y-2">
                  <Label>Wachtwoord</Label>
                  <Input type="password" required />
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? "Bezig met inloggen..." : "Inloggen"}
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register">
              <form onSubmit={(e) => mockSubmit(e, 'Registreren')} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required />
                </div>

                <div className="space-y-2">
                  <Label>Wachtwoord</Label>
                  <Input type="password" required />
                </div>

                <div className="space-y-2">
                  <Label>Bevestig wachtwoord</Label>
                  <Input type="password" required />
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? "Account aanmaken..." : "Account aanmaken"}
                </Button>
              </form>
            </TabsContent>

            {/* FORGOT PASSWORD */}
            <TabsContent value="forgot">
              <form onSubmit={(e) => mockSubmit(e, 'Wachtwoord reset')} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required />
                </div>

                <Button variant="secondary" className="w-full" disabled={loading}>
                  {loading ? "Link verzenden..." : "Resetlink verzenden"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
