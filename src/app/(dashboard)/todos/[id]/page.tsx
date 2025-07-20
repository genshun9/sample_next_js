import Link from 'next/link'
import { TodoEditPage } from '@/app/(dashboard)/todos/[id]/TodoEditPage'

interface TodoDetailPageProps {
  params: Promise<{ id: string }>
}

/**
 * TODO詳細・編集ページ（Server Component）
 * 静的コンテンツのみを提供し、動的なTODO操作はクライアントコンポーネントで処理
 */
export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params

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
        <h1 className="text-2xl font-bold text-gray-900 mt-2">TODOを編集</h1>
      </div>

      {/* TODO編集フォーム（Client Component） */}
      <TodoEditPage todoId={id} />
    </div>
  )
}
