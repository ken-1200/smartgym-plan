import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Dumbbell,
  SkipForward,
  Timer,
  Trophy
} from "lucide-react";
import { 
  WorkoutPlan, 
  WorkoutSession as WorkoutSessionType,
  createWorkoutSession,
  REST_TIMES,
  formatTime,
  getWorkoutProgress
} from "../utils/machineData";

interface WorkoutSessionProps {
  workoutPlan: WorkoutPlan[];
  onBack: () => void;
  onComplete: () => void;
}

export function WorkoutSession({ workoutPlan, onBack, onComplete }: WorkoutSessionProps) {
  const [session, setSession] = useState<WorkoutSessionType>(() => 
    createWorkoutSession(workoutPlan)
  );
  const [restTimer, setRestTimer] = useState(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  // Timer for rest periods
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (session.isResting && session.status === 'active') {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            // Rest time is over
            setSession(prev => ({
              ...prev,
              isResting: false,
              restStartTime: undefined
            }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.isResting, session.status]);

  // Total elapsed time timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (session.status === 'active') {
      interval = setInterval(() => {
        setTotalElapsedTime(Math.floor((Date.now() - session.startTime.getTime()) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.status, session.startTime]);

  const currentExercise = session.workoutPlan[session.currentExerciseIndex];
  const progress = getWorkoutProgress(session);

  // Complete current set
  const completeSet = useCallback(() => {
    setSession(prev => {
      const completedSets = { ...prev.completedSets };
      const exerciseIndex = prev.currentExerciseIndex;
      
      if (!completedSets[exerciseIndex]) {
        completedSets[exerciseIndex] = [];
      }
      
      completedSets[exerciseIndex].push(prev.currentSet);
      
      const isLastSetOfExercise = prev.currentSet >= currentExercise.sets;
      const isLastExercise = prev.currentExerciseIndex >= prev.workoutPlan.length - 1;
      
      if (isLastSetOfExercise && isLastExercise) {
        // Workout completed
        return {
          ...prev,
          completedSets,
          status: 'completed' as const
        };
      } else if (isLastSetOfExercise) {
        // Move to next exercise - use between exercises time
        const nextExercise = prev.workoutPlan[prev.currentExerciseIndex + 1];
        const restTime = REST_TIMES.BETWEEN_EXERCISES;
        setRestTimer(restTime);
        return {
          ...prev,
          completedSets,
          currentExerciseIndex: prev.currentExerciseIndex + 1,
          currentSet: 1,
          isResting: true,
          restStartTime: new Date(),
          restDuration: restTime
        };
      } else {
        // Next set of same exercise - use machine-specific rest time
        const restTime = currentExercise.restTime || REST_TIMES.BETWEEN_SETS;
        setRestTimer(restTime);
        return {
          ...prev,
          completedSets,
          currentSet: prev.currentSet + 1,
          isResting: true,
          restStartTime: new Date(),
          restDuration: restTime
        };
      }
    });
  }, [currentExercise]);

  // Skip rest
  const skipRest = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isResting: false,
      restStartTime: undefined
    }));
    setRestTimer(0);
  }, []);

  // Pause/Resume workout
  const togglePause = useCallback(() => {
    setSession(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'paused' : 'active'
    }));
  }, []);

  if (session.status === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
        {/* Background glass layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
        <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-gradient-radial from-primary/6 to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-md mx-auto px-6 py-8 relative">
          <div className="text-center">
            {/* Success Animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 glass-morphism mb-6 relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg" />
              <Trophy className="w-12 h-12 text-primary relative z-10" />
            </div>
            
            <h1 className="text-title text-foreground mb-4">
              ワークアウト完了！
            </h1>
            
            <p className="text-body text-muted-foreground mb-8">
              お疲れ様でした。素晴らしいワークアウトでした！
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="border-0 glass-card glass-transition">
                <CardContent className="p-4 text-center">
                  <div className="text-title text-primary mb-2">
                    {progress.completedSets}
                  </div>
                  <p className="text-caption text-muted-foreground">完了セット</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 glass-card glass-transition">
                <CardContent className="p-4 text-center">
                  <div className="text-title text-primary mb-2">
                    {formatTime(totalElapsedTime)}
                  </div>
                  <p className="text-caption text-muted-foreground">総時間</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={onComplete}
              className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">完了</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
      {/* Background glass layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
      <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-gradient-radial from-primary/6 to-transparent rounded-full blur-3xl" />
      
      {/* Navigation Bar */}
      <div className="sticky top-0 z-30 glass-nav layer-3">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={onBack} 
                className="touch-target -ml-3 glass rounded-full border-0 hover:glass-hover"
                size="sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-headline text-foreground ml-4">ワークアウト中</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="glass border-0 text-secondary-foreground">
                {formatTime(totalElapsedTime)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 relative">
        {/* Progress */}
        <Card className="mb-6 border-0 glass-morphism glass-transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body text-card-foreground">進捗</span>
              <span className="text-body text-primary font-medium">
                {progress.completedSets}/{progress.totalSets} セット
              </span>
            </div>
            <Progress value={progress.progressPercentage} className="mb-2" />
            <p className="text-caption text-muted-foreground text-center">
              {progress.progressPercentage}% 完了
            </p>
          </CardContent>
        </Card>

        {/* Rest Timer */}
        {session.isResting && (
          <Card className="mb-6 border-0 glass-morphism-strong glass-transition relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-70" />
            <CardContent className="p-6 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 glass-morphism mb-4 relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm" />
                <Timer className="w-8 h-8 text-primary relative z-10" />
              </div>
              <h3 className="text-headline text-primary mb-2">休憩中</h3>
              <div className="text-title text-primary mb-4">
                {formatTime(restTimer)}
              </div>
              <p className="text-caption text-muted-foreground mb-4">
                {currentExercise.machineName} のセット間休憩
              </p>
              <Button 
                onClick={skipRest}
                variant="outline"
                className="glass-card border-0 text-primary glass-transition glass-hover"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                休憩をスキップ
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current Exercise */}
        {!session.isResting && (
          <Card className="mb-6 border-0 glass-morphism glass-transition relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent opacity-50" />
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass-morphism rounded-2xl flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-sm" />
                    <Dumbbell className="w-5 h-5 text-primary relative z-10" />
                  </div>
                  <div>
                    <CardTitle className="text-headline text-card-foreground">
                      {currentExercise.machineName}
                    </CardTitle>
                    <p className="text-caption text-muted-foreground">
                      {session.currentExerciseIndex + 1}/{session.workoutPlan.length}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="glass border-0 text-secondary-foreground">
                  {currentExercise.part}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                  <div className="text-title text-primary mb-1 relative z-10">
                    {currentExercise.weight}
                  </div>
                  <div className="text-caption-2 text-muted-foreground font-medium relative z-10">重量 (kg)</div>
                </div>
                <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                  <div className="text-title text-primary mb-1 relative z-10">
                    {currentExercise.reps}
                  </div>
                  <div className="text-caption-2 text-muted-foreground font-medium relative z-10">回数</div>
                </div>
                <div className="glass-accent rounded-xl p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-70" />
                  <div className="text-title text-primary mb-1 relative z-10">
                    {session.currentSet}/{currentExercise.sets}
                  </div>
                  <div className="text-caption-2 text-muted-foreground font-medium relative z-10">セット</div>
                </div>
              </div>

              {/* Rest Time Info */}
              <div className="mb-6 p-3 glass rounded-lg">
                <div className="flex items-center gap-2 text-caption text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>セット間休憩: {formatTime(currentExercise.restTime || 90)}</span>
                </div>
              </div>

              {/* Set Progress */}
              <div className="flex gap-2 mb-6">
                {Array.from({ length: currentExercise.sets }, (_, index) => {
                  const setNumber = index + 1;
                  const isCompleted = session.completedSets[session.currentExerciseIndex]?.includes(setNumber);
                  const isCurrent = setNumber === session.currentSet;
                  
                  return (
                    <div
                      key={index}
                      className={`flex-1 h-3 rounded-full glass-transition ${
                        isCompleted 
                          ? 'bg-primary' 
                          : isCurrent 
                          ? 'bg-primary/30' 
                          : 'bg-border'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={completeSet}
                  disabled={session.status === 'paused'}
                  className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  <CheckCircle2 className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">セット完了</span>
                </Button>

                <Button 
                  onClick={togglePause}
                  variant="outline"
                  className="w-full touch-target glass-card border-0 glass-transition glass-hover"
                  size="lg"
                >
                  {session.status === 'paused' ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      再開
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      一時停止
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exercise List */}
        <Card className="border-0 glass-morphism glass-transition">
          <CardHeader>
            <CardTitle className="text-headline text-card-foreground">今日のメニュー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {session.workoutPlan.map((exercise, index) => {
                const completedSetsCount = session.completedSets[index]?.length || 0;
                const isCurrentExercise = index === session.currentExerciseIndex;
                const isCompleted = completedSetsCount >= exercise.sets;
                
                return (
                  <div
                    key={exercise.machineId}
                    className={`flex items-center justify-between p-3 rounded-lg glass-transition ${
                      isCurrentExercise 
                        ? 'bg-primary/5 border border-primary/20' 
                        : 'bg-secondary/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center glass-transition ${
                        isCompleted 
                          ? 'bg-primary text-white' 
                          : isCurrentExercise 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-border text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-caption-2 font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-body font-medium text-card-foreground">
                          {exercise.machineName}
                        </h4>
                        <p className="text-caption text-muted-foreground">
                          {exercise.weight}kg × {exercise.reps}回 | 休憩 {formatTime(exercise.restTime || 90)}
                        </p>
                      </div>
                    </div>
                    <span className="text-caption text-muted-foreground">
                      {completedSetsCount}/{exercise.sets}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}