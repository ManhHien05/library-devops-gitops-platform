import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
  title: 'Đăng nhập — Shelf',
  description: 'Đăng nhập vào cộng đồng đọc sách Shelf.',
}

export default function LoginPage() {
  return <AuthForm mode="sign-in" />
}
