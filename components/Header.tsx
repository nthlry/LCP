'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Le concept' },
  { href: '/pourquoi-maintenant', label: 'Pourquoi maintenant' },
  { href: '/espaces', label: 'Les espaces' },
  { href: '/infos-pratiques', label: 'Informations pratiques' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="docked fixed top-0 inset-x-0 z-50 px-3 md:px-6 pt-3 md:pt-4">
      <nav className="nav-shell liquid-glass flex justify-between items-center w-full px-5 md:px-6 py-2.5 max-w-container-max mx-auto rounded-full">
        <div className="flex items-center gap-4 px-1.5 py-1">
          <Image alt="Le Campus Paris Logo" className="h-9 w-auto" src="/assets/logo.png" width={140} height={36} priority />
        </div>
        <div className="hidden md:flex gap-12 nav-link uppercase">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'header-text border-b-2 border-current pb-1' : 'header-text opacity-80 hover:opacity-100'}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <button
            className="magnetic glass-blue hidden md:inline-block text-white px-6 py-2.5 rounded-full nav-cta transition-transform hover:scale-105 active:scale-95"
            type="button"
            data-open-contact-modal=""
          >
            Rencontrons-nous
          </button>
          <button
            id="menu-toggle"
            className="header-text md:hidden flex items-center justify-center w-11 h-11"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>
      {/* Panneau mobile */}
      <div
        id="mobile-menu"
        className={`${menuOpen ? '' : 'hidden'} md:hidden border-t border-stone bg-[#f8f9ff] px-margin-mobile py-stack-md`}
      >
        <div className="flex flex-col gap-4 nav-link uppercase">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={active ? 'text-primary py-2' : 'nav-muted py-2'}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            className="glass-blue text-white px-8 py-3 rounded-full text-center mt-2 nav-cta"
            type="button"
            data-open-contact-modal=""
            onClick={closeMenu}
          >
            Rencontrons-nous
          </button>
        </div>
      </div>
    </header>
  );
}
