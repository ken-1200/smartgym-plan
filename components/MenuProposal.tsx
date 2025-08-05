import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Dumbbell, RotateCcw, Clock, CheckCircle, Play, Settings } from "lucide-react";
import { WorkoutPlan, RestTimeSettings, loadRestTimeSettings, saveRestTimeSettings, formatTime } from "../utils/machineData";
import { RestTimeSelector } from "./RestTimeSelector";

interface MenuProposalProps {
  workoutPlan: WorkoutPlan[];
  userGoal?: string;
  onBack: () => void;
  onRestart: () => void;
  onStartWorkout: (updatedPlan: WorkoutPlan[]) => void;
}

export function MenuProposal({ workoutPlan, userGoal = 'maintain', onBack, onRestart, onStartWorkout }: MenuProposalProps) {
  const [customRestTimes, setCustomRestTimes] = useState<RestTimeSettings>({});
  const [updatedPlan, setUpdatedPlan] = useState<WorkoutPlan[]>(workoutPlan);

  // ローカルストレージから休憩時間設定を読み込み
  useEffect(() => {
    const savedRestTimes = loadRestTimeSettings();
    setCustomRestTimes(savedRestTimes);
    
    // プランに保存された休憩時間を適用
    const planWithRestTimes = workoutPlan.map(plan => ({
      ...plan,
      restTime: savedRestTimes[plan.machineId] || plan.restTime || 90
    }));
    
    setUpdatedPlan(planWithRestTimes);
  }, [workoutPlan]);

  // 休憩時間の変更ハンドラー
  const handleRestTimeChange = (machineId: string, restTime: number) => {
    const newRestTimes = { ...customRestTimes, [machineId]: restTime };
    setCustomRestTimes(newRestTimes);
    saveRestTimeSettings(newRestTimes);
    
    // プランを更新
    const newPlan = updatedPlan.map(plan => 
      plan.machineId === machineId 
        ? { ...plan, restTime }
        : plan
    );
    setUpdatedPlan(newPlan);
  };

  // 総推定時間を計算（セット数 × 休憩時間 + 実行時間）
  const calculateEstimatedTime = (): number => {
    const executionTime = updatedPlan.reduce((total, plan) => {
      // セット実行時間: 30秒/セット と仮定
      const setTime = plan.sets * 0.5;
      // 休憩時間: (セット数 - 1) × 休憩時間
      const restTime = (plan.sets - 1) * (plan.restTime || 90) / 60;
      return total + setTime + restTime;
    }, 0);
    
    // エクササイズ間の移動時間: 1分/エクササイズ
    const transitionTime = Math.max(0, updatedPlan.length - 1) * 1;
    
    return Math.round(executionTime + transitionTime);
  };

  const estimatedTime = calculateEstimatedTime();

  const handleStartWorkout = () => {
    onStartWorkout(updatedPlan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
      {/* Background glass layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
      <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-gradient-radial from-primary/6 to-transparent rounded-full blur-3xl" />
      
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
            <h1 className="text-headline text-foreground ml-4">ワークアウト</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 relative">
        {/* Success Header */}
        <Card className="mb-6 border-0 glass-morphism-strong glass-transition relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-70" />
          <CardContent className="p-6 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 glass-morphism mb-4 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-sm" />
              <CheckCircle className="w-8 h-8 text-primary relative z-10" />
            </div>
            <h2 className="text-title text-primary mb-2">
              メニューが完成！
            </h2>
            <p className="text-body text-primary/80">
              {updatedPlan.length}種目のトレーニングプランです
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-0 glass-card glass-transition glass-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 glass-accent rounded-full flex items-center justify-center">
                  <Dumbbell className="w-3 h-3 text-primary" />
                </div>
                <span className="text-headline text-card-foreground">{updatedPlan.length}</span>
              </div>
              <p className="text-caption text-muted-foreground">種目</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 glass-card glass-transition glass-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 glass-accent rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3 text-primary" />
                </div>
                <span className="text-headline text-card-foreground">{estimatedTime}</span>
              </div>
              <p className="text-caption text-muted-foreground">分</p>
            </CardContent>
          </Card>

          <Card className="border-0 glass-card glass-transition glass-hover">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 glass-accent rounded-full flex items-center justify-center">
                  <Settings className="w-3 h-3 text-primary" />
                </div>
                <span className="text-headline text-card-foreground">
                  {updatedPlan.reduce((total, plan) => total + (plan.sets || 0), 0)}
                </span>
              </div>
              <p className="text-caption text-muted-foreground">セット</p>
            </CardContent>
          </Card>
        </div>

        {/* Workout Plan */}
        <div className="space-y-4 mb-8">
          {updatedPlan.map((plan, index) => (
            <Card key={plan.machineId} className="border-0 glass-morphism glass-transition glass-hover relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent opacity-50" />
              <CardHeader className="pb-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-morphism rounded-2xl flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-sm" />
                      <span className="text-caption-2 text-primary font-semibold relative z-10">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-headline text-card-foreground">
                        {plan.machineName}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge variant="secondary" className="glass border-0 text-secondary-foreground text-caption">
                    {plan.part}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                {/* 重量・回数・セット数 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                    <div className="text-title text-primary mb-1 relative z-10">
                      {plan.weight}
                    </div>
                    <div className="text-caption-2 text-muted-foreground font-medium relative z-10">重量 (kg)</div>
                  </div>
                  <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                    <div className="text-title text-primary mb-1 relative z-10">
                      {plan.reps}
                    </div>
                    <div className="text-caption-2 text-muted-foreground font-medium relative z-10">回数</div>
                  </div>
                  <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                    <div className="text-title text-primary mb-1 relative z-10">
                      {plan.sets}
                    </div>
                    <div className="text-caption-2 text-muted-foreground font-medium relative z-10">セット</div>
                  </div>
                </div>

                {/* 休憩時間設定 */}
                <RestTimeSelector
                  machineId={plan.machineId}
                  machineName={plan.machineName}
                  currentRestTime={plan.restTime || 90}
                  goal={userGoal}
                  onRestTimeChange={handleRestTimeChange}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleStartWorkout}
            className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <Play className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">ワークアウトを開始</span>
          </Button>
          
          <Button 
            onClick={onRestart}
            variant="outline" 
            className="w-full touch-target glass border-0 text-primary glass-transition glass-hover"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            新しいメニューを作成
          </Button>
        </div>

        {/* Footer Notice */}
        <Card className="mt-6 border-0 glass">
          <CardContent className="p-4 text-center">
            <p className="text-caption text-muted-foreground">
              💡 重量・休憩時間は目安です。体調や筋力に合わせて調整してください
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}