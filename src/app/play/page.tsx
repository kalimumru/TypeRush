import TyperushContainer from '@/components/typerush/typerush-container';

export default function PlayPage() {
  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, #ffbf00, #f2cf7e, #ffe642, #ff7900)'
      }}
    >
      <div className="relative z-10 flex flex-col min-h-dvh">
          <TyperushContainer />
      </div>
    </div>
  );
}
