'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { LibraryBook } from '@/lib/books'
import { demoBooks } from '@/lib/books'
import { PageBookCard } from '@/components/page-book-card'
import { PageBookCover } from '@/components/page-book-cover'
import { PageLayout } from '@/components/page-layout'
import { ReaderDialog } from '@/components/reader-dialog'

export function BookDetailPage({ book }: { book: LibraryBook }) {
  const [readerOpen, setReaderOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const index = demoBooks.findIndex((item) => item.id === book.id)
  const recommendations = demoBooks.filter((item) => item.id !== book.id && item.category === book.category).slice(0, 3)
  const suggestedBooks = recommendations.length ? recommendations : demoBooks.filter((item) => item.id !== book.id).slice(0, 3)

  return (
    <PageLayout active="catalog">
      <nav className="page-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Trang chủ</Link><span aria-hidden="true">/</span><Link href="/books">Kho sách</Link><span aria-hidden="true">/</span><span aria-current="page">{book.title}</span></nav>
      <section className="book-detail-layout" aria-labelledby="book-detail-title">
        <div className="book-detail-art"><PageBookCover book={book} index={index} /><span className="detail-art-caption">SHELF · READ & SHARE</span></div>
        <div className="book-detail-copy">
          <p className="page-eyebrow"><span className="eyebrow-dot" /> {book.category.toLocaleUpperCase('vi')}</p>
          <h1 id="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">Tác giả <strong>{book.author}</strong></p>
          <div className="detail-rating"><span className="detail-rating-mark" aria-hidden="true">*</span><strong>4,8</strong><span>được cộng đồng yêu thích</span><span className="detail-separator" aria-hidden="true">·</span><span>{new Intl.NumberFormat('vi-VN').format(book.views)} lượt đọc</span></div>
          <p className="book-detail-description">{book.description}</p>
          <div className="detail-note"><span aria-hidden="true">“</span><p>{book.preview}</p></div>
          <div className="detail-actions">
            <button className="button button-dark" type="button" onClick={() => setReaderOpen(true)}>Đọc thử <span aria-hidden="true">↗</span></button>
            <button className="button button-light" type="button" onClick={() => setNotice('Bản xem trước — chức năng lưu sách chưa được kết nối.')}>+ Lưu vào kệ</button>
          </div>
          {notice && <p className="prototype-note" role="status">{notice}</p>}
          <div className="book-detail-facts"><div><span>CHỦ ĐỀ</span><strong>{book.category}</strong></div><div><span>ĐỊNH DẠNG</span><strong>Bản đọc thử</strong></div><div><span>CHIA SẺ BỞI</span><strong>Cộng đồng Shelf</strong></div></div>
        </div>
      </section>
      <section className="related-books" aria-labelledby="related-books-title"><div className="section-heading"><div><p className="page-eyebrow">CÙNG CHỦ ĐỀ</p><h2 id="related-books-title">Có thể bạn cũng thích<span>.</span></h2></div><Link className="text-link" href="/books">Xem toàn bộ kho sách <span aria-hidden="true">↗</span></Link></div><div className="page-book-grid related-grid">{suggestedBooks.map((item) => <PageBookCard key={item.id} book={item} index={demoBooks.indexOf(item)} />)}</div></section>
      {readerOpen && <ReaderDialog book={book} onClose={() => setReaderOpen(false)} />}
    </PageLayout>
  )
}
