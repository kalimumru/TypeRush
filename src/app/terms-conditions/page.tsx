
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsConditionsPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="px-4 sm:px-6 py-6 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="text-left text-muted-foreground space-y-6 p-0">
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p>By accessing and using TypeRush, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">2. Description of Service</h2>
                <p>TypeRush provides users with a gamified typing practice platform. The service is provided "as is" and the creators of TypeRush assume no responsibility for the timeliness, deletion, or failure to store any user data.</p>wget
            </section>
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">3. User Conduct</h2>
                <p>You agree not to use the service to engage in any activity that would constitute a criminal offense or give rise to a civil liability. You agree not to attempt to reverse engineer or jeopardize the correct functioning of the TypeRush website.</p>
            </section>
             <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">4. Modification of Terms</h2>
                <p>We reserve the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
