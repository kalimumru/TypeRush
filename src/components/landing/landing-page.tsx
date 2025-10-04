
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BarChart2, Gamepad2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

const LandingPage = () => {
    const studentImage = PlaceHolderImages.find(p => p.id === 'student-typing');

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <span className="font-headline text-xl font-bold">TypeRush</span>
            </Link>
            <nav className="hidden md:flex gap-6 items-center">
                <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                <Link href="/play" className="text-sm font-medium hover:text-primary transition-colors">Play</Link>
                <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full min-h-[60vh] md:min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-primary" style={{clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        {studentImage && (
                            <div className="relative w-full h-full max-w-lg mx-auto shadow-2xl rounded-lg overflow-hidden">
                                <Image 
                                    src={studentImage.imageUrl} 
                                    alt={studentImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={studentImage.imageHint}
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
                <div className="max-w-md">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">BECOME A KEYBOARD MASTER</p>
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-4">
                        The Ultimate Typing Challenge
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8">
                        Boost your typing speed and accuracy through a fun, gamified experience. Level up, track your progress, and become a keyboard master.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/play">
                          <Button size="lg" className="text-base">
                              Start Typing
                          </Button>
                        </Link>
                         <Link href="/play">
                          <Button size="lg" variant="outline" className="text-base">
                              Learn More
                          </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="features" className="py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-primary" />}
                        title="Test Your Speed"
                        description="See how many words per minute you can type. Challenge yourself to beat your high score."
                    />
                    <FeatureCard
                        icon={<BarChart2 className="w-8 h-8 text-primary" />}
                        title="Track Your Progress"
                        description="Monitor your WPM, accuracy, and see detailed stats to identify your weaknesses."
                    />
                    <FeatureCard
                        icon={<Gamepad2 className="w-8 h-8 text-primary" />}
                        title="Gamified Experience"
                        description="Level up, earn XP, and unlock badges as you improve your typing skills."
                    />
                </div>
            </div>
        </section>
      </main>

       <footer id="contact" className="w-full py-8 bg-secondary text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} TypeRush. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <Card className="bg-card p-8 rounded-lg border-none shadow-sm text-center">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-headline font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </Card>
);

export default LandingPage;
