
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactUsPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="px-4 sm:px-6 py-6 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-headline text-4xl font-bold">Contact Us</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-left">
            <CardTitle className="font-headline text-2xl">Get in Touch</CardTitle>
            <p className="text-muted-foreground">We'd love to hear from you. Please fill out the form below.</p>
          </CardHeader>
          <CardContent className="text-left">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
