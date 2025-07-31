import Link from "next/link"
import { BookOpen } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">EduManager</span>
      </Link>
    </div>
  )
}
