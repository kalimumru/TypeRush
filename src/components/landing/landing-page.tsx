
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Gamepad2, Keyboard, Zap } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
    const features = [
      {
        icon: <Zap className="w-8 h-8 text-accent" />,
        title: "Test Your Speed",
        description: "See how many words per minute you can type. Challenge yourself to beat your high score.",
      },
      {
        icon: <BarChart2 className="w-8 h-8 text-accent" />,
        title: "Track Your Progress",
        description: "Monitor your WPM, accuracy, and see detailed stats for each key to identify your weaknesses.",
      },
      {
        icon: <Gamepad2 className="w-8 h-8 text-accent" />,
        title: "Gamified Experience",
        description: "Level up, earn XP, and unlock badges as you improve your typing skills. The journey is the reward.",
      },
    ];

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center p-4">
      <header className="flex items-center justify-center py-4 md:py-6 w-full">
        <div className="flex items-center gap-3">
            <Keyboard className="w-10 h-10 text-accent" />
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-glow-accent select-none">
            TypeRush
            </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="max-w-4xl mx-auto py-16 md:py-24 animate-in fade-in-50 duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-glow-primary">
                The Ultimate Typing Challenge
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Boost your typing speed and accuracy through a fun, gamified experience. Level up, track your progress, and become a keyboard master.
            </p>
            <Link href="/play">
              <Button size="lg" className="box-glow-primary text-lg px-8 py-6">
                  Start Typing Now
              </Button>
            </Link>
        </section>

        <section className="w-full max-w-5xl mx-auto py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Card key={feature.title} className="bg-black/20 border-white/10 backdrop-blur-sm text-center p-6 transform transition-transform hover:-translate-y-2">
                        <CardContent className="flex flex-col items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/10 box-glow-primary">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-headline font-bold text-accent">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </main>

       <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} TypeRush. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
