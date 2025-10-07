
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="px-4 sm:px-6 py-6 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">About Us</h1>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="text-left p-0">
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-left text-muted-foreground space-y-4 p-0 mt-4">
            <p>
              Welcome to Typezuno, the ultimate destination for improving your typing skills in a fun and engaging way. Our mission is to help people of all ages and skill levels type faster and more accurately. We believe that typing is a fundamental skill in today's digital world, and we're passionate about making the learning process as enjoyable as possible.
            </p>
            <p>
              Typezuno was born from a simple idea: what if practicing typing felt less like a chore and more like a game? We've designed a gamified experience where you can level up, earn badges, and track your progress as you become a keyboard master. Whether you're a student, a professional, or just someone looking to improve your typing speed, Typezuno offers a dynamic and personalized challenge to help you reach your goals.
            </p>
            <p>
              Thank you for joining our community. Let's start the typing challenge!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
