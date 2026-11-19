'use client'

import Link from 'next/link'
import { useState } from 'react'
import { demoBooks } from '@/lib/books'
import { PageLayout } from '@/components/page-layout'

const weeklyActivity = [
  { day: 'T2', value: 42 }, { day: 'T3', value: 66 }, { day: 'T4', value: 48 },
  { day: 'T5', value: 82 }, { day: 'T6', value: 58 }, { day: 'T7', value: 94 }, { day: 'CN', value: 72 },
]

export function AdminDashboardPage() {
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('Tất cả sách')
  const books = demoBooks.slice(0, 5).map((book, index) => ({ book, status: index === 1 ? 'Chờ duyệt' : 'Đang hoạt động' }))
  const visibleBooks = activeTab === 'Tất cả sách' ? books : books.filter((item) => item.status === activeTab)

  return (
    <PageLayout active="admin">
      <section className="admin-heading" aria-labelledby="admin-title"><div><p className="page-eyebrow"><span className="eyebrow-dot" /> KHU VỰC QUẢN TRỊ</p><h1 id="admin-title">Chào buổi sáng,<br /><em>người giữ kệ.</em></h1><p className="page-lede">Một góc nhìn nhanh về những gì đang diễn ra trong cộng đồng Shelf.</p></div><button className="button button-dark" type="button" onClick={() => setNotice('Bản xem trước — báo cáo chưa được xuất.')}>Xuất báo cáo <span aria-hidden="true">↗</span></button></section>
      <div className="demo-banner" role="note"><span className="demo-banner-mark" aria-hidden="true">i</span><span><strong>Bản xem trước admin</strong> · Các chỉ số và thao tác bên dưới dùng dữ liệu minh họa.</span></div>
      <section className="admin-stats" aria-label="Thống kê tổng quan"><article><span>TỔNG ĐẦU SÁCH</span><strong>1.284</strong><small><b>+8,2%</b> so với tháng trước</small><span className="admin-stat-icon" aria-hidden="true">BK</span></article><article><span>THÀNH VIÊN</span><strong>3.692</strong><small><b>+12,4%</b> thành viên mới</small><span className="admin-stat-icon" aria-hidden="true">US</span></article><article><span>LƯỢT ĐỌC THÁNG NÀY</span><strong>8.547</strong><small><b>+6,1%</b> so với tháng trước</small><span className="admin-stat-icon" aria-hidden="true">↗</span></article><article><span>CHỜ DUYỆT</span><strong>06</strong><small>3 cuốn cần xem hôm nay</small><span className="admin-stat-icon" aria-hidden="true">!</span></article></section>
      <div className="admin-content-grid">
        <section className="admin-panel activity-panel" aria-labelledby="activity-title"><div className="admin-panel-heading"><div><h2 id="activity-title">Hoạt động cộng đồng</h2><p>Lượt đọc trong 7 ngày gần đây</p></div><button className="period-select" type="button" onClick={() => setNotice('Đang xem dữ liệu 7 ngày gần đây.')}>7 ngày⌄</button></div><div className="activity-total"><strong>8.547</strong><span>lượt đọc <b>+6,1%</b></span></div><div className="activity-chart" role="img" aria-label="Biểu đồ cột lượt đọc trong tuần"><div className="chart-grid-lines" aria-hidden="true"><span>1.200</span><span>800</span><span>400</span><span>0</span></div><div className="chart-bars">{weeklyActivity.map((item) => <div className="chart-day" key={item.day}><span className={item.day === 'T7' ? 'chart-bar is-highlighted' : 'chart-bar'} style={{ height: `${item.value}%` }} title={`${item.value * 12} lượt đọc`} /><span>{item.day}</span></div>)}</div></div></section>
        <section className="admin-panel category-panel" aria-labelledby="category-title"><div className="admin-panel-heading"><div><h2 id="category-title">Chủ đề nổi bật</h2><p>Phân bổ sách trong thư viện</p></div><button className="icon-button" type="button" aria-label="Tùy chọn biểu đồ" onClick={() => setNotice('Biểu đồ chủ đề đang ở chế độ xem trước.')}>···</button></div><div className="category-ring" aria-label="Văn học chiếm 38 phần trăm"><div><strong>38%</strong><span>Văn học</span></div></div><div className="category-legend"><span><i className="legend-dot legend-literature" />Văn học <b>38%</b></span><span><i className="legend-dot legend-psychology" />Tâm lý <b>26%</b></span><span><i className="legend-dot legend-business" />Kinh doanh <b>21%</b></span><span><i className="legend-dot legend-science" />Khác <b>15%</b></span></div></section>
      </div>
      <section className="admin-panel admin-books-panel" aria-labelledby="admin-books-title"><div className="admin-panel-heading"><div><h2 id="admin-books-title">Quản lý sách</h2><p>Theo dõi nội dung mới và trạng thái kiểm duyệt.</p></div><Link className="text-link" href="/books">Mở kho sách <span aria-hidden="true">↗</span></Link></div><div className="admin-table-tabs" role="group" aria-label="Lọc trạng thái sách">{['Tất cả sách', 'Đang hoạt động', 'Chờ duyệt'].map((tab) => <button className={activeTab === tab ? 'is-active' : ''} key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th scope="col">ĐẦU SÁCH</th><th scope="col">CHỦ ĐỀ</th><th scope="col">LƯỢT ĐỌC</th><th scope="col">TRẠNG THÁI</th><th scope="col"><span className="sr-only">Thao tác</span></th></tr></thead><tbody>{visibleBooks.map(({ book, status }, index) => <tr key={book.id}><td><div className="admin-book-title"><span className={`admin-book-swatch swatch-${index % 5}`} aria-hidden="true">S.</span><span><strong>{book.title}</strong><small>{book.author}</small></span></div></td><td>{book.category}</td><td>{new Intl.NumberFormat('vi-VN').format(book.views)}</td><td><span className={`status-pill ${status === 'Chờ duyệt' ? 'is-pending' : ''}`}><i aria-hidden="true" /> {status}</span></td><td><button className="row-action" type="button" onClick={() => setNotice(`Bản xem trước — chưa thay đổi trạng thái “${book.title}”.`)}>···</button></td></tr>)}{!visibleBooks.length && <tr><td colSpan={5}>Không có đầu sách trong trạng thái này.</td></tr>}</tbody></table></div>{notice && <p className="prototype-note" role="status">{notice}</p>}</section>
    </PageLayout>
  )
}
