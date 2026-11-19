const books = [
  { id: '1', title: 'Nhà giả kim', author: 'Paulo Coelho', category: 'Văn học', cover: 'cover-sage', views: 1240, preview: 'Đôi khi, hành trình quan trọng nhất không phải là đi đến đâu, mà là những điều ta học được trên đường đi. Những dấu hiệu nhỏ bé bắt đầu hiện ra khi ta đủ kiên nhẫn để lắng nghe.' },
  { id: '2', title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', category: 'Tâm lý', cover: 'cover-gold', views: 968, preview: 'Khi đứng trước một câu hỏi khó, đôi khi chúng ta vô thức thay thế nó bằng một câu hỏi dễ hơn. Hiểu được điều này là bước đầu để nhìn rõ hơn những quyết định của mình.' },
  { id: '3', title: 'Hiểu về trái tim', author: 'Minh Niệm', category: 'Tâm lý', cover: 'cover-blue', views: 830, preview: 'Ta thường nghĩ bình yên là khi mọi chuyện đều thuận lợi. Nhưng có lẽ bình yên còn là khả năng ngồi yên với chính mình, ngay cả khi ngoài kia vẫn còn nhiều điều chưa trọn vẹn.' },
  { id: '4', title: 'Đi tìm lẽ sống', author: 'Viktor E. Frankl', category: 'Văn học', cover: 'cover-rose', views: 742, preview: 'Giữa kích thích và phản ứng luôn có một khoảng trống. Trong khoảng trống ấy là quyền lựa chọn cách ta đáp lại — và trong lựa chọn đó, tự do và sự trưởng thành của ta bắt đầu.' },
  { id: '5', title: 'Khởi nghiệp tinh gọn', author: 'Eric Ries', category: 'Kinh doanh', cover: 'cover-violet', views: 615, preview: 'Điều quan trọng không phải là chúng ta làm việc chăm chỉ đến đâu, mà là liệu những nỗ lực đó có tạo ra giá trị mà người dùng thực sự cần hay không.' },
  { id: '6', title: 'Sapiens: Lược sử loài người', author: 'Yuval Noah Harari', category: 'Khoa học', cover: 'cover-clay', views: 582, preview: 'Khả năng hợp tác linh hoạt với số lượng lớn người lạ là điều làm nên sức mạnh đặc biệt của loài người. Những câu chuyện chung đã kết nối chúng ta qua nhiều thế hệ.' },
  { id: '7', title: 'Atomic Habits', author: 'James Clear', category: 'Tâm lý', cover: 'cover-sage', views: 496, preview: 'Mỗi hành động là một lá phiếu cho kiểu người mà bạn muốn trở thành. Bạn không cần hoàn hảo ngay hôm nay; chỉ cần tiếp tục củng cố hướng đi mình đã chọn.' },
  { id: '8', title: 'Từ tốt đến vĩ đại', author: 'Jim Collins', category: 'Kinh doanh', cover: 'cover-gold', views: 384, preview: 'Sự chuyển đổi lớn thường không đến từ một khoảnh khắc kỳ diệu. Nó bắt đầu bằng những bước đi nhỏ, nhất quán, được tích lũy qua thời gian.' },
]
const colors = ['#668a7d', '#b48b53', '#647f92', '#ac7568', '#827596', '#9b805c']
const grid = document.querySelector('#bookGrid')
const searchInput = document.querySelector('#searchInput')
const filterRow = document.querySelector('#filterRow')
const resultCount = document.querySelector('#resultCount')
const emptyState = document.querySelector('#emptyState')
const readerDialog = document.querySelector('#readerDialog')
const uploadDialog = document.querySelector('#uploadDialog')
const authDialog = document.querySelector('#authDialog')
let activeCategory = 'all'
let query = ''
let toastTimer
let authMode = 'sign-up'

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

function renderBooks() {
  const normalizedQuery = query.toLocaleLowerCase('vi')
  const visibleBooks = books.filter((book) => {
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory
    const searchText = `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase('vi')
    return matchesCategory && searchText.includes(normalizedQuery)
  })
  grid.innerHTML = visibleBooks.map((book) => {
    const longTitle = book.title.length > 22 ? ' long' : ''
    return `<button class="book-card" type="button" data-book-id="${escapeHtml(book.id)}" aria-label="Đọc thử ${escapeHtml(book.title)} của ${escapeHtml(book.author)}"><span class="book-cover ${escapeHtml(book.cover)}" style="--book-color:${escapeHtml(book.color || '#668a7d')}"><span class="cover-mark">SHELF · READ & SHARE</span><span class="cover-title${longTitle}">${escapeHtml(book.title)}</span><span class="cover-rule"></span><span class="cover-author">${escapeHtml(book.author)}</span><span class="cover-footer">ĐỌC CÙNG NHAU</span></span><span class="book-info"><span class="book-category">${escapeHtml(book.category)}</span><span class="book-title">${escapeHtml(book.title)}</span><span class="book-author">${escapeHtml(book.author)}</span><span class="book-views">${new Intl.NumberFormat('vi-VN').format(book.views)} lượt đọc <span aria-hidden="true">→</span></span></span></button>`
  }).join('')
  grid.hidden = visibleBooks.length === 0
  emptyState.hidden = visibleBooks.length !== 0
  resultCount.textContent = `${new Intl.NumberFormat('vi-VN').format(visibleBooks.length)} CUỐN SÁCH`
  document.querySelector('#bookTotal').textContent = new Intl.NumberFormat('vi-VN').format(books.length)
  document.querySelector('#viewTotal').textContent = new Intl.NumberFormat('vi-VN').format(books.reduce((sum, book) => sum + book.views, 0))
  document.querySelector('#categoryTotal').textContent = new Intl.NumberFormat('vi-VN').format(new Set(books.map((book) => book.category)).size)
}

function showToast(message) {
  const toast = document.querySelector('#toast')
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800)
}

function openReader(book) {
  document.querySelector('#readerTitle').textContent = book.title
  document.querySelector('#readerAuthor').textContent = book.author
  const surface = document.querySelector('#readerSurface')
  surface.replaceChildren()
  if (book.fileUrl) {
    const frame = document.createElement('iframe')
    frame.className = 'reader-pdf'
    frame.title = `Xem thử tệp ${book.title}`
    frame.src = `${book.fileUrl}#toolbar=1&navpanes=0`
    surface.append(frame)
  } else {
    const paper = document.createElement('article')
    paper.className = 'reader-paper'
    const mark = document.createElement('span')
    mark.className = 'reader-paper-mark'
    mark.textContent = 'SHELF · ĐỌC CÙNG NHAU'
    const number = document.createElement('span')
    number.className = 'reader-paper-number'
    number.textContent = '01'
    const content = document.createElement('div')
    content.className = 'reader-paper-content'
    const caption = document.createElement('p')
    caption.className = 'reader-paper-caption'
    caption.textContent = `${book.category} · ${book.author}`
    const title = document.createElement('h3')
    title.textContent = book.title
    const rule = document.createElement('div')
    rule.className = 'reader-paper-rule'
    const preview = document.createElement('p')
    preview.textContent = book.preview
    const note = document.createElement('p')
    note.className = 'reader-paper-note'
    note.textContent = 'Trang minh họa cho trải nghiệm đọc. Đây không phải nội dung nguyên văn của sách.'
    content.append(caption, title, rule, preview, note)
    paper.append(mark, number, content)
    surface.append(paper)
  }
  readerDialog.showModal()
}

filterRow.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-category]')
  if (!tab) return
  activeCategory = tab.dataset.category
  filterRow.querySelectorAll('[role="tab"]').forEach((button) => {
    const selected = button === tab
    button.classList.toggle('selected', selected)
    button.setAttribute('aria-selected', String(selected))
  })
  renderBooks()
})
searchInput.addEventListener('input', () => {
  query = searchInput.value.trim()
  renderBooks()
})
grid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-book-id]')
  if (!card) return
  const book = books.find((item) => item.id === card.dataset.bookId)
  if (book) openReader(book)
})
document.querySelector('#resetFilters').addEventListener('click', () => {
  query = ''
  searchInput.value = ''
  activeCategory = 'all'
  filterRow.querySelectorAll('[role="tab"]').forEach((button) => {
    const selected = button.dataset.category === 'all'
    button.classList.toggle('selected', selected)
    button.setAttribute('aria-selected', String(selected))
  })
  renderBooks()
})

