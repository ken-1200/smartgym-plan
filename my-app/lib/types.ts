export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type GoalType = 'lose_weight' | 'muscle_gain' | 'maintain'

export interface UserProfile {
  age: number
  weight: number
  experience: ExperienceLevel
  goal: GoalType
}

export interface Machine {
  id: string
  name: string
  part: string
  minWeight: number
  maxWeight: number
  defaultSets: number
  defaultRestTime: number
}

export interface WorkoutPlan {
  machineId: string
  machineName: string
  part: string
  weight: number
  reps: number
  sets: number
  restTime: number
}

export interface WorkoutSession {
  id: string
  workoutPlan: WorkoutPlan[]
  startTime: Date
  currentExerciseIndex: number
  currentSet: number
  completedSets: { [exerciseIndex: number]: number[] }
  isResting: boolean
  restStartTime?: Date
  restDuration: number
  status: 'active' | 'paused' | 'completed'
  totalElapsedTime: number
  pausedTime: number
}