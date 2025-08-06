import { UserProfile, Machine, WorkoutPlan } from './types'

export function calculateWorkoutPlan(
  profile: UserProfile,
  selectedMachines: Machine[]
): WorkoutPlan[] {
  const weightMultiplier = getWeightMultiplier(profile.experience)
  const { reps, sets } = getGoalParameters(profile.goal)
  const restTime = getRestTime(profile.goal)

  return selectedMachines.map(machine => {
    const baseWeight = profile.weight * weightMultiplier
    let weight = Math.round(baseWeight / 5) * 5
    
    weight = Math.max(machine.minWeight, Math.min(weight, machine.maxWeight))

    return {
      machineId: machine.id,
      machineName: machine.name,
      part: machine.part,
      weight,
      reps,
      sets,
      restTime
    }
  })
}

function getWeightMultiplier(experience: UserProfile['experience']): number {
  switch (experience) {
    case 'beginner':
      return 0.3
    case 'intermediate':
      return 0.5
    case 'advanced':
      return 0.7
    default:
      return 0.5
  }
}

function getGoalParameters(goal: UserProfile['goal']): { reps: number; sets: number } {
  switch (goal) {
    case 'lose_weight':
      return { reps: 12, sets: 3 }
    case 'muscle_gain':
      return { reps: 8, sets: 3 }
    case 'maintain':
      return { reps: 10, sets: 2 }
    default:
      return { reps: 10, sets: 3 }
  }
}

function getRestTime(goal: UserProfile['goal']): number {
  switch (goal) {
    case 'lose_weight':
      return 30
    case 'muscle_gain':
      return 90
    case 'maintain':
      return 60
    default:
      return 60
  }
}