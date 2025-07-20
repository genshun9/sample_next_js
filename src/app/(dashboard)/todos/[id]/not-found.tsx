import Link from 'next/link'
import { Button } from '@/components/ui/Button'

/**
 * TODO詳細ページの404エラーページ
 */
export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        TODOが見つかりません
      </h2>
      <p className="text-gray-600 mb-8">
        指定されたTODOは存在しないか、削除された可能性があります。
      </p>
      <Link href="/todos">
        <Button>TODO一覧に戻る</Button>
      </Link>
    </div>
  )
}
