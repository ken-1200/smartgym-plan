import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, User, Target, TrendingUp } from "lucide-react";
import { UserProfile } from "../utils/machineData";

interface ProfileInputProps {
  onBack: () => void;
  onNext: (profile: UserProfile) => void;
}

export function ProfileInput({ onBack, onNext }: ProfileInputProps) {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const handleSubmit = () => {
    if (age && weight && experience && goal) {
      const profile: UserProfile = {
        age: parseInt(age),
        weight: parseFloat(weight),
        experience: experience as UserProfile['experience'],
        goal: goal as UserProfile['goal']
      };
      onNext(profile);
    }
  };

  const isValid = age && weight && experience && goal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
      {/* Background glass layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
      
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
            <h1 className="text-headline text-foreground ml-4">プロフィール</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 relative">
        <div className="space-y-6">
          {/* Basic Info Section */}
          <Card className="border-0 glass-morphism glass-transition glass-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                  <User className="w-5 h-5 text-primary relative z-10" />
                </div>
                <CardTitle className="text-headline text-card-foreground">基本情報</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age */}
              <div className="space-y-3">
                <Label className="text-body font-medium text-card-foreground">年齢</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="flex-1 touch-target glass-input border-0 rounded-xl"
                  />
                  <span className="text-body text-muted-foreground font-medium">歳</span>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <Label className="text-body font-medium text-card-foreground">体重</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="65.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 touch-target glass-input border-0 rounded-xl"
                  />
                  <span className="text-body text-muted-foreground font-medium">kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="border-0 glass-morphism glass-transition glass-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                  <TrendingUp className="w-5 h-5 text-primary relative z-10" />
                </div>
                <CardTitle className="text-headline text-card-foreground">運動経験</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup value={experience} onValueChange={setExperience} className="space-y-4">
                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  experience === 'beginner' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setExperience('beginner')}>
                  {experience === 'beginner' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="beginner" id="beginner" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="beginner" className="text-body font-medium text-card-foreground cursor-pointer">
                          初心者
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          筋トレ経験1年未満
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  experience === 'intermediate' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setExperience('intermediate')}>
                  {experience === 'intermediate' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="intermediate" id="intermediate" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="intermediate" className="text-body font-medium text-card-foreground cursor-pointer">
                          中級者
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          筋トレ経験1-3年
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  experience === 'advanced' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setExperience('advanced')}>
                  {experience === 'advanced' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="advanced" id="advanced" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="advanced" className="text-body font-medium text-card-foreground cursor-pointer">
                          上級者
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          筋トレ経験3年以上
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Goal Section */}
          <Card className="border-0 glass-morphism glass-transition glass-hover">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                  <Target className="w-5 h-5 text-primary relative z-10" />
                </div>
                <CardTitle className="text-headline text-card-foreground">目標</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup value={goal} onValueChange={setGoal} className="space-y-4">
                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  goal === 'lose_weight' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setGoal('lose_weight')}>
                  {goal === 'lose_weight' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="lose_weight" id="lose_weight" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="lose_weight" className="text-body font-medium text-card-foreground cursor-pointer">
                          ダイエット
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          脂肪燃焼・引き締め
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  goal === 'muscle_gain' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setGoal('muscle_gain')}>
                  {goal === 'muscle_gain' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="muscle_gain" id="muscle_gain" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="muscle_gain" className="text-body font-medium text-card-foreground cursor-pointer">
                          筋力増強
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          筋肉増量・パワー向上
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                  goal === 'maintain' ? 'glass-morphism-strong' : 'glass-card glass-hover'
                }`} onClick={() => setGoal('maintain')}>
                  {goal === 'maintain' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                  )}
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="maintain" id="maintain" className="touch-target" />
                      <div className="flex-1">
                        <Label htmlFor="maintain" className="text-body font-medium text-card-foreground cursor-pointer">
                          維持
                        </Label>
                        <p className="text-caption text-muted-foreground mt-1">
                          現状維持・健康管理
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Create Menu Button */}
        <div className="mt-8">
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">メニューを作成</span>
          </Button>
        </div>
      </div>
    </div>
  );
}