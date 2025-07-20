'use client'

import { useRouter } from 'next/navigation'
import { TodoForm } from '@/components/TodoForm'
import { useTodos } from '@/hooks/use-todos'
import { CreateTodoInput } from '@/models/todo'

/**
 * TODO作成フォームのクライアントコンポーネント
 */
export const TodoCreateForm = () => {
  const router = useRouter()
  const { createTodo, loading, error } = useTodos()

  const handleSubmit = async (input: CreateTodoInput) => {
    try {
      await createTodo(input)
      // 成功したらTODO一覧ページに遷移
      router.push('/todos')
    } catch (error) {
      console.error('TODO作成エラー:', error)
    }
  }

  const handleCancel = () => {
    router.push('/todos')
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">エラーが発生しました: {error}</p>
        </div>
      )}
      
      <TodoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={loading}
        submitLabel="作成"
      />
    </div>
  )
}
