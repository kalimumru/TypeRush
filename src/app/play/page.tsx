import TyperushContainer from '@/components/typerush/typerush-container';

export default function PlayPage() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float animation-delay-3000 opacity-70"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TyperushContainer />
      </div>
    </div>
  );
}
