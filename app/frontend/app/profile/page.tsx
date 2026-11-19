import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile-page'

export const metadata: Metadata = {
  title: 'Hồ sơ thành viên — Shelf',
  description: 'Thông tin cá nhân và chủ đề đọc yêu thích trên Shelf.',
}

export default function UserProfilePage() {
  return <ProfilePage />
}
