
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BarChart2, Gamepad2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
        <section className="relative w-full pt-24 pb-12 md:py-0 md:min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-primary md:clip-path-polygon" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}></div>
                    <div className="hidden md:flex absolute inset-0 items-center justify-center p-8">
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
                <div className="max-w-xl text-center md:text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">BECOME A KEYBOARD MASTER</p>
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-4">
                        Check your Typing Speed Instantly
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-8">
                        Take our free online typing speed test to see how fast you type. Join TypeRush for a fun, gamified experience to improve your WPM and accuracy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="/play">
                          <Button size="lg" className="text-base w-full sm:w-auto shadow-lg">
                              Start Typing
                          </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-12 md:py-24 bg-primary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground">Why You'll Love TypeRush</h2>
                    <p className="text-primary-foreground/80 mt-2">Everything you need to become a typing pro.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center border-none shadow-md bg-card">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <Gamepad2 className="w-8 h-8" />
                            </div>
                            <CardTitle className="font-headline">Gamified Practice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Level up and earn badges as you improve. Our game-like environment makes practicing fun and addictive.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center border-none shadow-md bg-card">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <BarChart2 className="w-8 h-8" />
                            </div>
                            <CardTitle className="font-headline">Track Your Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Detailed stats show your WPM, accuracy, and most problematic keys, helping you focus your practice.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center border-none shadow-md bg-card">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <Zap className="w-8 h-8" />
                            </div>
                            <CardTitle className="font-headline">Dynamic Challenges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Paragraphs adjust to your chosen test duration, ensuring you always have a fair and engaging challenge.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};

export default LandingPage;
