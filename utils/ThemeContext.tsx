import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeId, applyTheme, getStoredTheme } from './themes';

interface ThemeContextType {
  themeId: ThemeId;
  isDark: boolean;
  setTheme: (themeId: ThemeId, isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>('warm-orange');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load stored theme on mount
    const { themeId: storedTheme, isDark: storedDark } = getStoredTheme();
    setThemeId(storedTheme);
    setIsDark(storedDark);
    applyTheme(storedTheme, storedDark);
  }, []);

  const setTheme = (newThemeId: ThemeId, newIsDark: boolean) => {
    setThemeId(newThemeId);
    setIsDark(newIsDark);
    applyTheme(newThemeId, newIsDark);
  };

  return (
    <ThemeContext.Provider value={{ themeId, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}