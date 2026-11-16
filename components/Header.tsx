"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const left = [
  { href: "/deli-to-go", label: "Deli To-Go" },
  { href: "/event", label: "Event & provningar" },
  { href: "/catering", label: "Catering" },
  { href: "/after-work", label: "After work" },
];
const right = [
  { href: "/foretag", label: "Företag" },
  { href: "/presenter", label: "Presenter" },
  { href: "/butiken", label: "Butiken" },
  { href: "/lar-dig-mer", label: "Lär dig mer" },
];

export default function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  const link = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
      {l.label}
    </Link>
  );

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <nav className="nav" aria-label="Huvudmeny">{left.map(link)}</nav>
        <Link href="/" className="logo" aria-label="Les Petit Bulles, till startsidan">
          <Image src="/img/logo.png" alt="Les Petit Bulles" width={184} height={184} priority />
        </Link>
        <div className="nav nav-right">
          <nav className="nav" aria-label="Huvudmeny, fortsättning">{right.map(link)}</nav>
          <Link href="/deli-to-go" className="btn btn-wine btn-small">Beställ</Link>
        </div>
        <details className="menu-toggle" ref={menu}>
          <summary>Meny</summary>
          <nav className="mobile-menu" aria-label="Mobilmeny">
            {[...left, ...right, { href: "/kontakt", label: "Kontakt" }].map(link)}
          </nav>
        </details>
      </div>
    </header>
  );
}
