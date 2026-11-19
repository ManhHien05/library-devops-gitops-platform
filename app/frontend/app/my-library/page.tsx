import type { Metadata } from 'next'
import { MyLibraryPage } from '@/components/my-library-page'

export const metadata: Metadata = {
  title: 'Kệ của tôi — Shelf',
  description: 'Theo dõi những cuốn sách bạn đang đọc, muốn đọc và đã đọc.',
}

export default function LibraryPage() {
  return <MyLibraryPage />
}
