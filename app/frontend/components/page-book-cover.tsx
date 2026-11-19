import type { CSSProperties } from 'react'
import type { LibraryBook } from '@/lib/books'

export function PageBookCover({ book, index = 0 }: { book: LibraryBook; index?: number }) {
  return (
    <span className={`page-book-cover page-cover-${index % 6}`} style={{ '--book-color': book.coverColor } as CSSProperties} aria-hidden="true">
      <span className="page-cover-brand">S.</span>
      <span className="page-cover-category">{book.category}</span>
      <span className="page-cover-title">{book.title}</span>
      <span className="page-cover-rule" />
      <span className="page-cover-author">{book.author}</span>
      <span className="page-cover-edition">SHELF · READ & SHARE</span>
    </span>
  )
}
