const books = [
  {id:1,title:'Nhà giả kim',author:'Paulo Coelho',category:'fiction',categoryLabel:'Văn học',tag:'HÀNH TRÌNH',cover:'cover-a',coverTitle:'THE\nALCHEMIST',coverSub:'Paulo Coelho',coverNote:'A FABLE ABOUT FOLLOWING YOUR DREAMS'},
  {id:2,title:'Atomic Habits',author:'James Clear',category:'mindset',categoryLabel:'Phát triển bản thân',tag:'THÓI QUEN',cover:'cover-b',coverTitle:'ATOMIC\nHABITS',coverSub:'James Clear',coverNote:'TINY CHANGES · REMARKABLE RESULTS'},
  {id:3,title:'Sapiens',author:'Yuval Noah Harari',category:'fiction',categoryLabel:'Văn học',tag:'NHÂN LOẠI',cover:'cover-c',coverTitle:'SAPIENS',coverSub:'Yuval Noah Harari',coverNote:'A BRIEF HISTORY OF HUMANKIND'},
  {id:4,title:'Clean Code',author:'Robert C. Martin',category:'technology',categoryLabel:'Công nghệ',tag:'LẬP TRÌNH',cover:'cover-d',coverTitle:'CLEAN\nCODE',coverSub:'Robert C. Martin',coverNote:'A HANDBOOK OF AGILE SOFTWARE'},
  {id:5,title:'The Psychology of Money',author:'Morgan Housel',category:'business',categoryLabel:'Kinh doanh',tag:'TÀI CHÍNH',cover:'cover-e',coverTitle:'THE\nPSYCHOLOGY\nOF MONEY',coverSub:'Morgan Housel',coverNote:'TIME · WEALTH · HAPPINESS'},
  {id:6,title:'Deep Work',author:'Cal Newport',category:'mindset',categoryLabel:'Phát triển bản thân',tag:'TẬP TRUNG',cover:'cover-f',coverTitle:'DEEP\nWORK',coverSub:'Cal Newport',coverNote:'RULES FOR FOCUSED SUCCESS'}
];
const grid=document.getElementById('bookGrid');
const searchInput=document.getElementById('searchInput');
const filterRow=document.getElementById('filterRow');
const sortSelect=document.getElementById('sortSelect');
const emptyState=document.getElementById('emptyState');
const resultCount=document.getElementById('resultCount');
let activeCategory='all';
let query='';
const saved=new Set();
function renderBooks(){
  let list=books.filter(book=>{
    const matchesCategory=activeCategory==='all'||book.category===activeCategory;
    const haystack=`${book.title} ${book.author} ${book.categoryLabel}`.toLocaleLowerCase('vi');
    return matchesCategory&&haystack.includes(query.toLocaleLowerCase('vi'));
  });
  if(sortSelect.value==='title')list.sort((a,b)=>a.title.localeCompare(b.title,'vi'));
  if(sortSelect.value==='author')list.sort((a,b)=>a.author.localeCompare(b.author,'vi'));
  grid.innerHTML=list.map(book=>`<article class="book-card">
    <div class="book-visual"><span class="book-category">${book.categoryLabel}</span><button class="book-save ${saved.has(book.id)?'saved':''}" data-save="${book.id}" aria-label="${saved.has(book.id)?'Bỏ lưu':'Lưu'} ${book.title}">${saved.has(book.id)?'♥':'♡'}</button>
      <div class="mini-book"><div class="mini-cover ${book.cover}"><small>SHELF SELECTS</small><b>${book.coverTitle.replaceAll('\n','<br>')}</b><span>${book.coverSub}</span><i>${book.coverNote}</i></div></div>
    </div><div class="book-meta"><h3>${book.title}</h3><p class="book-author">${book.author}</p><div class="book-bottom"><span class="book-tag">${book.tag}</span><button class="book-detail" data-detail="${book.id}">Xem giới thiệu ↗</button></div></div>
  </article>`).join('');
  emptyState.hidden=list.length!==0;
  grid.hidden=list.length===0;
  resultCount.textContent=`Đang hiển thị ${list.length} / ${books.length} đầu sách`;
}
filterRow.addEventListener('click',event=>{
  const button=event.target.closest('[data-category]');if(!button)return;
  activeCategory=button.dataset.category;
  filterRow.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip===button));
  renderBooks();
});
searchInput.addEventListener('input',()=>{query=searchInput.value.trim();renderBooks()});
sortSelect.addEventListener('change',renderBooks);
grid.addEventListener('click',event=>{
  const save=event.target.closest('[data-save]');
  if(save){const id=Number(save.dataset.save);saved.has(id)?saved.delete(id):saved.add(id);renderBooks();showToast(saved.has(id)?'Đã lưu sách vào danh sách yêu thích.':'Đã bỏ sách khỏi danh sách yêu thích.');return;}
  const detail=event.target.closest('[data-detail]');
  if(detail){const book=books.find(item=>item.id===Number(detail.dataset.detail));showToast(`${book.title} — ${book.author}. Chức năng mượn sách sẽ được phát triển ở Sprint tiếp theo.`)}
});
document.getElementById('resetFilters').addEventListener('click',()=>{query='';searchInput.value='';activeCategory='all';sortSelect.value='featured';filterRow.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.category==='all'));renderBooks()});
document.querySelectorAll('[data-jump-category]').forEach(link=>link.addEventListener('click',()=>{activeCategory=link.dataset.jumpCategory;filterRow.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.category===activeCategory));renderBooks()}));
let toastTimer;function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
const menuToggle=document.getElementById('menuToggle');const mobileNav=document.getElementById('mobileNav');
menuToggle.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open))});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.classList.remove('open');menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
window.addEventListener('scroll',()=>document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>12));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(element=>observer.observe(element));
window.addEventListener('load',()=>{document.querySelectorAll('.hero-copy,.hero-art').forEach((element,index)=>setTimeout(()=>element.classList.add('visible'),120+index*160))});
renderBooks();
