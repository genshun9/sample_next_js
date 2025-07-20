'use client'

import { Todo, TodoID } from '@/models/todo'
import { Button } from '@/components/ui/Button'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: TodoID) => void
  onDelete: (id: TodoID) => void
  onEdit: (id: TodoID) => void
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            作成: {todo.createdAt.toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(todo.id)}
        >
          編集
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(todo.id)}
        >
          削除
        </Button>
      </div>
    </div>
  )
}
