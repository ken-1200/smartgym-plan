import { useState } from "react";
import { ThemeProvider } from "./utils/ThemeContext";
import { TopScreen } from "./components/TopScreen";
import { MachineSelection } from "./components/MachineSelection";
import { ProfileInput } from "./components/ProfileInput";
import { MenuProposal } from "./components/MenuProposal";
import { WorkoutSession } from "./components/WorkoutSession";
import { generateWorkoutPlan, UserProfile, WorkoutPlan, loadRestTimeSettings } from "./utils/machineData";

type Screen = 'top' | 'machine-selection' | 'profile-input' | 'menu-proposal' | 'workout-session';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('top');
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[]>([]);

  const handleStart = () => {
    setCurrentScreen('machine-selection');
  };

  const handleMachinesSelected = (machines: string[]) => {
    setSelectedMachines(machines);
    setCurrentScreen('profile-input');
  };

  const handleProfileSubmitted = (profile: UserProfile) => {
    setUserProfile(profile);
    // 保存された休憩時間設定を読み込み
    const customRestTimes = loadRestTimeSettings();
    const plan = generateWorkoutPlan(selectedMachines, profile, customRestTimes);
    setWorkoutPlan(plan);
    setCurrentScreen('menu-proposal');
  };

  const handleBackToTop = () => {
    setCurrentScreen('top');
  };

  const handleBackToMachineSelection = () => {
    setCurrentScreen('machine-selection');
  };

  const handleBackToProfileInput = () => {
    setCurrentScreen('profile-input');
  };

  const handleBackToMenuProposal = () => {
    setCurrentScreen('menu-proposal');
  };

  const handleStartWorkout = (updatedPlan?: WorkoutPlan[]) => {
    // MenuProposalから更新されたプランがある場合は使用
    if (updatedPlan) {
      setWorkoutPlan(updatedPlan);
    }
    setCurrentScreen('workout-session');
  };

  const handleWorkoutComplete = () => {
    setCurrentScreen('top');
    setSelectedMachines([]);
    setUserProfile(null);
    setWorkoutPlan([]);
  };

  const handleRestart = () => {
    setCurrentScreen('top');
    setSelectedMachines([]);
    setUserProfile(null);
    setWorkoutPlan([]);
  };

  switch (currentScreen) {
    case 'top':
      return (
        <TopScreen 
          onStart={handleStart}
        />
      );
    
    case 'machine-selection':
      return (
        <MachineSelection 
          onBack={handleRestart}
          onNext={handleMachinesSelected}
        />
      );
    
    case 'profile-input':
      return (
        <ProfileInput 
          onBack={handleBackToMachineSelection}
          onNext={handleProfileSubmitted}
        />
      );
    
    case 'menu-proposal':
      return (
        <MenuProposal 
          workoutPlan={workoutPlan}
          userGoal={userProfile?.goal}
          onBack={handleBackToProfileInput}
          onRestart={handleRestart}
          onStartWorkout={handleStartWorkout}
        />
      );
    
    case 'workout-session':
      return (
        <WorkoutSession 
          workoutPlan={workoutPlan}
          onBack={handleBackToMenuProposal}
          onComplete={handleWorkoutComplete}
        />
      );
    
    default:
      return <TopScreen onStart={handleStart} />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}