'use client'

import { useMemo, useState } from 'react'
import { demoBooks } from '@/lib/books'
import { PageBookCard } from '@/components/page-book-card'
import { PageLayout } from '@/components/page-layout'

const categories = ['Tất cả', ...Array.from(new Set(demoBooks.map((book) => book.category)))]

export function CatalogPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi')
    return demoBooks.filter((book) => {
      const matchesCategory = category === 'Tất cả' || book.category === category
      const searchableText = `${book.title} ${book.author} ${book.description} ${book.category}`.toLocaleLowerCase('vi')
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [category, query])

  return (
    <PageLayout active="catalog">
      <section className="page-intro catalog-intro" aria-labelledby="catalog-title">
        <div>
          <p className="page-eyebrow"><span className="eyebrow-dot" /> KỆ SÁCH CỘNG ĐỒNG</p>
          <h1 id="catalog-title">Mỗi cuốn sách,<br /><em>một góc nhìn mới.</em></h1>
          <p className="page-lede">Lọc tìm cuốn sách tiếp theo theo chủ đề, tác giả hoặc một ý tưởng đang khiến bạn tò mò.</p>
        </div>
        <div className="catalog-summary"><strong>{demoBooks.length.toString().padStart(2, '0')}</strong><span>đầu sách<br />đang chờ bạn khám phá</span></div>
      </section>

      <section className="catalog-section" aria-label="Danh mục sách">
        <div className="catalog-toolbar">
          <label className="search-box catalog-search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">Tìm sách</span>
            <input aria-label="Tìm theo tên sách, tác giả hoặc chủ đề" placeholder="Tìm tên sách, tác giả..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <span className="catalog-count">{filteredBooks.length} CUỐN SÁCH</span>
        </div>
        <div className="page-category-list" role="group" aria-label="Lọc sách theo chủ đề">
          {categories.map((item) => (
            <button key={item} type="button" className={`page-category-chip ${category === item ? 'is-selected' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        {filteredBooks.length ? (
          <div className="page-book-grid">
            {filteredBooks.map((book, index) => <PageBookCard key={book.id} book={book} index={index} />)}
          </div>
        ) : (
          <div className="page-empty-state"><span className="empty-mark" aria-hidden="true">S.</span><h2>Chưa tìm thấy cuốn sách này.</h2><p>Thử một từ khóa khác hoặc chọn chủ đề “Tất cả”.</p><button className="button button-light" type="button" onClick={() => { setQuery(''); setCategory('Tất cả') }}>Xóa bộ lọc</button></div>
        )}
      </section>
    </PageLayout>
  )
}
