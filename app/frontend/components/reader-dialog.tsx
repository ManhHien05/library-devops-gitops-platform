'use client'

import type { LibraryBook } from '@/lib/books'

export function ReaderDialog({ book, onClose }: { book: LibraryBook; onClose: () => void }) {
  return (
    <div className="modal-backdrop reader-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="reader-dialog" aria-labelledby="reader-title" aria-modal="true" role="dialog">
        <header className="reader-dialog-top"><div><span className="reader-label">SHELF READER · BẢN XEM TRƯỚC</span><h2 id="reader-title">{book.title}</h2><p>{book.author}</p></div><button type="button" className="modal-close" onClick={onClose} aria-label="Đóng trình đọc">×</button></header>
        <div className="reader-toolbar"><span>Trang xem trước</span><span className="reader-page-count">01 <span>/</span> 01</span><button type="button" onClick={onClose}>Đóng sách</button></div>
        {book.fileUrl ? (
          <iframe className="reader-pdf" title={`Xem thử tệp ${book.title}`} src={`${book.fileUrl}#toolbar=1&navpanes=0`} />
        ) : (
          <article className="reader-paper"><span className="reader-paper-mark">SHELF · ĐỌC CÙNG NHAU</span><span className="reader-paper-number">01</span><div className="reader-paper-content"><p className="reader-paper-caption">{book.category} · {book.author}</p><h3>{book.title}</h3><div className="reader-paper-rule" /><p>{book.preview}</p><p className="reader-paper-note">Đây là trang minh họa cho trải nghiệm đọc sách. Nội dung sách thật sẽ hiển thị khi được chia sẻ.</p></div></article>
        )}
      </section>
    </div>
  )
}
