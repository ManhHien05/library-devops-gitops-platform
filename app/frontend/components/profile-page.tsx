'use client'

import { FormEvent, useState } from 'react'
import { PageLayout } from '@/components/page-layout'

export function ProfilePage() {
  const [notice, setNotice] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('Bản xem trước — thay đổi chưa được lưu vào tài khoản.')
  }

  return (
    <PageLayout active="profile">
      <section className="profile-heading" aria-labelledby="profile-title"><div><p className="page-eyebrow"><span className="eyebrow-dot" /> THÀNH VIÊN SHELF</p><h1 id="profile-title">Hồ sơ của bạn<span>.</span></h1><p className="page-lede">Một góc nhỏ để giới thiệu bản thân và gu đọc của bạn.</p></div><span className="preview-tag">BẢN XEM TRƯỚC</span></section>
      <div className="profile-layout">
        <aside className="profile-card"><div className="profile-avatar" aria-hidden="true">MA</div><h2>Minh Anh</h2><p>Người đọc từ năm 2024</p><div className="profile-stats"><div><strong>12</strong><span>đầu sách</span></div><div><strong>08</strong><span>đã đọc</span></div></div><div className="profile-favorite"><span>CHỦ ĐỀ YÊU THÍCH</span><div><span>Văn học</span><span>Tâm lý</span><span>Thiết kế</span></div></div></aside>
        <section className="profile-form-card" aria-labelledby="profile-details-title"><div className="profile-section-heading"><div><h2 id="profile-details-title">Thông tin cá nhân</h2><p>Chia sẻ một chút về người đứng sau những ghi chú bên lề.</p></div><span className="profile-lock" aria-label="Thông tin chỉ mình bạn thấy">Riêng tư</span></div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row"><label className="form-field" htmlFor="profile-name">Tên hiển thị<input id="profile-name" name="name" defaultValue="Minh Anh" maxLength={80} /></label><label className="form-field" htmlFor="profile-email">Email<input id="profile-email" name="email" type="email" defaultValue="minhanh@example.com" maxLength={254} /></label></div>
            <label className="form-field" htmlFor="profile-bio">Giới thiệu<textarea id="profile-bio" name="bio" rows={4} maxLength={280} defaultValue="Mình thích những cuốn sách khiến mình nhìn mọi thứ chậm lại một chút." /></label>
            <fieldset className="interest-fieldset"><legend>Chủ đề bạn quan tâm</legend><div className="interest-options"><label><input type="checkbox" defaultChecked /> Văn học</label><label><input type="checkbox" defaultChecked /> Tâm lý</label><label><input type="checkbox" /> Kinh doanh</label><label><input type="checkbox" /> Khoa học</label></div></fieldset>
            {notice && <p className="prototype-note" role="status">{notice}</p>}
            <div className="profile-form-actions"><span>Hồ sơ đang ở chế độ xem trước.</span><button className="button button-dark" type="submit">Lưu thay đổi <span aria-hidden="true">↗</span></button></div>
          </form>
        </section>
      </div>
    </PageLayout>
  )
}
