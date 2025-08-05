import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dumbbell, Sparkles } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "../utils/ThemeContext";

interface TopScreenProps {
  onStart: () => void;
}

export function TopScreen({ onStart }: TopScreenProps) {
  const { themeId, isDark, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Background glass layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
      
      {/* Theme Selector - Top Right */}
      <div className="absolute top-8 right-6 z-20">
        <ThemeSelector 
          currentTheme={themeId}
          isDark={isDark}
          onThemeChange={setTheme}
        />
      </div>
      
      <div className="max-w-md mx-auto px-6 pt-20 pb-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 glass-morphism mb-6 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-sm" />
            <Dumbbell className="w-10 h-10 text-primary relative z-10" />
          </div>
          <h1 className="text-title-large text-foreground mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            SmartGym Plan
          </h1>
          <p className="text-body-large text-muted-foreground leading-relaxed">
            ジムのマシンを選択するだけで<br />
            最適なトレーニングプランを自動作成
          </p>
        </div>

        {/* Main Feature Card */}
        <Card className="mb-8 border-0 glass-morphism-strong glass-transition glass-hover">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-6 h-6 glass rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-caption text-primary font-medium">AI がプランを作成</span>
              </div>
              
              <h2 className="text-headline text-card-foreground mb-6">
                あなたに最適な<br />
                トレーニングメニューを作成
              </h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                    <span className="w-2 h-2 bg-primary rounded-full relative z-10"></span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-body font-medium text-card-foreground mb-1">
                      マシンを選択
                    </h4>
                    <p className="text-caption text-muted-foreground">
                      ジムにある設備を簡単選択
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                    <span className="w-2 h-2 bg-primary rounded-full relative z-10"></span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-body font-medium text-card-foreground mb-1">
                      プロフィール入力
                    </h4>
                    <p className="text-caption text-muted-foreground">
                      体重・目標・経験レベルを入力
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 glass-accent rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-sm" />
                    <span className="w-2 h-2 bg-primary rounded-full relative z-10"></span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-body font-medium text-card-foreground mb-1">
                      自動計算
                    </h4>
                    <p className="text-caption text-muted-foreground">
                      重量・回数・セット数を提案
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={onStart}
                className="w-full touch-target glass-button text-primary-foreground border-0 relative overflow-hidden group"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">はじめる</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-block glass rounded-full px-4 py-2">
            <p className="text-caption text-muted-foreground">
              無料でご利用いただけます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}