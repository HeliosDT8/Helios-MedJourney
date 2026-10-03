import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Helios Digital Technology</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/services">Services</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <div className="footer-contact">
          <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a>
          <span>Ahmedabad, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
}
