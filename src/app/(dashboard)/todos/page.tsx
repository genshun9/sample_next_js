import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TodoListPage } from '@/app/(dashboard)/todos/TodoListPage'

/**
 * TODO一覧ページ（Server Component）
 * 静的コンテンツのみを提供し、動的なTODO操作はクライアントコンポーネントで処理
 */
export default function TodosPage() {
  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TODO一覧</h1>
          <p className="text-gray-600 mt-1">あなたのタスクを管理しましょう</p>
        </div>
        <Link href="/todos/new">
          <Button>新しいTODOを作成</Button>
        </Link>
      </div>

      {/* TODOリスト（Client Component） */}
      <TodoListPage />
    </div>
  )
}
