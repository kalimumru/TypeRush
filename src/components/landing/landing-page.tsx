
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
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full min-h-[60vh] md:min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-primary" style={{clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        {studentImage && (
                            <Card className="relative w-full h-full max-w-lg mx-auto shadow-2xl rounded-lg overflow-hidden border-none">
                                <Image 
                                    src={studentImage.imageUrl} 
                                    alt={studentImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={studentImage.imageHint}
                                    priority
                                />
                            </Card>
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
                    </div>
                </div>
            </div>
        </section>
      </main>

       <footer className="w-full py-8 bg-secondary text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} TypeRush. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
