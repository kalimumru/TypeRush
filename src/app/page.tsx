import LandingPage from '@/components/landing/landing-page';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-dvh">
          <LandingPage />
      </div>
    </div>
  );
}
