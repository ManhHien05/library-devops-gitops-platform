'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { UploadDialog } from '@/components/upload-dialog'
import { ReaderDialog } from '@/components/reader-dialog'
import type { LibraryBook } from '@/lib/books'

const categories = ['Tất cả', 'Văn học', 'Công nghệ', 'Kinh doanh', 'Tâm lý', 'Khoa học', 'Khác']
const coverStyles = ['cover-sage', 'cover-gold', 'cover-blue', 'cover-rose', 'cover-violet', 'cover-clay']

function formatCount(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

function BookCover({ book, index }: { book: LibraryBook; index: number }) {
  return (
    <div className={`book-cover ${coverStyles[index % coverStyles.length]}`} style={{ '--book-color': book.coverColor } as React.CSSProperties}>
      <span className="cover-mark" aria-hidden="true">S.</span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-rule" />
      <span className="cover-author">{book.author}</span>
      <span className="cover-edition">SHELF · READ & SHARE</span>
    </div>
  )
}

export function LibraryApp({ initialBooks }: { initialBooks: LibraryBook[] }) {
  const [books, setBooks] = useState(initialBooks)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [showUpload, setShowUpload] = useState(false)
  const [readerBook, setReaderBook] = useState<LibraryBook | null>(null)
  const [announcement, setAnnouncement] = useState('')

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('vi')
    return books.filter((book) => {
      const matchesCategory = activeCategory === 'Tất cả' || book.category === activeCategory
      const matchesSearch = !query || `${book.title} ${book.author} ${book.description} ${book.category}`.toLocaleLowerCase('vi').includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, books, search])

  const handleUploaded = (book: LibraryBook) => {
    setBooks((currentBooks) => [book, ...currentBooks])
    setShowUpload(false)
    setAnnouncement(`Đã thêm “${book.title}” vào kệ xem trước.`)
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Shelf — trang chủ">
          <span className="brand-mark" aria-hidden="true">S.</span>
          <span className="brand-name">shelf<span className="brand-period">.</span></span>
        </Link>
        <nav className="top-nav" aria-label="Điều hướng chính">
          <Link className="nav-link active" href="/">Trang chủ</Link>
          <Link className="nav-link" href="/books">Kho sách</Link>
          <Link className="nav-link" href="/my-library">Kệ của tôi</Link>
          <a className="nav-link" href="#about">Về Shelf</a>
        </nav>
        <div className="top-actions">
          <Link className="login-link" href="/login">Đăng nhập</Link>
          <Link className="button button-dark button-small" href="/register">Tham gia Shelf <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <section className="hero" id="about" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> MỘT THƯ VIỆN, NHIỀU GÓC NHÌN</div>
          <h1 id="hero-title">Một cuốn sách hay<br />nên được <br className="mobile-hero-break" /><em>đọc nhiều lần.</em></h1>
          <p className="hero-description">Khám phá những cuốn sách cộng đồng yêu thích, đọc ngay trên trình duyệt và chia sẻ cuốn sách đã thay đổi góc nhìn của bạn.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/books">Khám phá thư viện <span aria-hidden="true">↗</span></Link>
            <button className="button button-light" onClick={() => setShowUpload(true)}><span className="plus-icon" aria-hidden="true">+</span> Chia sẻ sách</button>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack" aria-hidden="true"><span>H</span><span>M</span><span>L</span><span>+</span></div>
            <span>Được xây dựng bởi <strong>người yêu sách</strong></span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Bìa sách The DevOps Handbook và The Phoenix Project">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="floating-note note-top">một chương nữa thôi <span>↗</span></div>
          <div className="hero-book hero-book-back"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sAwYqhxgjsKNDn0FpE5UiHGTYEfNBi.png" alt="" /></div>
          <div className="hero-book hero-book-front"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FMJeKGehWHNlrOIy2lf5reOU7yciB8.png" alt="" /></div>
          <div className="floating-note note-bottom"><span className="note-star">•</span> đọc để hiểu hơn</div>
          <span className="art-caption">THƯ VIỆN CỘNG ĐỒNG · EST. 2025</span>
        </div>
      </section>

      <section className="community-strip" aria-label="Thống kê thư viện">
        <div className="strip-intro"><span className="strip-icon" aria-hidden="true">✳</span><span>Góc đọc chung của chúng mình</span></div>
        <div className="strip-stat"><strong>{formatCount(books.length)}</strong><span>đầu sách</span></div>
        <span className="strip-divider" aria-hidden="true" />
        <div className="strip-stat"><strong>{formatCount(books.reduce((total, book) => total + book.views, 0))}</strong><span>lượt đọc</span></div>
        <span className="strip-divider" aria-hidden="true" />
        <div className="strip-stat"><strong>{formatCount(new Set(books.map((book) => book.category)).size)}</strong><span>chủ đề</span></div>
        <div className="strip-cta">Tủ sách của bạn có gì hay? <button onClick={() => setShowUpload(true)}>Cùng chia sẻ <span aria-hidden="true">↗</span></button></div>
      </section>

      <section className="library-section" id="library" aria-labelledby="library-title">
        <div className="section-heading">
          <div><div className="eyebrow section-eyebrow">LẬT MỞ TRANG ĐẦU TIÊN</div><h2 id="library-title">Từ kệ sách cộng đồng<span>.</span></h2><p>Những cuốn sách được chia sẻ từ các thành viên Shelf.</p></div>
          <label className="search-box"><span className="search-icon" aria-hidden="true">⌕</span><span className="sr-only">Tìm sách</span><input aria-label="Tìm theo tên sách, tác giả hoặc chủ đề" placeholder="Tìm tên sách, tác giả..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
        </div>

        <div className="library-controls">
          <div className="category-tabs" role="tablist" aria-label="Lọc theo chủ đề">
            {categories.map((category) => (
              <button key={category} role="tab" aria-selected={activeCategory === category} className={`category-tab ${activeCategory === category ? 'selected' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <span className="book-count">{formatCount(visibleBooks.length)} CUỐN SÁCH</span>
        </div>

        {visibleBooks.length ? (
          <div className="book-grid">
            {visibleBooks.map((book, index) => (
              <button className="book-card" type="button" onClick={() => setReaderBook(book)} key={book.id} aria-label={`Đọc thử ${book.title} của ${book.author}`}>
                <BookCover book={book} index={index} />
                <span className="book-info"><span className="book-category">{book.category}</span><span className="book-title">{book.title}</span><span className="book-author">{book.author}</span><span className="book-views">{formatCount(book.views)} lượt đọc <span aria-hidden="true">→</span></span></span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state"><span className="empty-mark" aria-hidden="true">S.</span><h3>{search || activeCategory !== 'Tất cả' ? 'Chưa tìm thấy cuốn sách này.' : 'Chiếc kệ đầu tiên đang chờ bạn.'}</h3><p>{search || activeCategory !== 'Tất cả' ? 'Thử đổi từ khóa hoặc chủ đề để xem thêm sách.' : 'Chia sẻ một cuốn sách PDF để cùng cộng đồng bắt đầu thư viện.'}</p><button className="button button-dark" onClick={() => setShowUpload(true)}>Chia sẻ cuốn sách đầu tiên <span aria-hidden="true">↗</span></button></div>
        )}
      </section>

      <footer className="footer"><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">S.</span><span className="brand-name">shelf<span className="brand-period">.</span></span></Link><span>Đọc một mình. Chia sẻ cùng nhau.</span><a href="#about">Trở lên đầu trang ↑</a></footer>
      {announcement && <p className="sr-only" role="status">{announcement}</p>}
      {showUpload && <UploadDialog onClose={() => setShowUpload(false)} onUploaded={handleUploaded} />}
      {readerBook && <ReaderDialog book={readerBook} onClose={() => setReaderBook(null)} />}
    </main>
  )
}
