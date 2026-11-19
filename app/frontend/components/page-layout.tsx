import Link from 'next/link'
import type { ReactNode } from 'react'

type PageKey = 'home' | 'catalog' | 'library' | 'profile' | 'admin'

const navigation: { key: PageKey; label: string; href: string }[] = [
  { key: 'home', label: 'Trang chủ', href: '/' },
  { key: 'catalog', label: 'Kho sách', href: '/books' },
  { key: 'library', label: 'Kệ của tôi', href: '/my-library' },
  { key: 'profile', label: 'Hồ sơ', href: '/profile' },
  { key: 'admin', label: 'Quản trị', href: '/admin' },
]

export function PageLayout({ active, children }: { active: PageKey; children: ReactNode }) {
  return (
    <div className="page-shell">
      <header className="page-header">
        <Link className="brand" href="/" aria-label="Shelf — trang chủ">
          <span className="brand-mark" aria-hidden="true">S.</span>
          <span className="brand-name">shelf<span className="brand-period">.</span></span>
        </Link>
        <nav className="page-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <Link key={item.key} className={`page-nav-link ${active === item.key ? 'is-active' : ''}`} href={item.href} aria-current={active === item.key ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="page-header-actions">
          <Link className="page-sign-in" href="/login">Đăng nhập</Link>
          <Link className="button button-dark button-small" href="/register">Tham gia Shelf <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <main id="main-content" className="page-main">{children}</main>
      <footer className="page-footer">
        <Link className="brand footer-brand" href="/" aria-label="Shelf — trang chủ"><span className="brand-mark" aria-hidden="true">S.</span><span className="brand-name">shelf<span className="brand-period">.</span></span></Link>
        <span>Đọc một mình. Chia sẻ cùng nhau.</span>
        <Link href="/books">Khám phá kho sách <span aria-hidden="true">↗</span></Link>
      </footer>
    </div>
  )
}
