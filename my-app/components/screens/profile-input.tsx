'use client'

import { useState } from 'react'
import { UserProfile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ProfileInputProps {
  onNext: (profile: UserProfile) => void
  onBack: () => void
}

export default function ProfileInput({ onNext, onBack }: ProfileInputProps) {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [experience, setExperience] = useState<UserProfile['experience']>('beginner')
  const [goal, setGoal] = useState<UserProfile['goal']>('maintain')

  const handleSubmit = () => {
    if (age && weight) {
      onNext({
        age: parseInt(age),
        weight: parseInt(weight),
        experience,
        goal
      })
    }
  }

  const isValid = age && weight && parseInt(age) > 0 && parseInt(weight) > 0

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">プロフィール入力</h2>
          <p className="text-muted-foreground">
            あなたの情報を入力してください
          </p>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
            <CardDescription>
              最適なワークアウトプランを作成するための情報です
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">年齢</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="例: 25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">体重 (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="例: 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                  max="300"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>経験レベル</Label>
              <RadioGroup value={experience} onValueChange={(v) => setExperience(v as UserProfile['experience'])}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="font-normal cursor-pointer">
                    初心者（トレーニング経験1年未満）
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="font-normal cursor-pointer">
                    中級者（トレーニング経験1-3年）
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="font-normal cursor-pointer">
                    上級者（トレーニング経験3年以上）
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>目標</Label>
              <RadioGroup value={goal} onValueChange={(v) => setGoal(v as UserProfile['goal'])}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lose_weight" id="lose_weight" />
                  <Label htmlFor="lose_weight" className="font-normal cursor-pointer">
                    減量・ダイエット
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscle_gain" id="muscle_gain" />
                  <Label htmlFor="muscle_gain" className="font-normal cursor-pointer">
                    筋肥大・バルクアップ
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain" id="maintain" />
                  <Label htmlFor="maintain" className="font-normal cursor-pointer">
                    現状維持・健康管理
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex items-center gap-2"
          >
            次へ
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}