import Link from 'next/link'
import type { LibraryBook } from '@/lib/books'
import { PageBookCover } from '@/components/page-book-cover'

export function PageBookCard({ book, index = 0, note }: { book: LibraryBook; index?: number; note?: string }) {
  return (
    <Link className="page-book-card" href={`/books/${book.id}`}>
      <PageBookCover book={book} index={index} />
      <span className="page-book-info">
        <span className="page-book-category">{book.category}</span>
        <span className="page-book-title">{book.title}</span>
        <span className="page-book-author">{book.author}</span>
        <span className="page-book-meta">{note ?? `${new Intl.NumberFormat('vi-VN').format(book.views)} lượt đọc`} <span aria-hidden="true">→</span></span>
      </span>
    </Link>
  )
}
