import { TodoRepository } from '@/models/repository'
import { Todo, CreateTodoInput, UpdateTodoInput, TodoID } from '@/models/todo'

/**
 * localStorage を使用したTODOリポジトリの実装
 */
export class TodoLocalStorage implements TodoRepository {
  private readonly STORAGE_KEY = 'todos'

  /**
   * 全てのTODOを取得
   */
  async findAll(): Promise<Todo[]> {
    return this.getTodosFromLocalStorage()
  }

  /**
   * IDでTODOを取得
   */
  async findById(id: TodoID): Promise<Todo | null> {
    const todos = this.getTodosFromLocalStorage()
    return todos.find(todo => todo.id === id) || null
  }

  /**
   * TODOを作成
   */
  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = this.getTodosFromLocalStorage()
    const now = new Date()
    const newTodo: Todo = {
      id: this.generateTodoId(),
      title: input.title.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    todos.push(newTodo)
    this.saveTodosToLocalStorage(todos)
    
    return newTodo
  }

  /**
   * TODOを更新
   */
  async update(id: TodoID, input: UpdateTodoInput): Promise<Todo> {
    const todos = this.getTodosFromLocalStorage()
    const targetTodo = todos.find(todo => todo.id === id)
    
    if (!targetTodo) {
      throw new Error(`Todo ID:${id} not found`)
    }

    const todoIndex = todos.indexOf(targetTodo)
    const updatedTodo: Todo = {
      ...targetTodo,
      ...input,
      updatedAt: new Date(),
    }

    todos[todoIndex] = updatedTodo
    this.saveTodosToLocalStorage(todos)
    
    return updatedTodo
  }

  /**
   * TODOを削除
   */
  async delete(id: TodoID): Promise<void> {
    const todos = this.getTodosFromLocalStorage()
    const targetTodo = todos.find(todo => todo.id === id)
    
    if (!targetTodo) {
      throw new Error(`Todo ID:${id} not found`)
    }

    const filteredTodos = todos.filter(todo => todo.id !== id)
    this.saveTodosToLocalStorage(filteredTodos)
  }

  /**
   * localStorage から読み込み
   */
  private getTodosFromLocalStorage(): Todo[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) {
        return []
      }

      const todos = JSON.parse(stored) as Todo[]
      
      return todos.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }))
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error)
      return []
    }
  }

  /**
   * localStorage への書き込み
   */
  private saveTodosToLocalStorage(todos: Todo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error)
    }
  }

  /**
   * ユニークなTODO IDを生成
   */
  private generateTodoId(): TodoID {
    return `todo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }
}
