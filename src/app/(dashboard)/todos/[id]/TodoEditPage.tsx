'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Todo, UpdateTodoInput, TodoID } from '@/models/todo'
import { TodoForm } from '@/components/TodoForm'
import { useTodos } from '@/hooks/use-todos'
import { TodoLocalStorage } from '@/repositories/todo-local-storage'

interface TodoEditPageProps {
  todoId: string
}

/**
 * TODO編集ページのクライアントコンポーネント
 * TODOデータの取得から編集まで全てクライアントで処理
 */
export const TodoEditPage = ({ todoId }: TodoEditPageProps) => {
  const router = useRouter()
  const { updateTodo, loading, error } = useTodos()
  const [todo, setTodo] = useState<Todo | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(true)

  // TODO詳細を取得
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsFetching(true)
        setFetchError(null)
        const todoRepository = new TodoLocalStorage()
        const fetchedTodo = await todoRepository.findById(todoId)
        
        if (!fetchedTodo) {
          setFetchError('TODOが見つかりません')
          return
        }
        
        setTodo(fetchedTodo)
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : 'TODOの取得に失敗しました')
      } finally {
        setIsFetching(false)
      }
    }

    fetchTodo()
  }, [todoId])

  const handleSubmit = async (input: { title: string }) => {
    if (!todo) return
    
    try {
      await updateTodo(todo.id, input)
      // 成功したらTODO一覧ページに遷移
      router.push('/todos')
    } catch (error) {
      console.error('TODO更新エラー:', error)
    }
  }

  const handleCancel = () => {
    router.push('/todos')
  }

  // ローディング表示
  if (isFetching) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  // TODO取得エラー表示
  if (fetchError) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">エラーが発生しました: {fetchError}</p>
        </div>
        <button
          onClick={handleCancel}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← TODO一覧に戻る
        </button>
      </div>
    )
  }

  // TODOが見つからない場合
  if (!todo) {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-600">TODOが見つかりません</p>
        </div>
        <button
          onClick={handleCancel}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← TODO一覧に戻る
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* TODO編集フォーム */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-600">エラーが発生しました: {error}</p>
          </div>
        )}
        
        <TodoForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={loading}
          initialValue={todo.title}
          submitLabel="更新"
        />
      </div>

      {/* TODO情報 */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h2 className="font-medium text-gray-900 mb-2">TODO情報</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p>ID: {todo.id}</p>
          <p>作成日: {todo.createdAt.toLocaleDateString('ja-JP')}</p>
          <p>更新日: {todo.updatedAt.toLocaleDateString('ja-JP')}</p>
          <p>状態: {todo.completed ? '完了' : '未完了'}</p>
        </div>
      </div>
    </div>
  )
}