document.querySelectorAll('[data-open-upload]').forEach((button) => button.addEventListener('click', () => uploadDialog.showModal()))
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()))
;[readerDialog, uploadDialog, authDialog].forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
}))

document.querySelector('#uploadForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  const data = new FormData(form)
  const file = data.get('file')
  const message = document.querySelector('#uploadMessage')
  message.hidden = true
  if (!(file instanceof File) || !file.size || (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf'))) {
    message.textContent = 'Vui lòng chọn một tệp PDF để xem thử.'
    message.hidden = false
    return
  }
  if (file.size > 20 * 1024 * 1024) {
    message.textContent = 'Tệp PDF xem thử không được vượt quá 20 MB.'
    message.hidden = false
    return
  }
  const fileUrl = URL.createObjectURL(file)
  books.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `demo-${Date.now()}`,
    title: String(data.get('title')).trim(),
    author: String(data.get('author')).trim(),
    category: String(data.get('category')),
    cover: 'cover-sage',
    color: colors[Math.floor(Math.random() * colors.length)],
    views: 0,
    preview: String(data.get('description')).trim(),
    fileUrl,
  })
  activeCategory = 'all'
  query = ''
  searchInput.value = ''
  filterRow.querySelectorAll('[role="tab"]').forEach((button) => {
    const selected = button.dataset.category === 'all'
    button.classList.toggle('selected', selected)
    button.setAttribute('aria-selected', String(selected))
  })
  renderBooks()
  form.reset()
  uploadDialog.close()
  showToast('Đã thêm sách vào kệ xem trước của phiên này.')
})

