import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Clock, Timer, RotateCcw } from "lucide-react";
import { REST_TIME_PRESETS, MACHINES, getRecommendedRestTime, formatTime } from "../utils/machineData";

interface RestTimeSelectorProps {
  machineId: string;
  machineName: string;
  currentRestTime: number;
  goal?: string;
  onRestTimeChange: (machineId: string, restTime: number) => void;
}

export function RestTimeSelector({ 
  machineId, 
  machineName, 
  currentRestTime, 
  goal = 'maintain',
  onRestTimeChange 
}: RestTimeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(currentRestTime);
  
  const machine = MACHINES[machineId];
  const defaultTime = machine?.default_rest_time || 90;
  const recommendedTime = getRecommendedRestTime(machineId, goal);

  const handleApply = () => {
    onRestTimeChange(machineId, selectedTime);
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedTime(defaultTime);
  };

  const handleRecommended = () => {
    setSelectedTime(recommendedTime);
  };

  const getTimeCategory = (seconds: number) => {
    if (seconds <= 45) return { label: '短時間', color: 'bg-red-500/10 text-red-600 border-red-200' };
    if (seconds <= 90) return { label: '標準', color: 'bg-green-500/10 text-green-600 border-green-200' };
    return { label: '長時間', color: 'bg-blue-500/10 text-blue-600 border-blue-200' };
  };

  const category = getTimeCategory(currentRestTime);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-3 justify-start glass-transition glass-hover border-0"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 glass-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-body font-medium text-card-foreground">
                  {formatTime(currentRestTime)}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-caption-2 px-2 py-0.5 border ${category.color}`}
                >
                  {category.label}
                </Badge>
              </div>
              <p className="text-caption text-muted-foreground">
                セット間の休憩時間
              </p>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md glass-morphism-strong border-0 p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-headline text-card-foreground flex items-center gap-3">
              <div className="w-8 h-8 glass-accent rounded-xl flex items-center justify-center">
                <Timer className="w-4 h-4 text-primary" />
              </div>
              休憩時間の設定
            </DialogTitle>
            <DialogDescription className="text-caption text-muted-foreground">
              <span className="font-medium">{machineName}</span> のセット間休憩時間をカスタマイズできます。
            </DialogDescription>
          </DialogHeader>

          {/* Current Selection */}
          <div className="px-6 pb-4">
            <Card className="border-0 glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-body font-medium text-card-foreground mb-1">
                      現在の設定
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-headline text-primary">
                        {formatTime(selectedTime)}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-caption-2 px-2 py-0.5 border ${getTimeCategory(selectedTime).color}`}
                      >
                        {getTimeCategory(selectedTime).label}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-12 h-12 glass-accent rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRecommended}
                className="flex-1 glass-card border-0 glass-transition glass-hover"
              >
                <Timer className="w-4 h-4 mr-2" />
                推奨値
                <Badge variant="outline" className="ml-2 text-caption-2">
                  {formatTime(recommendedTime)}
                </Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex-1 glass-card border-0 glass-transition glass-hover"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                デフォルト
                <Badge variant="outline" className="ml-2 text-caption-2">
                  {formatTime(defaultTime)}
                </Badge>
              </Button>
            </div>
          </div>

          {/* Time Selection Grid */}
          <div className="px-6 pb-6">
            <h4 className="text-body font-medium text-card-foreground mb-3">
              時間を選択
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {REST_TIME_PRESETS.map((preset) => {
                const isSelected = selectedTime === preset.value;
                const presetCategory = getTimeCategory(preset.value);
                
                return (
                  <Button
                    key={preset.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(preset.value)}
                    className={`relative overflow-hidden border-0 glass-transition ${
                      isSelected 
                        ? 'glass-button text-primary-foreground' 
                        : 'glass-card glass-hover'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1 py-1">
                      <span className="text-body font-medium">
                        {preset.label}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-caption-2 px-1.5 py-0 border-0 ${
                          isSelected 
                            ? 'bg-white/20 text-white/80' 
                            : presetCategory.color
                        }`}
                      >
                        {presetCategory.label}
                      </Badge>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="px-6 pb-4">
            <Card className="border-0 glass">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-caption text-muted-foreground">
                      短時間：脂肪燃焼・持久力向上
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-caption text-muted-foreground">
                      標準：バランスの取れたトレーニング
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-caption text-muted-foreground">
                      長時間：筋肥大・筋力向上
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 glass-card border-0"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1 glass-button text-primary-foreground border-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">適用</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}