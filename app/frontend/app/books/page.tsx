import type { Metadata } from 'next'
import { CatalogPage } from '@/components/catalog-page'

export const metadata: Metadata = {
  title: 'Kho sách — Shelf',
  description: 'Khám phá các đầu sách cộng đồng Shelf yêu thích theo chủ đề và tác giả.',
}

export default function BooksPage() {
  return <CatalogPage />
}
