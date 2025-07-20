import { Todo, CreateTodoInput, UpdateTodoInput, TodoID } from './todo'

/**
 * データアクセスの抽象化
 */
export interface TodoRepository {
  findAll(): Promise<Todo[]>
  findById(id: TodoID): Promise<Todo | null>
  create(input: CreateTodoInput): Promise<Todo>
  update(id: TodoID, input: UpdateTodoInput): Promise<Todo>
  delete(id: TodoID): Promise<void>
}
