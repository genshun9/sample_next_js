import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome ToDo App
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Next.jsによるサンプルアプリです。<br />
      </p>
      
      <div className="space-y-4">
        <div>
          <Link href="/todos">
            <Button size="lg" className="mr-4">
              TODO一覧を見る
            </Button>
          </Link>
          <Link href="/todos/new">
            <Button variant="outline" size="lg">
              新しいTODOを作成
            </Button>
          </Link>
        </div>
        {/* 今回使ったNext.js機能を表示 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">🗂️ Route Groups</h3>
            <p className="text-gray-600 text-sm">
              <code>(dashboard)</code> を使用してURLに含まれないグループ化を実現
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">🔗 Dynamic Routes</h3>
            <p className="text-gray-600 text-sm">
              <code>[id]</code> を使用してTODO詳細ページを動的生成
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">⚡ Server/Client Components</h3>
            <p className="text-gray-600 text-sm">
              CSR/SSRを適切に使い分けてみる
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
