import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ArrowLeft, Palette, Save, Trash2, Copy, Download, Upload } from "lucide-react";
import { 
  COLOR_THEMES, 
  CustomTheme, 
  ThemeId, 
  CustomThemeId,
  EditableColorValues,
  generateCustomTheme,
  saveCustomTheme,
  getCustomThemes,
  deleteCustomTheme,
  applyCustomTheme,
  applyTheme,
  extractEditableValues
} from "../utils/themes";

interface CustomThemeEditorProps {
  onBack: () => void;
}

export function CustomThemeEditor({ onBack }: CustomThemeEditorProps) {
  const [baseTheme, setBaseTheme] = useState<ThemeId>('warm-orange');
  const [editableValues, setEditableValues] = useState<EditableColorValues>({
    primary: '#ff5733',
    background: '#fffbfa',
    foreground: '#000000',
    card: '#ffffff',
    secondary: '#f5f5f5',
    accent: '#f0f0f0',
    glassOpacity: 1,
    blurIntensity: 1,
    shadowIntensity: 1
  });
  const [metadata, setMetadata] = useState({
    name: 'My Custom Theme',
    description: 'カスタムテーマ',
    emoji: '🎨'
  });
  
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [selectedCustomTheme, setSelectedCustomTheme] = useState<CustomThemeId | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  useEffect(() => {
    loadCustomThemes();
    loadBaseThemeValues();
  }, [baseTheme]);

  const loadCustomThemes = () => {
    setCustomThemes(getCustomThemes());
  };

  const loadBaseThemeValues = () => {
    const theme = COLOR_THEMES[baseTheme];
    const values = extractEditableValues(theme);
    setEditableValues(values);
    setMetadata({
      name: `Custom ${theme.name}`,
      description: `${theme.description}をベースにしたカスタムテーマ`,
      emoji: theme.emoji
    });
  };

  const handleValueChange = (key: keyof EditableColorValues, value: string | number) => {
    setEditableValues(prev => ({ ...prev, [key]: value }));
    
    // Apply preview if in preview mode
    if (previewMode) {
      applyPreview();
    }
  };

  const applyPreview = () => {
    try {
      const customTheme = generateCustomTheme(baseTheme, editableValues, metadata);
      applyCustomTheme(customTheme, false);
    } catch (error) {
      console.error('Preview failed:', error);
    }
  };

  const handleSave = () => {
    try {
      const customTheme = generateCustomTheme(baseTheme, editableValues, metadata);
      saveCustomTheme(customTheme);
      loadCustomThemes();
      setSaveDialogOpen(false);
      setSelectedCustomTheme(customTheme.id);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleLoadCustomTheme = (themeId: CustomThemeId) => {
    const theme = customThemes.find(t => t.id === themeId);
    if (!theme) return;

    setBaseTheme(theme.baseTheme);
    setEditableValues(extractEditableValues(theme));
    setMetadata({
      name: theme.name,
      description: theme.description,
      emoji: theme.emoji
    });
    setSelectedCustomTheme(themeId);
    
    if (previewMode) {
      applyCustomTheme(theme, false);
    }
  };

  const handleDeleteCustomTheme = (themeId: CustomThemeId) => {
    deleteCustomTheme(themeId);
    loadCustomThemes();
    if (selectedCustomTheme === themeId) {
      setSelectedCustomTheme(null);
    }
  };

  const handleApplyTheme = (themeId: CustomThemeId) => {
    const theme = customThemes.find(t => t.id === themeId);
    if (theme) {
      applyCustomTheme(theme, false);
    }
  };

  const togglePreview = () => {
    if (!previewMode) {
      applyPreview();
    } else {
      // Reset to original theme
      applyTheme('warm-orange', false);
    }
    setPreviewMode(!previewMode);
  };

  const resetToBaseTheme = () => {
    loadBaseThemeValues();
    setMetadata({
      name: `Custom ${COLOR_THEMES[baseTheme].name}`,
      description: `${COLOR_THEMES[baseTheme].description}をベースにしたカスタムテーマ`,
      emoji: COLOR_THEMES[baseTheme].emoji
    });
    
    if (previewMode) {
      applyPreview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative">
      {/* Background glass layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-60" />
      
      {/* Navigation Bar */}
      <div className="sticky top-0 z-30 glass-nav layer-3">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
              <h1 className="text-headline text-foreground ml-4">カスタムテーマエディター</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={previewMode ? "default" : "outline"}
                onClick={togglePreview}
                size="sm"
                className="glass"
              >
                <Palette className="w-4 h-4 mr-2" />
                {previewMode ? 'プレビュー中' : 'プレビュー'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Theme Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Base Theme Selection */}
            <Card className="border-0 glass-card glass-transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass-accent flex items-center justify-center">
                    🎨
                  </div>
                  ベーステーマ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(COLOR_THEMES).map((theme) => (
                    <Button
                      key={theme.id}
                      variant={baseTheme === theme.id ? "default" : "outline"}
                      onClick={() => setBaseTheme(theme.id)}
                      className="flex flex-col items-center gap-2 h-auto p-4 glass"
                    >
                      <span className="text-lg">{theme.emoji}</span>
                      <span className="text-sm">{theme.name}</span>
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={resetToBaseTheme}
                  size="sm"
                  className="glass"
                >
                  ベーステーマにリセット
                </Button>
              </CardContent>
            </Card>

            {/* Color Customization */}
            <Card className="border-0 glass-card glass-transition">
              <CardHeader>
                <CardTitle>色のカスタマイズ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">プライマリカラー</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={editableValues.primary}
                        onChange={(e) => handleValueChange('primary', e.target.value)}
                        className="w-12 h-10 p-1 glass-input"
                      />
                      <Input
                        type="text"
                        value={editableValues.primary}
                        onChange={(e) => handleValueChange('primary', e.target.value)}
                        className="flex-1 glass-input"
                        placeholder="#ff5733"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background-color">背景色</Label>
                    <div className="flex gap-2">
                      <Input
                        id="background-color"
                        type="color"
                        value={editableValues.background}
                        onChange={(e) => handleValueChange('background', e.target.value)}
                        className="w-12 h-10 p-1 glass-input"
                      />
                      <Input
                        type="text"
                        value={editableValues.background}
                        onChange={(e) => handleValueChange('background', e.target.value)}
                        className="flex-1 glass-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foreground-color">文字色</Label>
                    <div className="flex gap-2">
                      <Input
                        id="foreground-color"
                        type="color"
                        value={editableValues.foreground}
                        onChange={(e) => handleValueChange('foreground', e.target.value)}
                        className="w-12 h-10 p-1 glass-input"
                      />
                      <Input
                        type="text"
                        value={editableValues.foreground}
                        onChange={(e) => handleValueChange('foreground', e.target.value)}
                        className="flex-1 glass-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-color">カード色</Label>
                    <div className="flex gap-2">
                      <Input
                        id="card-color"
                        type="color"
                        value={editableValues.card}
                        onChange={(e) => handleValueChange('card', e.target.value)}
                        className="w-12 h-10 p-1 glass-input"
                      />
                      <Input
                        type="text"
                        value={editableValues.card}
                        onChange={(e) => handleValueChange('card', e.target.value)}
                        className="flex-1 glass-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Controls */}
                <div className="space-y-4 pt-4 border-t border-glass">
                  <h4 className="font-medium">高度な設定</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label>ガラス透明度: {Math.round(editableValues.glassOpacity * 100)}%</Label>
                      <Slider
                        value={[editableValues.glassOpacity]}
                        onValueChange={([value]) => handleValueChange('glassOpacity', value)}
                        min={0.1}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>ブラー強度: {Math.round(editableValues.blurIntensity * 100)}%</Label>
                      <Slider
                        value={[editableValues.blurIntensity]}
                        onValueChange={([value]) => handleValueChange('blurIntensity', value)}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>シャドウ強度: {Math.round(editableValues.shadowIntensity * 100)}%</Label>
                      <Slider
                        value={[editableValues.shadowIntensity]}
                        onValueChange={([value]) => handleValueChange('shadowIntensity', value)}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Metadata */}
            <Card className="border-0 glass-card glass-transition">
              <CardHeader>
                <CardTitle>テーマ情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-name">テーマ名</Label>
                  <Input
                    id="theme-name"
                    value={metadata.name}
                    onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-input"
                    placeholder="My Custom Theme"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme-description">説明</Label>
                  <Input
                    id="theme-description"
                    value={metadata.description}
                    onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                    className="glass-input"
                    placeholder="カスタムテーマの説明"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme-emoji">絵文字</Label>
                  <Input
                    id="theme-emoji"
                    value={metadata.emoji}
                    onChange={(e) => setMetadata(prev => ({ ...prev, emoji: e.target.value }))}
                    className="glass-input w-20"
                    placeholder="🎨"
                    maxLength={2}
                  />
                </div>

                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full glass-button text-primary-foreground border-0">
                      <Save className="w-4 h-4 mr-2" />
                      テーマを保存
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-morphism border-0">
                    <DialogHeader>
                      <DialogTitle>テーマを保存しますか？</DialogTitle>
                      <DialogDescription>
                        作成したカスタムテーマを保存して、後で使用できるようにします。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        「{metadata.name}」として保存されます。
                      </p>
                      <div className="flex justify-end gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setSaveDialogOpen(false)}
                          className="glass"
                        >
                          キャンセル
                        </Button>
                        <Button onClick={handleSave} className="glass-button">
                          保存
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Custom Themes List */}
          <div className="space-y-6">
            <Card className="border-0 glass-card glass-transition">
              <CardHeader>
                <CardTitle>保存済みテーマ</CardTitle>
              </CardHeader>
              <CardContent>
                {customThemes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>まだカスタムテーマがありません</p>
                    <p className="text-sm">テーマを作成して保存してみましょう</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customThemes.map((theme) => (
                      <Card
                        key={theme.id}
                        className={`border-0 glass cursor-pointer glass-transition ${
                          selectedCustomTheme === theme.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleLoadCustomTheme(theme.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{theme.emoji}</span>
                              <div>
                                <h4 className="font-medium text-sm">{theme.name}</h4>
                                <p className="text-xs text-muted-foreground">{theme.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyTheme(theme.id);
                                }}
                                className="w-8 h-8 p-0 glass"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomTheme(theme.id);
                                }}
                                className="w-8 h-8 p-0 glass text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="border-0 glass-card glass-transition">
              <CardHeader>
                <CardTitle>プレビュー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-morphism p-4 rounded-lg">
                  <h4 className="font-medium mb-2">サンプルカード</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    これは現在の設定でのプレビューです。
                  </p>
                  <Button size="sm" className="glass-button">
                    サンプルボタン
                  </Button>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <div 
                    className="h-8 rounded glass"
                    style={{ backgroundColor: editableValues.primary }}
                  />
                  <div 
                    className="h-8 rounded glass"
                    style={{ backgroundColor: editableValues.background }}
                  />
                  <div 
                    className="h-8 rounded glass"
                    style={{ backgroundColor: editableValues.card }}
                  />
                  <div 
                    className="h-8 rounded glass"
                    style={{ backgroundColor: editableValues.accent }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}