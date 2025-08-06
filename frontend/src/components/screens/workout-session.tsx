'use client';

import { useState, useEffect, useCallback } from 'react';
import { WorkoutPlan } from '@/src/lib/types';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Progress } from '@/src/components/ui/progress';
import { Badge } from '@/src/components/ui/badge';
import { ArrowLeft, Play, Pause, SkipForward, CheckCircle, Timer, Dumbbell } from 'lucide-react';

interface WorkoutSessionProps {
  workoutPlan: WorkoutPlan[];
  onComplete: () => void;
  onBack: () => void;
}

export default function WorkoutSession({ workoutPlan, onComplete, onBack }: WorkoutSessionProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSets, setCompletedSets] = useState<{ [key: number]: boolean[] }>({});
  const [sessionStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentExercise = workoutPlan[currentExerciseIndex];
  const totalExercises = workoutPlan.length;
  const overallProgress = ((currentExerciseIndex + (currentSet - 1) / currentExercise.sets) / totalExercises) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setElapsedTime(Date.now() - sessionStartTime);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime, isPaused]);

  useEffect(() => {
    if (isResting && restTimeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => {
        setRestTimeLeft(restTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isResting && restTimeLeft === 0) {
      setIsResting(false);
    }
  }, [isResting, restTimeLeft, isPaused]);

  const completeSet = useCallback(() => {
    const newCompletedSets = { ...completedSets };
    if (!newCompletedSets[currentExerciseIndex]) {
      newCompletedSets[currentExerciseIndex] = [];
    }
    newCompletedSets[currentExerciseIndex][currentSet - 1] = true;
    setCompletedSets(newCompletedSets);

    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestTimeLeft(currentExercise.restTime);
    } else {
      if (currentExerciseIndex < workoutPlan.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(true);
        setRestTimeLeft(90);
      } else {
        onComplete();
      }
    }
  }, [currentSet, currentExercise, currentExerciseIndex, workoutPlan.length, completedSets, onComplete]);

  const skipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">ワークアウト実行中</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              <Timer className="h-4 w-4 mr-2" />
              {formatTime(elapsedTime)}
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            進捗: {currentExerciseIndex + 1}/{totalExercises} エクササイズ
          </p>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Dumbbell className="h-6 w-6" />
                  {currentExercise.machineName}
                </CardTitle>
                <CardDescription className="text-lg mt-2">部位: {currentExercise.part}</CardDescription>
              </div>
              <Badge variant="outline" className="text-lg">
                セット {currentSet} / {currentExercise.sets}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">重量</p>
                  <p className="text-3xl font-bold">{currentExercise.weight}kg</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">回数</p>
                  <p className="text-3xl font-bold">{currentExercise.reps}回</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">休憩</p>
                  <p className="text-3xl font-bold">{currentExercise.restTime}秒</p>
                </div>
              </div>

              {isResting && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <p className="text-lg font-semibold">休憩中</p>
                      <p className="text-5xl font-bold">{restTimeLeft}秒</p>
                      <Button onClick={skipRest} variant="outline">
                        <SkipForward className="h-4 w-4 mr-2" />
                        スキップ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-center gap-4">
                {!isResting && (
                  <Button size="lg" onClick={completeSet} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    セット完了
                  </Button>
                )}
                <Button size="lg" variant="outline" onClick={togglePause} className="flex items-center gap-2">
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  {isPaused ? '再開' : '一時停止'}
                </Button>
              </div>

              <div className="flex gap-2 justify-center">
                {Array.from({ length: currentExercise.sets }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                      completedSets[currentExerciseIndex]?.[index]
                        ? 'bg-primary text-primary-foreground'
                        : index === currentSet - 1
                          ? 'bg-secondary text-secondary-foreground ring-2 ring-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
