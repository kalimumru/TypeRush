
import TypezunoContainer from '@/components/typezuno/typezuno-container';

export default function PlayPage() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TypezunoContainer />
      </div>
    </div>
  );
}
