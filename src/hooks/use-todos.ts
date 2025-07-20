import { useState, useEffect, useCallback, useMemo } from 'react'
import { Todo, CreateTodoInput, UpdateTodoInput, TodoID } from '@/models/todo'
import { TodoLocalStorage } from '@/repositories/todo-local-storage'

/**
 * TODO操作のカスタムフック
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // TodoLocalStorage のインスタンスを一度だけ作成
  const todoRepository = useMemo(() => new TodoLocalStorage(), [])

  /**
   * TODOリストを取得
   */
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTodos = await todoRepository.findAll()
      setTodos(fetchedTodos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'TODOの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [todoRepository])

  /**
   * TODOを作成
   */
  const createTodo = useCallback(async (input: CreateTodoInput) => {
    try {
      setError(null)
      const newTodo = await todoRepository.create(input)
      await fetchTodos() // リストを再取得
      return newTodo
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'TODOの作成に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [todoRepository, fetchTodos])

  /**
   * TODOを更新
   */
  const updateTodo = useCallback(async (id: TodoID, input: UpdateTodoInput) => {
    try {
      setError(null)
      const updatedTodo = await todoRepository.update(id, input)
      await fetchTodos() // リストを再取得
      return updatedTodo
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'TODOの更新に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [todoRepository, fetchTodos])

  /**
   * TODOを削除
   */
  const deleteTodo = useCallback(async (id: TodoID) => {
    try {
      setError(null)
      await todoRepository.delete(id)
      await fetchTodos() // リストを再取得
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'TODOの削除に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [todoRepository, fetchTodos])

  /**
   * TODOの完了状態を切り替え
   */
  const toggleTodo = useCallback(async (id: TodoID) => {
    try {
      setError(null)
      // 現在のTODOを取得
      const currentTodo = todos.find(todo => todo.id === id)
      if (!currentTodo) {
        throw new Error('TODOが見つかりません')
      }
      
      // 完了状態を反転してupdate
      const updatedTodo = await todoRepository.update(id, { completed: !currentTodo.completed })
      await fetchTodos() // リストを再取得
      return updatedTodo
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'TODOの更新に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [todoRepository, fetchTodos, todos])

  /**
   * 初回レンダリング時にTODOを取得
   */
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  /**
   * 統計情報を計算
   */
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  }

  return {
    todos,
    loading,
    error,
    stats,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  }
}
