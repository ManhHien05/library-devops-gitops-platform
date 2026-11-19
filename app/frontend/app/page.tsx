import { LibraryApp } from '@/components/library-app'
import { demoBooks } from '@/lib/books'

export default function HomePage() {
  return <LibraryApp initialBooks={demoBooks} />
}
