# sample_next_js
create-next-appで作ったサンプルnext.jsアプリ

## 手順

```sh
npx create-next-app@latest
```

## メモ
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
