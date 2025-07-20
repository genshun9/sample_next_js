import { TodoCreateForm } from '@/app/(dashboard)/todos/new/TodoCreateForm'
import Link from 'next/link'

/**
 * TODO作成ページ（Server Component）
 */
export default function NewTodoPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* ページヘッダー */}
      <div>
        <Link 
          href="/todos" 
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← TODO一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">新しいTODOを作成</h1>
      </div>

      {/* TODO作成フォーム */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <TodoCreateForm />
      </div>
    </div>
  )
}
