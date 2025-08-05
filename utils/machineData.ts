export interface Machine {
  id: string;
  name: string;
  part: string;
  weight_range: [number, number];
  default_set: number;
  default_rest_time: number; // デフォルト休憩時間（秒）
}

export interface UserProfile {
  age: number;
  weight: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  goal: 'lose_weight' | 'muscle_gain' | 'maintain';
}

export interface WorkoutPlan {
  machineId: string;
  machineName: string;
  part: string;
  weight: number;
  reps: number;
  sets: number;
  restTime?: number; // カスタマイズ可能な休憩時間（秒）
}

export interface WorkoutSession {
  id: string;
  workoutPlan: WorkoutPlan[];
  startTime: Date;
  currentExerciseIndex: number;
  currentSet: number;
  completedSets: { [exerciseIndex: number]: number[] }; // completed set numbers for each exercise
  isResting: boolean;
  restStartTime?: Date;
  restDuration: number; // in seconds
  status: 'active' | 'paused' | 'completed';
}

// カスタム休憩時間設定のタイプ
export interface RestTimeSettings {
  [machineId: string]: number; // マシンIDと休憩時間（秒）のマッピング
}

export const MACHINES: Record<string, Machine> = {
  chest_press: {
    id: 'chest_press',
    name: 'チェストプレス',
    part: '胸',
    weight_range: [20, 80],
    default_set: 3,
    default_rest_time: 90 // 大胸筋は中程度の休憩
  },
  lat_pull: {
    id: 'lat_pull',
    name: 'ラットプルダウン',
    part: '背中',
    weight_range: [15, 60],
    default_set: 3,
    default_rest_time: 90 // 広背筋は中程度の休憩
  },
  leg_press: {
    id: 'leg_press',
    name: 'レッグプレス',
    part: '脚',
    weight_range: [40, 120],
    default_set: 3,
    default_rest_time: 120 // 大腿筋は長めの休憩
  },
  shoulder_press: {
    id: 'shoulder_press',
    name: 'ショルダープレス',
    part: '肩',
    weight_range: [10, 50],
    default_set: 3,
    default_rest_time: 75 // 三角筋は短めの休憩
  },
  bicep_curl: {
    id: 'bicep_curl',
    name: 'バイセップカール',
    part: '腕',
    weight_range: [5, 30],
    default_set: 3,
    default_rest_time: 60 // 二頭筋は短い休憩
  },
  leg_extension: {
    id: 'leg_extension',
    name: 'レッグエクステンション',
    part: '脚前',
    weight_range: [20, 80],
    default_set: 3,
    default_rest_time: 90 // 大腿四頭筋は中程度の休憩
  }
};

// 休憩時間のプリセット（秒）
export const REST_TIME_PRESETS = [
  { label: '30秒', value: 30 },
  { label: '45秒', value: 45 },
  { label: '60秒', value: 60 },
  { label: '75秒', value: 75 },
  { label: '90秒', value: 90 },
  { label: '105秒', value: 105 },
  { label: '120秒', value: 120 },
  { label: '150秒', value: 150 },
  { label: '180秒', value: 180 }
];

export function generateWorkoutPlan(
  selectedMachines: string[],
  profile: UserProfile,
  customRestTimes?: RestTimeSettings
): WorkoutPlan[] {
  // 基礎重量計算
  let baseWeight: number;
  switch (profile.experience) {
    case 'beginner':
      baseWeight = profile.weight * 0.3;
      break;
    case 'intermediate':
      baseWeight = profile.weight * 0.5;
      break;
    case 'advanced':
      baseWeight = profile.weight * 0.7;
      break;
  }

  // 回数・セット数設定
  let reps: number;
  let sets: number;
  switch (profile.goal) {
    case 'lose_weight':
      reps = 12;
      sets = 3;
      break;
    case 'muscle_gain':
      reps = 8;
      sets = 3;
      break;
    case 'maintain':
      reps = 10;
      sets = 2;
      break;
  }

  return selectedMachines.map(machineId => {
    const machine = MACHINES[machineId];
    // 基礎重量をマシンの範囲に調整
    const adjustedWeight = Math.max(
      machine.weight_range[0],
      Math.min(machine.weight_range[1], Math.round(baseWeight))
    );

    // カスタム休憩時間またはデフォルト休憩時間を使用
    const restTime = customRestTimes?.[machineId] || machine.default_rest_time;

    return {
      machineId: machine.id,
      machineName: machine.name,
      part: machine.part,
      weight: adjustedWeight,
      reps,
      sets,
      restTime
    };
  });
}

// 休憩時間の設定（秒）
export const REST_TIMES = {
  BETWEEN_SETS: 90, // セット間
  BETWEEN_EXERCISES: 120, // エクササイズ間
};

export function createWorkoutSession(workoutPlan: WorkoutPlan[]): WorkoutSession {
  return {
    id: Math.random().toString(36).substr(2, 9),
    workoutPlan,
    startTime: new Date(),
    currentExerciseIndex: 0,
    currentSet: 1,
    completedSets: {},
    isResting: false,
    restDuration: 0,
    status: 'active'
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getWorkoutProgress(session: WorkoutSession): {
  totalSets: number;
  completedSets: number;
  progressPercentage: number;
} {
  const totalSets = session.workoutPlan.reduce((sum, exercise) => sum + exercise.sets, 0);
  const completedSets = Object.values(session.completedSets).reduce(
    (sum, sets) => sum + sets.length, 0
  );
  const progressPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  
  return { totalSets, completedSets, progressPercentage };
}

// 休憩時間設定の保存・読み込み
export function saveRestTimeSettings(settings: RestTimeSettings): void {
  localStorage.setItem('smartgym-rest-times', JSON.stringify(settings));
}

export function loadRestTimeSettings(): RestTimeSettings {
  const saved = localStorage.getItem('smartgym-rest-times');
  return saved ? JSON.parse(saved) : {};
}

// マシン名から推奨休憩時間を取得
export function getRecommendedRestTime(machineId: string, goal: string): number {
  const machine = MACHINES[machineId];
  if (!machine) return 90;
  
  let baseTime = machine.default_rest_time;
  
  // 目標に応じて調整
  switch (goal) {
    case 'lose_weight':
      return Math.max(30, baseTime - 15); // 短めに調整
    case 'muscle_gain':
      return baseTime + 15; // 長めに調整
    case 'maintain':
      return baseTime; // デフォルトのまま
    default:
      return baseTime;
  }
}