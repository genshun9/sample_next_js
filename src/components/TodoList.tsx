'use client'

import { Todo } from '@/models/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  initialTodos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export const TodoList = ({ initialTodos, onToggle, onDelete, onEdit }: TodoListProps) => {
  // 統計情報
  const stats = {
    total: initialTodos.length,
    active: initialTodos.filter(todo => !todo.completed).length,
    completed: initialTodos.filter(todo => todo.completed).length,
  }

  return (
    <div className="space-y-6">
      {/* 統計情報 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-600">総数</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{stats.active}</p>
            <p className="text-sm text-gray-600">未完了</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-600">完了</p>
          </div>
        </div>
      </div>

      {/* TODO一覧 */}
      <div className="space-y-3">
        {initialTodos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">TODOがありません</p>
          </div>
        ) : (
          initialTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}
