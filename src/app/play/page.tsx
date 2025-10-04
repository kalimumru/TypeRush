import TyperushContainer from '@/components/typerush/typerush-container';

export default function PlayPage() {
  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right top, #0c0a1d, #1d153c, #311d5d, #492281, #6625a7)'
      }}
    >
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TyperushContainer />
      </div>
    </div>
  );
}
