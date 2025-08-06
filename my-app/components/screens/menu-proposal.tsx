'use client'

import { useState } from 'react'
import { WorkoutPlan } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Play, Edit2, Check, X } from 'lucide-react'

interface MenuProposalProps {
  workoutPlan: WorkoutPlan[]
  onConfirm: (plan: WorkoutPlan[]) => void
  onBack: () => void
}

export default function MenuProposal({ workoutPlan, onConfirm, onBack }: MenuProposalProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editedPlan, setEditedPlan] = useState<WorkoutPlan[]>(workoutPlan)
  const [editValues, setEditValues] = useState<Partial<WorkoutPlan>>({})

  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditValues({
      weight: editedPlan[index].weight,
      reps: editedPlan[index].reps,
      sets: editedPlan[index].sets,
      restTime: editedPlan[index].restTime
    })
  }

  const saveEdit = () => {
    if (editingIndex !== null) {
      const updated = [...editedPlan]
      updated[editingIndex] = {
        ...updated[editingIndex],
        ...editValues
      }
      setEditedPlan(updated)
      setEditingIndex(null)
      setEditValues({})
    }
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValues({})
  }

  const handleConfirm = () => {
    onConfirm(editedPlan)
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">ワークアウトメニュー</h2>
          <p className="text-muted-foreground">
            提案されたメニューを確認・調整してください
          </p>
        </div>

        <div className="space-y-4 flex-1">
          {editedPlan.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{item.machineName}</CardTitle>
                    <CardDescription>部位: {item.part}</CardDescription>
                  </div>
                  {editingIndex !== index && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(index)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  {editingIndex === index && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={saveEdit}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingIndex === index ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`weight-${index}`}>重量 (kg)</Label>
                      <Input
                        id={`weight-${index}`}
                        type="number"
                        value={editValues.weight}
                        onChange={(e) => setEditValues({...editValues, weight: parseInt(e.target.value)})}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`reps-${index}`}>回数</Label>
                      <Input
                        id={`reps-${index}`}
                        type="number"
                        value={editValues.reps}
                        onChange={(e) => setEditValues({...editValues, reps: parseInt(e.target.value)})}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`sets-${index}`}>セット</Label>
                      <Input
                        id={`sets-${index}`}
                        type="number"
                        value={editValues.sets}
                        onChange={(e) => setEditValues({...editValues, sets: parseInt(e.target.value)})}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rest-${index}`}>休憩 (秒)</Label>
                      <Input
                        id={`rest-${index}`}
                        type="number"
                        value={editValues.restTime}
                        onChange={(e) => setEditValues({...editValues, restTime: parseInt(e.target.value)})}
                        min="1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">重量:</span>
                      <span className="font-semibold">{item.weight}kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">回数:</span>
                      <span className="font-semibold">{item.reps}回</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">セット:</span>
                      <span className="font-semibold">{item.sets}セット</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">休憩:</span>
                      <span className="font-semibold">{item.restTime}秒</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

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
            onClick={handleConfirm}
            className="flex items-center gap-2"
            size="lg"
          >
            <Play className="h-4 w-4" />
            ワークアウト開始
          </Button>
        </div>
      </div>
    </div>
  )
}