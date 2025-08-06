import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Dumbbell, Target, Timer } from 'lucide-react'

interface TopScreenProps {
  onStart: () => void
}

export default function TopScreen({ onStart }: TopScreenProps) {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            SmartGym Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            あなただけのパーソナライズされたワークアウトプランを作成
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Dumbbell className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>マシン選択</CardTitle>
              <CardDescription>
                利用可能なジムマシンを選択してください
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>目標設定</CardTitle>
              <CardDescription>
                あなたの経験レベルと目標を入力します
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Activity className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>カスタムメニュー</CardTitle>
              <CardDescription>
                最適な重量、回数、セット数を自動計算
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Timer className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>ワークアウト実行</CardTitle>
              <CardDescription>
                タイマー付きでトレーニングを管理
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={onStart}
            className="text-lg px-8 py-6"
          >
            ワークアウトを開始
          </Button>
        </div>
      </div>
    </div>
  )
}