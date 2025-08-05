import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { MACHINES } from "../utils/machineData";

interface MachineSelectionProps {
  onBack: () => void;
  onNext: (selectedMachines: string[]) => void;
}

export function MachineSelection({ onBack, onNext }: MachineSelectionProps) {
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);

  const handleMachineToggle = (machineId: string) => {
    setSelectedMachines(prev => 
      prev.includes(machineId) 
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const handleNext = () => {
    if (selectedMachines.length > 0) {
      onNext(selectedMachines);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
      {/* Background glass layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
      
      {/* Navigation Bar */}
      <div className="sticky top-0 z-30 glass-nav layer-3">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="touch-target -ml-3 glass rounded-full border-0 hover:glass-hover"
              size="sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-headline text-foreground ml-4">マシン選択</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 relative">
        {/* Instructions */}
        <Card className="mb-6 border-0 glass-card glass-transition">
          <CardContent className="p-6">
            <p className="text-body text-card-foreground leading-relaxed">
              通っているジムにあるマシンを選んでください。<br />
              選択したマシンだけでメニューを作成します。
            </p>
          </CardContent>
        </Card>

        {/* Machine List */}
        <div className="space-y-3 mb-8">
          {Object.values(MACHINES).map((machine) => {
            const isSelected = selectedMachines.includes(machine.id);
            
            return (
              <Card 
                key={machine.id} 
                className={`cursor-pointer glass-transition border-0 touch-target relative overflow-hidden ${
                  isSelected 
                    ? 'glass-morphism-strong' 
                    : 'glass-card glass-hover'
                }`}
                onClick={() => handleMachineToggle(machine.id)}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                )}
                <CardContent className="p-5 relative z-10">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => handleMachineToggle(machine.id)}
                      className="touch-target glass"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden ${
                          isSelected ? 'glass-morphism' : 'glass'
                        }`}>
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 blur-sm" />
                          )}
                          <Dumbbell className={`w-5 h-5 relative z-10 ${
                            isSelected ? 'text-primary' : 'text-primary/70'
                          }`} />
                        </div>
                        <h3 className="text-body font-medium text-card-foreground">
                          {machine.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 ml-13">
                        <span className="text-caption text-muted-foreground">
                          {machine.part}
                        </span>
                        <span className="text-caption-2 text-muted-foreground/60">•</span>
                        <span className="text-caption text-muted-foreground">
                          {machine.weight_range[0]}〜{machine.weight_range[1]}kg
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress indicator */}
        {selectedMachines.length > 0 && (
          <div className="mb-6">
            <Card className="border-0 glass-accent">
              <CardContent className="p-4 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg" />
                <p className="text-caption text-primary font-medium relative z-10">
                  {selectedMachines.length}台のマシンを選択済み
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Continue Button */}
        <Button 
          onClick={handleNext}
          disabled={selectedMachines.length === 0}
          className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10">次へ進む</span>
        </Button>
      </div>
    </div>
  );
}