document.querySelectorAll('[data-auth-mode]').forEach((button) => button.addEventListener('click', () => {
  authMode = button.dataset.authMode
  const signUp = authMode === 'sign-up'
  document.querySelector('#authEyebrow').textContent = signUp ? 'KỆ SÁCH CỦA CHÚNG MÌNH' : 'CHÀO MỪNG BẠN TRỞ LẠI'
  document.querySelector('#authTitle').textContent = signUp ? 'Cùng chia sẻ nhé.' : 'Tiếp tục đọc thôi.'
  document.querySelector('#authDescription').textContent = signUp ? 'Tạo tài khoản để chia sẻ và khám phá sách cùng cộng đồng.' : 'Đăng nhập để chia sẻ cuốn sách tiếp theo của bạn.'
  document.querySelector('#nameField').hidden = !signUp
  document.querySelector('#nameField input').required = signUp
  document.querySelector('#authSubmit').innerHTML = `${signUp ? 'Tạo tài khoản' : 'Đăng nhập'} <span aria-hidden="true">↗</span>`
  document.querySelector('#authSwitch').innerHTML = signUp ? 'Đã có tài khoản? <button type="button" data-auth-mode="sign-in">Đăng nhập</button>' : 'Chưa có tài khoản? <button type="button" data-auth-mode="sign-up">Tham gia Shelf</button>'
  document.querySelector('#authMessage').hidden = true
  authDialog.showModal()
  document.querySelectorAll('#authSwitch [data-auth-mode]').forEach((switchButton) => switchButton.addEventListener('click', () => {
    authDialog.close()
    document.querySelector(`.header-actions [data-auth-mode="${switchButton.dataset.authMode}"]`).click()
  }, { once: true }))
}))
document.querySelector('#authForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const message = document.querySelector('#authMessage')
  message.textContent = 'Đây là bản xem trước UI/UX. Thông tin chưa được gửi hoặc lưu.'
  message.hidden = false
})

const menuToggle = document.querySelector('.menu-toggle')
const mobileNav = document.querySelector('#mobileNav')
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true'
  menuToggle.setAttribute('aria-expanded', String(expanded))
  mobileNav.hidden = !expanded
})
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.hidden = true
  menuToggle.setAttribute('aria-expanded', 'false')
}))
renderBooks()
