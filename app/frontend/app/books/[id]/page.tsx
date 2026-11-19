import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookDetailPage } from '@/components/book-detail-page'
import { demoBooks } from '@/lib/books'

type BookRouteProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: BookRouteProps): Promise<Metadata> {
  const { id } = await params
  const book = demoBooks.find((item) => item.id === id)
  return {
    title: book ? `${book.title} — Shelf` : 'Không tìm thấy sách — Shelf',
    description: book?.description ?? 'Khám phá kho sách cộng đồng Shelf.',
  }
}

export default async function BookDetailsPage({ params }: BookRouteProps) {
  const { id } = await params
  const book = demoBooks.find((item) => item.id === id)
  if (!book) notFound()
  return <BookDetailPage book={book} />
}
