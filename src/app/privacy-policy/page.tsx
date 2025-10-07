
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="px-4 sm:px-6 py-6 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Privacy Policy</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="text-left text-muted-foreground space-y-6 p-0">
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">1. Information We Collect</h2>
                <p>We collect information to provide better services to all our users. We only collect user statistics like WPM, accuracy, and level progress. This data is stored locally in your browser and is not transmitted to our servers.</p>
            </section>
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">2. How We Use Information</h2>
                <p>The information we collect is used solely for the purpose of providing and improving the Typezuno experience. Your typing statistics are used to calculate your progress, award badges, and personalize your practice sessions. We do not share this information with any third parties.</p>
            </section>
            <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">3. Data Storage</h2>
                <p>All your game-related data is stored on your own device using browser localStorage. This means you have full control over your data. Clearing your browser's cache or data will permanently delete your Typezuno progress.</p>
            </section>
             <section className="space-y-2">
                <h2 className="font-headline text-xl font-semibold text-foreground">4. Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
