'use client'

import { useState } from 'react'
import { CreateTodoInput } from '@/models/todo'
import { Button } from '@/components/ui/Button'

interface TodoFormProps {
  onSubmit: (input: CreateTodoInput) => void
  onCancel?: () => void
  isLoading?: boolean
  initialValue?: string
  submitLabel?: string
}

export const TodoForm = ({ 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  initialValue = '',
  submitLabel = '作成'
}: TodoFormProps) => {
  const [title, setTitle] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({ title: title.trim() })
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          TODOタイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="やることを入力してください"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="flex space-x-3">
        <Button 
          type="submit" 
          disabled={isLoading || !title.trim()}
          className="flex-1"
        >
          {isLoading ? '処理中...' : submitLabel}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            キャンセル
          </Button>
        )}
      </div>
    </form>
  )
}
