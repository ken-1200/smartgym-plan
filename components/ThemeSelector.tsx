import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Palette, Check, Moon, Sun } from "lucide-react";
import { COLOR_THEMES, ThemeId, applyTheme } from "../utils/themes";

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  isDark: boolean;
  onThemeChange: (themeId: ThemeId, isDark: boolean) => void;
}

export function ThemeSelector({ currentTheme, isDark, onThemeChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [tempDark, setTempDark] = useState(isDark);

  const handleThemeSelect = (themeId: ThemeId) => {
    applyTheme(themeId, tempDark);
    onThemeChange(themeId, tempDark);
    setOpen(false);
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setTempDark(checked);
    applyTheme(currentTheme, checked);
    onThemeChange(currentTheme, checked);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="touch-target glass rounded-full border-0 hover:glass-hover w-11 h-11 p-0"
        >
          <Palette className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md glass-morphism-strong border-0 p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-headline text-card-foreground flex items-center gap-3">
              <div className="w-8 h-8 glass-accent rounded-xl flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary" />
              </div>
              テーマを選択
            </DialogTitle>
            <DialogDescription className="text-caption text-muted-foreground">
              アプリの見た目をお好みに合わせてカスタマイズできます。選択したテーマは自動的に保存されます。
            </DialogDescription>
          </DialogHeader>

          {/* Dark Mode Toggle */}
          <div className="px-6 pb-4">
            <Card className="border-0 glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 glass-accent rounded-xl flex items-center justify-center">
                      {tempDark ? (
                        <Moon className="w-4 h-4 text-primary" />
                      ) : (
                        <Sun className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <Label className="text-body font-medium text-card-foreground">
                        ダークモード
                      </Label>
                      <p className="text-caption text-muted-foreground">
                        {tempDark ? '暗いテーマ' : '明るいテーマ'}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={tempDark} 
                    onCheckedChange={handleDarkModeToggle}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Colors */}
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {Object.values(COLOR_THEMES).map((theme) => {
                const isSelected = theme.id === currentTheme;
                const colors = tempDark ? theme.dark : theme.colors;
                
                return (
                  <Card
                    key={theme.id}
                    className={`cursor-pointer border-0 glass-transition relative overflow-hidden ${
                      isSelected 
                        ? 'glass-morphism-strong ring-2 ring-primary/20' 
                        : 'glass-card glass-hover'
                    }`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center gap-4">
                        {/* Color Preview */}
                        <div className="flex gap-1">
                          <div 
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <div 
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: colors.secondary.replace('rgba', 'rgb').replace(/, 0\.\d+\)/, ')') }}
                          />
                          <div 
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: colors.background }}
                          />
                        </div>

                        {/* Theme Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-body">{theme.emoji}</span>
                            <h4 className="text-body font-medium text-card-foreground">
                              {theme.name}
                            </h4>
                          </div>
                          <p className="text-caption text-muted-foreground">
                            {theme.description}カラー
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="w-8 h-8 glass-morphism rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <Card className="border-0 glass">
              <CardContent className="p-3 text-center">
                <p className="text-caption text-muted-foreground">
                  💡 選択したテーマは自動的に保存されます
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}