import TyperushContainer from '@/components/typerush/typerush-container';

export default function PlayPage() {
  return (
    <div className="relative min-h-screen w-full bg-secondary overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TyperushContainer />
      </div>
    </div>
  );
}
