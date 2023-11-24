'use client';
import Link from 'next/link';
import './navbar.css';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section className="navbar">
      <Link
        className={`navbar-link ${pathname === '/' ? 'active' : 'default'}`}
        href="/">
        <div className="home">Home</div>
      </Link>
      <Link
        className={`navbar-link ${
          pathname === '/diary' ? 'active' : 'default'
        }`}
        href="/diary">
        <div className="about">Diary</div>
      </Link>
    </section>
  );
};

export default Navbar;
