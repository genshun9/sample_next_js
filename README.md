# sample_next_js
create-next-appで作ったサンプルnext.jsアプリ
view部分はAIに頑張ってもらった

## 手順

```sh
npx create-next-app@latest
```

## 実装時のメモ
- ファイル名
    - ReactのComponentはパスカルケース(例:CreateTodoComponent.tsx)が多かった記憶。
    - next.jsもしくは現在の主流はケバブケース(例:create-todo-component.tsx)なのかな？
    - 大文字小文字の差分周りが面倒だったし、今回はケバブケースに統一。
- ディレクトリ構成
    - routerについてはAppRouterとPageRouterの2種類存在。今回はAppRouterを使用。
    - rootは `app/layout.tsx` が相当。RootLayoutとして<html>と<body>を返却する。
    - 静的ファイルは `public` 配下に置く。
- コロケーションについて
    - appディレクトリの入れ子構造 = ルート構造となる。
    - rootにファイル追加 + 返却できるもののみが公開アクセスされるので、誤ってルーティングされることはないらしい。
    - アンスコ始まりディレクトリはプライベートフォルダ扱い。
    - ディレクトリを `()` で囲むとURLに含まれないことを示せる。
        - これ便利そう！ディレクトリ構造=パス構造になっちゃうので、そうでない分け方をしたい際はやってみる
- クライアントコンポーネントとサーバーコンポーネントについて
    - CSR
        - 実行環境はReactと同じくブラウザ
        - 指定方法は `user client` を明示する
        - 他、Reactと意識することは変わらない
    - SSC
        - 実行環境がNode.js
        - 指定方法はデフォルト
        - bundle size削減やDB周りの適応時に使えそう
    - 他
        - Server → Clientへのprops橋渡しが可能
        - Client → Serverの直接importは不可
- インポートのパスエイリアス
    - `tsconfig.json` の `compilerOptions.baseUrl` や `compilerOptions.pahts` を使うことでimportのパスをわかりやす出来る
    - 具体例
    ```ts
    // 設定前
    import { Button } from '../../../components/button'
    // 設定後
    import { Button } from '@/components/button'
    ```
    - configの実装例
    ```json
    {
        "compilerOptions": {
            "baseUrl": "src/",
            "paths": {
            "@/styles/*": ["styles/*"],
            "@/components/*": ["components/*"]
            }
        }
    }
    ```

## 全体設計
### 機能
- TODOの作成/編集/削除
- 永続化はlocalStorageにて

### Next.js App Router
- Route Groups: `(dashboard)` というディレクトリを切るが、パスには出てこない
- Dynamic Routes: `[id]` という動的ページ生成(パスが都度変わるイメージ)
- Server/Client Component: localStorageとのやり取りはClient Componentを使用

### ディレクトリ構成

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Route (Server Component)
│   ├── page.tsx                  # Home (Server Component)
│   └── (dashboard)/              # Route Group (URLに含まれない)
│       └── todos/
│           ├── page.tsx          # TODO一覧ページ (Server Component)
│           ├── TodoListPage.tsx  # 一覧表示 (Client Component)
│           ├── new/
│           │   ├── page.tsx      # 作成ページ (Server Component)
│           │   └── TodoCreateForm.tsx  # 作成フォーム (Client Component)
│           └── [id]/             # Dynamic Route
│               ├── page.tsx      # 編集ページ (Server Component)
│               ├── TodoEditPage.tsx    # 編集ページ (Client Component)
│               └── not-found.tsx # 404ページ
│
├── models/                       # インターフェース周り
│   ├── todo.ts                   # Todo型
│   └── repository.ts             # Repository抽象インターフェース
│
├── repositories/                 # データアクセス層
│   └── todo-local-storage.ts     # localStoragの実装
│
├── hooks/                        # React Hooks層
│   └── use-todos.ts              # カスタムフック
│
└── components/                   # コンポーネント層
    ├── ui/
    │   └── Button.tsx            # 汎用コンポーネント
    ├── TodoList.tsx              # TODO一覧表示
    ├── TodoItem.tsx              # 個別TODO表示
    └── TodoForm.tsx              # TODO作成・編集フォーム
```

### 具体の実装

#### Server/Client Components

```typescript
// server component
export default function TodosPage() {
  return (
    <div>
      <h1>TODO一覧</h1>  {/* 静的ヘッダー */}
      <TodoListPage />  {/* 動的コンテンツ */}
    </div>
  )
}

// Client Components
'use client'
export const TodoListPage = () => {
  const { todos, createTodo } = useTodos() // localStorage操作
}
```
