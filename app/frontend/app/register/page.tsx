import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
  title: 'Tham gia Shelf',
  description: 'Tạo tài khoản để khám phá và chia sẻ sách cùng cộng đồng Shelf.',
}

export default function RegisterPage() {
  return <AuthForm mode="sign-up" />
}
