import TyperushContainer from '@/components/typerush/typerush-container';

export default function PlayPage() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-float opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-float animation-delay-3000 opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TyperushContainer />
      </div>
    </div>
  );
}
