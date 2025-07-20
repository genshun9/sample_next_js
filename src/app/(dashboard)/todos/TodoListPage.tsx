'use client'

import { useRouter } from 'next/navigation'
import { Todo, TodoID } from '@/models/todo'
import { TodoList } from '@/components/TodoList'
import { useTodos } from '@/hooks/use-todos'

/**
 * TODOリストページのクライアントコンポーネント
 * localStorageから直接データを取得してユーザーインタラクションを処理
 */
export const TodoListPage = () => {
  const router = useRouter()
  const { todos, updateTodo, deleteTodo, error, loading } = useTodos()

  // TODOの完了状態を切り替え
  const handleToggle = async (id: TodoID) => {
    try {
      const currentTodo = todos.find(todo => todo.id === id)
      if (currentTodo) {
        await updateTodo(id, { completed: !currentTodo.completed })
      }
    } catch (error) {
      console.error('TODO更新エラー:', error)
    }
  }

  // TODOを削除
  const handleDelete = async (id: TodoID) => {
    if (confirm('このTODOを削除しますか？')) {
      try {
        await deleteTodo(id)
      } catch (error) {
        console.error('TODO削除エラー:', error)
      }
    }
  }

  // TODO編集ページに遷移
  const handleEdit = (id: TodoID) => {
    router.push(`/todos/${id}`)
  }

  // ローディング表示
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    )
  }

  // エラー表示
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">エラーが発生しました: {error}</p>
      </div>
    )
  }

  return (
    <TodoList
      initialTodos={todos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  )
}
