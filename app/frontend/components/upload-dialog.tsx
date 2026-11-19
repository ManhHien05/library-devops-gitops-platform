'use client'

import { FormEvent, useState } from 'react'
import type { LibraryBook } from '@/lib/books'

const categories = ['Văn học', 'Công nghệ', 'Kinh doanh', 'Tâm lý', 'Khoa học', 'Khác']
const coverColors = ['#668a7d', '#b48b53', '#647f92', '#ac7568', '#827596', '#9b805c']

export function UploadDialog({ onClose, onUploaded }: { onClose: () => void; onUploaded: (book: LibraryBook) => void }) {
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const file = data.get('file')
    if (!(file instanceof File) || !file.size) {
      setError('Vui lòng chọn một tệp PDF để xem thử giao diện.')
      return
    }

    const title = String(data.get('title') ?? '').trim()
    const author = String(data.get('author') ?? '').trim()
    const description = String(data.get('description') ?? '').trim()
    const category = String(data.get('category') ?? 'Khác')
    if (!title || !author || !description) {
      setError('Vui lòng điền đầy đủ thông tin sách.')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Tệp PDF xem thử không được vượt quá 20 MB.')
      return
    }

    const fileUrl = URL.createObjectURL(file)
    onUploaded({
      id: crypto.randomUUID(),
      title,
      author,
      description,
      category,
      coverColor: coverColors[Math.floor(Math.random() * coverColors.length)],
      views: 0,
      fileUrl,
      fileName: file.name,
      preview: description,
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <dialog open className="upload-dialog" aria-labelledby="upload-title" aria-modal="true">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng cửa sổ">×</button>
        <div className="eyebrow section-eyebrow">THÊM VÀO KỆ CHUNG</div>
        <h2 id="upload-title">Chia sẻ một cuốn sách<span>.</span></h2>
        <p className="dialog-intro">Một cuốn sách hay có thể bắt đầu một cuộc trò chuyện mới.</p>
        <p className="prototype-note">Bản xem trước UI/UX · sách chỉ hiển thị trong phiên này, chưa được lưu.</p>
        <form onSubmit={submit} className="upload-form">
          <label className="file-drop"><span className="file-icon" aria-hidden="true">↑</span><strong>Chọn tệp PDF để tải lên</strong><span>Tối đa 20 MB · Định dạng PDF</span><input aria-label="Chọn tệp PDF" name="file" type="file" accept="application/pdf,.pdf" required /></label>
          <div className="form-row"><label className="form-field">Tên sách<input name="title" type="text" maxLength={180} placeholder="Ví dụ: Nhà giả kim" required /></label><label className="form-field">Tác giả<input name="author" type="text" maxLength={140} placeholder="Tên tác giả" required /></label></div>
          <label className="form-field">Chủ đề<select name="category" defaultValue="Văn học" required>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="form-field">Đôi lời giới thiệu<textarea name="description" maxLength={1600} rows={3} placeholder="Điều gì khiến bạn muốn chia sẻ cuốn sách này?" required /></label>
          <label className="rights-check"><input type="checkbox" name="rightsConfirmed" value="true" required /><span>Tôi có quyền chia sẻ tệp này và hiểu rằng sách sẽ được công khai cho cộng đồng Shelf.</span></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark submit-button">Xem trước chia sẻ <span aria-hidden="true">↗</span></button>
        </form>
      </dialog>
    </div>
  )
}
