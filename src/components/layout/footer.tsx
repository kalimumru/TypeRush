import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-secondary text-muted-foreground text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} TypeRush. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link>
          <Link href="/contact-us" className="hover:text-foreground transition-colors">Contact Us</Link>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
