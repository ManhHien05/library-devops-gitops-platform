'use client'

import Link from 'next/link'
import { useState } from 'react'
import { demoBooks } from '@/lib/books'
import { PageBookCard } from '@/components/page-book-card'
import { PageLayout } from '@/components/page-layout'

const shelfBooks = [
  { book: demoBooks[6], status: 'Đang đọc', progress: 42, note: 'Còn khoảng 3 giờ đọc' },
  { book: demoBooks[0], status: 'Đã đọc', progress: 100, note: 'Hoàn thành tuần trước' },
  { book: demoBooks[2], status: 'Muốn đọc', progress: 0, note: 'Để dành cho cuối tuần' },
]
const tabs = ['Tất cả', 'Đang đọc', 'Muốn đọc', 'Đã đọc']

export function MyLibraryPage() {
  const [activeTab, setActiveTab] = useState('Tất cả')
  const filteredBooks = activeTab === 'Tất cả' ? shelfBooks : shelfBooks.filter((item) => item.status === activeTab)

  return (
    <PageLayout active="library">
      <section className="library-welcome" aria-labelledby="my-library-title">
        <div><p className="page-eyebrow"><span className="eyebrow-dot" /> GÓC ĐỌC CỦA BẠN</p><h1 id="my-library-title">Một chút thời gian<br /><em>cho chính mình.</em></h1><p className="page-lede">Theo dõi những cuốn bạn đang đọc, muốn đọc và đã đi qua.</p></div>
        <div className="reader-streak"><span className="streak-mark" aria-hidden="true">✳</span><strong>04</strong><span>ngày đọc<br />liên tiếp</span></div>
      </section>
      <div className="demo-banner" role="note"><span className="demo-banner-mark" aria-hidden="true">i</span><span><strong>Bản xem trước</strong> · Đây là dữ liệu minh họa; thư viện cá nhân chưa được lưu vào tài khoản.</span></div>
      <section className="my-library-section" aria-label="Sách trong kệ của bạn">
        <div className="library-tabs" role="group" aria-label="Lọc theo trạng thái đọc">
          {tabs.map((tab) => <button key={tab} type="button" className={`page-category-chip ${activeTab === tab ? 'is-selected' : ''}`} aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}<span className="tab-count">{tab === 'Tất cả' ? shelfBooks.length : shelfBooks.filter((item) => item.status === tab).length}</span></button>)}
        </div>
        {filteredBooks.length ? <div className="shelf-book-grid">{filteredBooks.map(({ book, status, progress, note }, index) => <article className="shelf-book-item" key={book.id}><PageBookCard book={book} index={demoBooks.indexOf(book)} note={status} /><div className="reading-progress"><div className="progress-copy"><span>{note}</span><strong>{progress}%</strong></div><div className="progress-track" role="progressbar" aria-label={`Tiến độ đọc ${book.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div></div></article>)}</div> : <div className="page-empty-state"><span className="empty-mark" aria-hidden="true">S.</span><h2>Kệ này đang chờ một cuốn sách.</h2><p>Khám phá kho sách để tìm điều bạn muốn đọc tiếp theo.</p><Link className="button button-dark" href="/books">Đến kho sách <span aria-hidden="true">↗</span></Link></div>}
      </section>
    </PageLayout>
  )
}
