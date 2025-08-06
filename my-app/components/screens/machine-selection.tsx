'use client'

import { useState } from 'react'
import { Machine } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface MachineSelectionProps {
  machines: Machine[]
  onNext: (machines: Machine[]) => void
  onBack: () => void
}

export default function MachineSelection({ machines, onNext, onBack }: MachineSelectionProps) {
  const [selectedMachineIds, setSelectedMachineIds] = useState<string[]>([])

  const toggleMachine = (machineId: string) => {
    setSelectedMachineIds(prev => 
      prev.includes(machineId) 
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    )
  }

  const handleNext = () => {
    const selected = machines.filter(m => selectedMachineIds.includes(m.id))
    if (selected.length > 0) {
      onNext(selected)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">マシン選択</h2>
          <p className="text-muted-foreground">
            利用可能なジムマシンを選択してください（複数選択可）
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          {machines.map(machine => (
            <Card 
              key={machine.id}
              className={`cursor-pointer transition-all ${
                selectedMachineIds.includes(machine.id) 
                  ? 'ring-2 ring-primary' 
                  : ''
              }`}
              onClick={() => toggleMachine(machine.id)}
            >
              <CardHeader className="flex flex-row items-center space-x-4">
                <Checkbox 
                  checked={selectedMachineIds.includes(machine.id)}
                  onCheckedChange={() => toggleMachine(machine.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{machine.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>部位: {machine.part}</p>
                  <p>重量範囲: {machine.minWeight}kg - {machine.maxWeight}kg</p>
                </div>
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
            onClick={handleNext}
            disabled={selectedMachineIds.length === 0}
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