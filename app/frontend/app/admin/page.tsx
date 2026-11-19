import type { Metadata } from 'next'
import { AdminDashboardPage } from '@/components/admin-dashboard-page'

export const metadata: Metadata = {
  title: 'Quản trị — Shelf',
  description: 'Tổng quan hoạt động và quản lý thư viện cộng đồng Shelf.',
}

export default function AdminPage() {
  return <AdminDashboardPage />
}
