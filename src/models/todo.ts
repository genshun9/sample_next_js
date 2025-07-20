/**
 * ID型定義
 */
export type TodoID = string

/**
 * TODOエンティティの型定義
 */
export interface Todo {
  id: TodoID
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * TODO作成
 */
export interface CreateTodoInput {
  title: string
}

/**
 * TODO更新
 */
export interface UpdateTodoInput {
  title?: string
  completed?: boolean
}
