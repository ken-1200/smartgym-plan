'use client';

import { useState } from 'react';
import { UserProfile, Machine, WorkoutPlan } from '@/src/lib/types';
import { machines } from '@/src/lib/machine-data';
import { calculateWorkoutPlan } from '@/src/lib/workout-calculator';
import TopScreen from '@/src/components/screens/top-screen';
import MachineSelection from '@/src/components/screens/machine-selection';
import ProfileInput from '@/src/components/screens/profile-input';
import MenuProposal from '@/src/components/screens/menu-proposal';
import WorkoutSession from '@/src/components/screens/workout-session';
type Screen = 'top' | 'machine-selection' | 'profile-input' | 'menu-proposal' | 'workout-session';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('top');
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[]>([]);

  const handleStart = () => {
    setCurrentScreen('machine-selection');
  };

  const handleMachineSelect = (machines: Machine[]) => {
    setSelectedMachines(machines);
    setCurrentScreen('profile-input');
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    const plan = calculateWorkoutPlan(profile, selectedMachines);
    setWorkoutPlan(plan);
    setCurrentScreen('menu-proposal');
  };

  const handleMenuConfirm = (plan: WorkoutPlan[]) => {
    setWorkoutPlan(plan);
    setCurrentScreen('workout-session');
  };

  const handleWorkoutComplete = () => {
    setCurrentScreen('top');
    setSelectedMachines([]);
    setUserProfile(null);
    setWorkoutPlan([]);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'machine-selection':
        setCurrentScreen('top');
        break;
      case 'profile-input':
        setCurrentScreen('machine-selection');
        break;
      case 'menu-proposal':
        setCurrentScreen('profile-input');
        break;
      case 'workout-session':
        setCurrentScreen('menu-proposal');
        break;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      {currentScreen === 'top' && <TopScreen onStart={handleStart} />}
      {currentScreen === 'machine-selection' && (
        <MachineSelection machines={machines} onNext={handleMachineSelect} onBack={handleBack} />
      )}
      {currentScreen === 'profile-input' && <ProfileInput onNext={handleProfileSubmit} onBack={handleBack} />}
      {currentScreen === 'menu-proposal' && (
        <MenuProposal workoutPlan={workoutPlan} onConfirm={handleMenuConfirm} onBack={handleBack} />
      )}
      {currentScreen === 'workout-session' && (
        <WorkoutSession workoutPlan={workoutPlan} onComplete={handleWorkoutComplete} onBack={handleBack} />
      )}
    </main>
  );
}
