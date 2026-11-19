'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [notice, setNotice] = useState(false)
  const isSignUp = mode === 'sign-up'

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(true)
  }

  return (
    <main className="auth-layout">
      <Link className="brand auth-brand" href="/" aria-label="Shelf — trang chủ"><span className="brand-mark" aria-hidden="true">S.</span><span className="brand-name">shelf<span className="brand-period">.</span></span></Link>
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="eyebrow section-eyebrow">{isSignUp ? 'KỆ SÁCH CỦA CHÚNG MÌNH' : 'CHÀO MỪNG BẠN TRỞ LẠI'}</div>
        <h1 id="auth-title">{isSignUp ? 'Cùng chia sẻ nhé.' : 'Tiếp tục đọc thôi.'}</h1>
        <p>{isSignUp ? 'Tạo tài khoản để chia sẻ và khám phá sách cùng cộng đồng.' : 'Đăng nhập để chia sẻ cuốn sách tiếp theo của bạn.'}</p>
        <p className="prototype-note">Prototype giao diện · tài khoản chưa được kết nối</p>
        <form className="auth-form" onSubmit={submit}>
          {isSignUp && <label className="form-field">Tên hiển thị<input autoComplete="name" name="name" type="text" minLength={2} maxLength={80} placeholder="Tên của bạn" required /></label>}
          <label className="form-field">Email<input autoComplete="email" name="email" type="email" maxLength={254} placeholder="ban@email.com" required /></label>
          <label className="form-field">Mật khẩu<input autoComplete={isSignUp ? 'new-password' : 'current-password'} name="password" type="password" minLength={8} maxLength={128} placeholder="Ít nhất 8 ký tự" required /></label>
          {notice && <p className="prototype-note" role="status">Đây là bản xem trước UI/UX. Thông tin chưa được gửi hoặc lưu.</p>}
          <button className="button button-dark submit-button">{isSignUp ? 'Tạo tài khoản' : 'Đăng nhập'} <span aria-hidden="true">↗</span></button>
        </form>
        <p className="auth-switch">{isSignUp ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} <Link href={isSignUp ? '/login' : '/register'}>{isSignUp ? 'Đăng nhập' : 'Tham gia Shelf'}</Link></p>
        <Link className="auth-back" href="/books">← Quay về kho sách</Link>
      </section>
      <div className="auth-quote"><span aria-hidden="true">“</span>Một căn phòng không sách<br />giống như một cơ thể không có linh hồn.<small>— Marcus Tullius Cicero</small></div>
    </main>
  )
}
