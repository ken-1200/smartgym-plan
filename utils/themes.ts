export type ThemeId = 'warm-orange' | 'ocean-blue' | 'nature-green' | 'deep-purple' | 'soft-pink' | 'natural-crystal';

export interface ColorTheme {
  id: ThemeId;
  name: string;
  description: string;
  emoji: string;
  colors: {
    // Primary colors
    primary: string;
    primaryGlass: string;
    primaryForeground: string;
    
    // Background colors
    background: string;
    backgroundGlass: string;
    foreground: string;
    
    // Card colors
    card: string;
    cardGlass: string;
    cardForeground: string;
    
    // Secondary colors
    secondary: string;
    secondaryGlass: string;
    secondaryForeground: string;
    
    // Utility colors
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    borderGlass: string;
    input: string;
    inputBackground: string;
    inputGlass: string;
    ring: string;
    
    // Glass effects
    glassShadowLight: string;
    glassShadowMedium: string;
    glassShadowHeavy: string;
    glassShadowUltra: string;
    glassGradientPrimary: string;
    glassGradientAccent: string;
    
    // Expanded translucent palette
    glassWhite10: string;
    glassWhite15: string;
    glassWhite20: string;
    glassWhite25: string;
    glassWhite30: string;
    glassWhite40: string;
    glassWhite50: string;
    glassWhite60: string;
    glassWhite70: string;
    glassWhite80: string;
    glassWhite90: string;
    
    glassPrimary05: string;
    glassPrimary10: string;
    glassPrimary15: string;
    glassPrimary20: string;
    glassPrimary25: string;
    glassPrimary30: string;
    glassPrimary40: string;
    glassPrimary50: string;
    glassPrimary60: string;
    glassPrimary70: string;
    glassPrimary80: string;
    glassPrimary90: string;
    
    // Optical effects
    liquidRefraction: string;
    liquidReflection: string;
    liquidCaustics: string;
    liquidShimmer: string;
  };
  dark: {
    // Same structure for dark mode
    primary: string;
    primaryGlass: string;
    primaryForeground: string;
    background: string;
    backgroundGlass: string;
    foreground: string;
    card: string;
    cardGlass: string;
    cardForeground: string;
    secondary: string;
    secondaryGlass: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    borderGlass: string;
    input: string;
    inputGlass: string;
    ring: string;
    glassShadowLight: string;
    glassShadowMedium: string;
    glassShadowHeavy: string;
    glassShadowUltra: string;
    glassGradientPrimary: string;
    glassGradientAccent: string;
    glassWhite10: string;
    glassWhite15: string;
    glassWhite20: string;
    glassWhite25: string;
    glassWhite30: string;
    glassWhite40: string;
    glassWhite50: string;
    glassWhite60: string;
    glassWhite70: string;
    glassWhite80: string;
    glassWhite90: string;
    glassPrimary05: string;
    glassPrimary10: string;
    glassPrimary15: string;
    glassPrimary20: string;
    glassPrimary25: string;
    glassPrimary30: string;
    glassPrimary40: string;
    glassPrimary50: string;
    glassPrimary60: string;
    glassPrimary70: string;
    glassPrimary80: string;
    glassPrimary90: string;
    liquidRefraction: string;
    liquidReflection: string;
    liquidCaustics: string;
    liquidShimmer: string;
  };
}

export const COLOR_THEMES: Record<ThemeId, ColorTheme> = {
  'warm-orange': {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'エネルギッシュで温かみのある',
    emoji: '🔥',
    colors: {
      primary: '#ff5733',
      primaryGlass: 'rgba(255, 87, 51, 0.85)',
      primaryForeground: '#ffffff',
      background: '#fffbfa',
      backgroundGlass: 'rgba(255, 251, 250, 0.85)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.75)',
      cardGlass: 'rgba(255, 255, 255, 0.4)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(255, 242, 240, 0.6)',
      secondaryGlass: 'rgba(255, 242, 240, 0.3)',
      secondaryForeground: '#2d1b13',
      muted: 'rgba(247, 243, 242, 0.7)',
      mutedForeground: '#8b6b5c',
      accent: 'rgba(255, 242, 240, 0.6)',
      accentForeground: '#2d1b13',
      border: 'rgba(255, 87, 51, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.6)',
      inputGlass: 'rgba(255, 255, 255, 0.4)',
      ring: 'rgba(255, 87, 51, 0.3)',
      glassShadowLight: '0 8px 32px rgba(255, 87, 51, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(255, 87, 51, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(255, 87, 51, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(255, 87, 51, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(255, 87, 51, 0.1) 0%, rgba(255, 87, 51, 0.05) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.1)',
      glassWhite15: 'rgba(255, 255, 255, 0.15)',
      glassWhite20: 'rgba(255, 255, 255, 0.2)',
      glassWhite25: 'rgba(255, 255, 255, 0.25)',
      glassWhite30: 'rgba(255, 255, 255, 0.3)',
      glassWhite40: 'rgba(255, 255, 255, 0.4)',
      glassWhite50: 'rgba(255, 255, 255, 0.5)',
      glassWhite60: 'rgba(255, 255, 255, 0.6)',
      glassWhite70: 'rgba(255, 255, 255, 0.7)',
      glassWhite80: 'rgba(255, 255, 255, 0.8)',
      glassWhite90: 'rgba(255, 255, 255, 0.9)',
      glassPrimary05: 'rgba(255, 87, 51, 0.05)',
      glassPrimary10: 'rgba(255, 87, 51, 0.1)',
      glassPrimary15: 'rgba(255, 87, 51, 0.15)',
      glassPrimary20: 'rgba(255, 87, 51, 0.2)',
      glassPrimary25: 'rgba(255, 87, 51, 0.25)',
      glassPrimary30: 'rgba(255, 87, 51, 0.3)',
      glassPrimary40: 'rgba(255, 87, 51, 0.4)',
      glassPrimary50: 'rgba(255, 87, 51, 0.5)',
      glassPrimary60: 'rgba(255, 87, 51, 0.6)',
      glassPrimary70: 'rgba(255, 87, 51, 0.7)',
      glassPrimary80: 'rgba(255, 87, 51, 0.8)',
      glassPrimary90: 'rgba(255, 87, 51, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 -1px 2px rgba(255, 87, 51, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 87, 51, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 87, 51, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    },
    dark: {
      primary: '#ff7043',
      primaryGlass: 'rgba(255, 112, 67, 0.85)',
      primaryForeground: '#fffbfa',
      background: '#1a0f0d',
      backgroundGlass: 'rgba(26, 15, 13, 0.85)',
      foreground: '#fffbfa',
      card: 'rgba(45, 27, 19, 0.75)',
      cardGlass: 'rgba(45, 27, 19, 0.4)',
      cardForeground: '#fffbfa',
      secondary: 'rgba(61, 43, 35, 0.6)',
      secondaryGlass: 'rgba(61, 43, 35, 0.3)',
      secondaryForeground: '#fffbfa',
      muted: 'rgba(61, 43, 35, 0.7)',
      mutedForeground: '#b8a29a',
      accent: 'rgba(61, 43, 35, 0.6)',
      accentForeground: '#fffbfa',
      border: 'rgba(255, 112, 67, 0.12)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(61, 43, 35, 0.6)',
      inputGlass: 'rgba(61, 43, 35, 0.4)',
      ring: 'rgba(255, 112, 67, 0.3)',
      glassShadowLight: '0 8px 32px rgba(255, 112, 67, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(255, 112, 67, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(255, 112, 67, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(255, 112, 67, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(255, 112, 67, 0.15) 0%, rgba(255, 112, 67, 0.08) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.05)',
      glassWhite15: 'rgba(255, 255, 255, 0.08)',
      glassWhite20: 'rgba(255, 255, 255, 0.1)',
      glassWhite25: 'rgba(255, 255, 255, 0.12)',
      glassWhite30: 'rgba(255, 255, 255, 0.15)',
      glassWhite40: 'rgba(255, 255, 255, 0.2)',
      glassWhite50: 'rgba(255, 255, 255, 0.25)',
      glassWhite60: 'rgba(255, 255, 255, 0.3)',
      glassWhite70: 'rgba(255, 255, 255, 0.4)',
      glassWhite80: 'rgba(255, 255, 255, 0.5)',
      glassWhite90: 'rgba(255, 255, 255, 0.6)',
      glassPrimary05: 'rgba(255, 112, 67, 0.05)',
      glassPrimary10: 'rgba(255, 112, 67, 0.1)',
      glassPrimary15: 'rgba(255, 112, 67, 0.15)',
      glassPrimary20: 'rgba(255, 112, 67, 0.2)',
      glassPrimary25: 'rgba(255, 112, 67, 0.25)',
      glassPrimary30: 'rgba(255, 112, 67, 0.3)',
      glassPrimary40: 'rgba(255, 112, 67, 0.4)',
      glassPrimary50: 'rgba(255, 112, 67, 0.5)',
      glassPrimary60: 'rgba(255, 112, 67, 0.6)',
      glassPrimary70: 'rgba(255, 112, 67, 0.7)',
      glassPrimary80: 'rgba(255, 112, 67, 0.8)',
      glassPrimary90: 'rgba(255, 112, 67, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2)) drop-shadow(0 -1px 2px rgba(255, 112, 67, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 112, 67, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 112, 67, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    }
  },
  
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: '落ち着いたiOS標準の',
    emoji: '🌊',
    colors: {
      primary: '#007aff',
      primaryGlass: 'rgba(0, 122, 255, 0.85)',
      primaryForeground: '#ffffff',
      background: '#f8faff',
      backgroundGlass: 'rgba(248, 250, 255, 0.85)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.75)',
      cardGlass: 'rgba(255, 255, 255, 0.4)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(240, 247, 255, 0.6)',
      secondaryGlass: 'rgba(240, 247, 255, 0.3)',
      secondaryForeground: '#1a2741',
      muted: 'rgba(242, 248, 255, 0.7)',
      mutedForeground: '#5c6b8a',
      accent: 'rgba(240, 247, 255, 0.6)',
      accentForeground: '#1a2741',
      border: 'rgba(0, 122, 255, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.6)',
      inputGlass: 'rgba(255, 255, 255, 0.4)',
      ring: 'rgba(0, 122, 255, 0.3)',
      glassShadowLight: '0 8px 32px rgba(0, 122, 255, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(0, 122, 255, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(0, 122, 255, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(0, 122, 255, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 122, 255, 0.05) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.1)',
      glassWhite15: 'rgba(255, 255, 255, 0.15)',
      glassWhite20: 'rgba(255, 255, 255, 0.2)',
      glassWhite25: 'rgba(255, 255, 255, 0.25)',
      glassWhite30: 'rgba(255, 255, 255, 0.3)',
      glassWhite40: 'rgba(255, 255, 255, 0.4)',
      glassWhite50: 'rgba(255, 255, 255, 0.5)',
      glassWhite60: 'rgba(255, 255, 255, 0.6)',
      glassWhite70: 'rgba(255, 255, 255, 0.7)',
      glassWhite80: 'rgba(255, 255, 255, 0.8)',
      glassWhite90: 'rgba(255, 255, 255, 0.9)',
      glassPrimary05: 'rgba(0, 122, 255, 0.05)',
      glassPrimary10: 'rgba(0, 122, 255, 0.1)',
      glassPrimary15: 'rgba(0, 122, 255, 0.15)',
      glassPrimary20: 'rgba(0, 122, 255, 0.2)',
      glassPrimary25: 'rgba(0, 122, 255, 0.25)',
      glassPrimary30: 'rgba(0, 122, 255, 0.3)',
      glassPrimary40: 'rgba(0, 122, 255, 0.4)',
      glassPrimary50: 'rgba(0, 122, 255, 0.5)',
      glassPrimary60: 'rgba(0, 122, 255, 0.6)',
      glassPrimary70: 'rgba(0, 122, 255, 0.7)',
      glassPrimary80: 'rgba(0, 122, 255, 0.8)',
      glassPrimary90: 'rgba(0, 122, 255, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 -1px 2px rgba(0, 122, 255, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 122, 255, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 122, 255, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    },
    dark: {
      primary: '#0a84ff',
      primaryGlass: 'rgba(10, 132, 255, 0.85)',
      primaryForeground: '#ffffff',
      background: '#0d1421',
      backgroundGlass: 'rgba(13, 20, 33, 0.85)',
      foreground: '#ffffff',
      card: 'rgba(26, 39, 65, 0.75)',
      cardGlass: 'rgba(26, 39, 65, 0.4)',
      cardForeground: '#ffffff',
      secondary: 'rgba(35, 48, 68, 0.6)',
      secondaryGlass: 'rgba(35, 48, 68, 0.3)',
      secondaryForeground: '#ffffff',
      muted: 'rgba(35, 48, 68, 0.7)',
      mutedForeground: '#9ab0d4',
      accent: 'rgba(35, 48, 68, 0.6)',
      accentForeground: '#ffffff',
      border: 'rgba(10, 132, 255, 0.12)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(35, 48, 68, 0.6)',
      inputGlass: 'rgba(35, 48, 68, 0.4)',
      ring: 'rgba(10, 132, 255, 0.3)',
      glassShadowLight: '0 8px 32px rgba(10, 132, 255, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(10, 132, 255, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(10, 132, 255, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(10, 132, 255, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(10, 132, 255, 0.15) 0%, rgba(10, 132, 255, 0.08) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.05)',
      glassWhite15: 'rgba(255, 255, 255, 0.08)',
      glassWhite20: 'rgba(255, 255, 255, 0.1)',
      glassWhite25: 'rgba(255, 255, 255, 0.12)',
      glassWhite30: 'rgba(255, 255, 255, 0.15)',
      glassWhite40: 'rgba(255, 255, 255, 0.2)',
      glassWhite50: 'rgba(255, 255, 255, 0.25)',
      glassWhite60: 'rgba(255, 255, 255, 0.3)',
      glassWhite70: 'rgba(255, 255, 255, 0.4)',
      glassWhite80: 'rgba(255, 255, 255, 0.5)',
      glassWhite90: 'rgba(255, 255, 255, 0.6)',
      glassPrimary05: 'rgba(10, 132, 255, 0.05)',
      glassPrimary10: 'rgba(10, 132, 255, 0.1)',
      glassPrimary15: 'rgba(10, 132, 255, 0.15)',
      glassPrimary20: 'rgba(10, 132, 255, 0.2)',
      glassPrimary25: 'rgba(10, 132, 255, 0.25)',
      glassPrimary30: 'rgba(10, 132, 255, 0.3)',
      glassPrimary40: 'rgba(10, 132, 255, 0.4)',
      glassPrimary50: 'rgba(10, 132, 255, 0.5)',
      glassPrimary60: 'rgba(10, 132, 255, 0.6)',
      glassPrimary70: 'rgba(10, 132, 255, 0.7)',
      glassPrimary80: 'rgba(10, 132, 255, 0.8)',
      glassPrimary90: 'rgba(10, 132, 255, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2)) drop-shadow(0 -1px 2px rgba(10, 132, 255, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(10, 132, 255, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(10, 132, 255, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    }
  },
  
  'nature-green': {
    id: 'nature-green',
    name: 'Nature Green',
    description: '自然で健康的な',
    emoji: '🌿',
    colors: {
      primary: '#34c759',
      primaryGlass: 'rgba(52, 199, 89, 0.85)',
      primaryForeground: '#ffffff',
      background: '#f7fcf8',
      backgroundGlass: 'rgba(247, 252, 248, 0.85)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.75)',
      cardGlass: 'rgba(255, 255, 255, 0.4)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(240, 253, 243, 0.6)',
      secondaryGlass: 'rgba(240, 253, 243, 0.3)',
      secondaryForeground: '#0f2e16',
      muted: 'rgba(243, 254, 245, 0.7)',
      mutedForeground: '#4a6b56',
      accent: 'rgba(240, 253, 243, 0.6)',
      accentForeground: '#0f2e16',
      border: 'rgba(52, 199, 89, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.6)',
      inputGlass: 'rgba(255, 255, 255, 0.4)',
      ring: 'rgba(52, 199, 89, 0.3)',
      glassShadowLight: '0 8px 32px rgba(52, 199, 89, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(52, 199, 89, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(52, 199, 89, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(52, 199, 89, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(52, 199, 89, 0.05) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.1)',
      glassWhite15: 'rgba(255, 255, 255, 0.15)',
      glassWhite20: 'rgba(255, 255, 255, 0.2)',
      glassWhite25: 'rgba(255, 255, 255, 0.25)',
      glassWhite30: 'rgba(255, 255, 255, 0.3)',
      glassWhite40: 'rgba(255, 255, 255, 0.4)',
      glassWhite50: 'rgba(255, 255, 255, 0.5)',
      glassWhite60: 'rgba(255, 255, 255, 0.6)',
      glassWhite70: 'rgba(255, 255, 255, 0.7)',
      glassWhite80: 'rgba(255, 255, 255, 0.8)',
      glassWhite90: 'rgba(255, 255, 255, 0.9)',
      glassPrimary05: 'rgba(52, 199, 89, 0.05)',
      glassPrimary10: 'rgba(52, 199, 89, 0.1)',
      glassPrimary15: 'rgba(52, 199, 89, 0.15)',
      glassPrimary20: 'rgba(52, 199, 89, 0.2)',
      glassPrimary25: 'rgba(52, 199, 89, 0.25)',
      glassPrimary30: 'rgba(52, 199, 89, 0.3)',
      glassPrimary40: 'rgba(52, 199, 89, 0.4)',
      glassPrimary50: 'rgba(52, 199, 89, 0.5)',
      glassPrimary60: 'rgba(52, 199, 89, 0.6)',
      glassPrimary70: 'rgba(52, 199, 89, 0.7)',
      glassPrimary80: 'rgba(52, 199, 89, 0.8)',
      glassPrimary90: 'rgba(52, 199, 89, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 -1px 2px rgba(52, 199, 89, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(52, 199, 89, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(52, 199, 89, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    },
    dark: {
      primary: '#30d158',
      primaryGlass: 'rgba(48, 209, 88, 0.85)',
      primaryForeground: '#ffffff',
      background: '#0a1c0e',
      backgroundGlass: 'rgba(10, 28, 14, 0.85)',
      foreground: '#ffffff',
      card: 'rgba(15, 46, 22, 0.75)',
      cardGlass: 'rgba(15, 46, 22, 0.4)',
      cardForeground: '#ffffff',
      secondary: 'rgba(22, 58, 32, 0.6)',
      secondaryGlass: 'rgba(22, 58, 32, 0.3)',
      secondaryForeground: '#ffffff',
      muted: 'rgba(22, 58, 32, 0.7)',
      mutedForeground: '#86b396',
      accent: 'rgba(22, 58, 32, 0.6)',
      accentForeground: '#ffffff',
      border: 'rgba(48, 209, 88, 0.12)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(22, 58, 32, 0.6)',
      inputGlass: 'rgba(22, 58, 32, 0.4)',
      ring: 'rgba(48, 209, 88, 0.3)',
      glassShadowLight: '0 8px 32px rgba(48, 209, 88, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(48, 209, 88, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(48, 209, 88, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(48, 209, 88, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(48, 209, 88, 0.15) 0%, rgba(48, 209, 88, 0.08) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.05)',
      glassWhite15: 'rgba(255, 255, 255, 0.08)',
      glassWhite20: 'rgba(255, 255, 255, 0.1)',
      glassWhite25: 'rgba(255, 255, 255, 0.12)',
      glassWhite30: 'rgba(255, 255, 255, 0.15)',
      glassWhite40: 'rgba(255, 255, 255, 0.2)',
      glassWhite50: 'rgba(255, 255, 255, 0.25)',
      glassWhite60: 'rgba(255, 255, 255, 0.3)',
      glassWhite70: 'rgba(255, 255, 255, 0.4)',
      glassWhite80: 'rgba(255, 255, 255, 0.5)',
      glassWhite90: 'rgba(255, 255, 255, 0.6)',
      glassPrimary05: 'rgba(48, 209, 88, 0.05)',
      glassPrimary10: 'rgba(48, 209, 88, 0.1)',
      glassPrimary15: 'rgba(48, 209, 88, 0.15)',
      glassPrimary20: 'rgba(48, 209, 88, 0.2)',
      glassPrimary25: 'rgba(48, 209, 88, 0.25)',
      glassPrimary30: 'rgba(48, 209, 88, 0.3)',
      glassPrimary40: 'rgba(48, 209, 88, 0.4)',
      glassPrimary50: 'rgba(48, 209, 88, 0.5)',
      glassPrimary60: 'rgba(48, 209, 88, 0.6)',
      glassPrimary70: 'rgba(48, 209, 88, 0.7)',
      glassPrimary80: 'rgba(48, 209, 88, 0.8)',
      glassPrimary90: 'rgba(48, 209, 88, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2)) drop-shadow(0 -1px 2px rgba(48, 209, 88, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(48, 209, 88, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(48, 209, 88, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    }
  },
  
  'deep-purple': {
    id: 'deep-purple',
    name: 'Deep Purple',
    description: '洗練されたミステリアスな',
    emoji: '🔮',
    colors: {
      primary: '#af52de',
      primaryGlass: 'rgba(175, 82, 222, 0.85)',
      primaryForeground: '#ffffff',
      background: '#faf9ff',
      backgroundGlass: 'rgba(250, 249, 255, 0.85)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.75)',
      cardGlass: 'rgba(255, 255, 255, 0.4)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(248, 244, 255, 0.6)',
      secondaryGlass: 'rgba(248, 244, 255, 0.3)',
      secondaryForeground: '#2a1a3a',
      muted: 'rgba(250, 247, 255, 0.7)',
      mutedForeground: '#6e5a7a',
      accent: 'rgba(248, 244, 255, 0.6)',
      accentForeground: '#2a1a3a',
      border: 'rgba(175, 82, 222, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.6)',
      inputGlass: 'rgba(255, 255, 255, 0.4)',
      ring: 'rgba(175, 82, 222, 0.3)',
      glassShadowLight: '0 8px 32px rgba(175, 82, 222, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(175, 82, 222, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(175, 82, 222, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(175, 82, 222, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(175, 82, 222, 0.1) 0%, rgba(175, 82, 222, 0.05) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.1)',
      glassWhite15: 'rgba(255, 255, 255, 0.15)',
      glassWhite20: 'rgba(255, 255, 255, 0.2)',
      glassWhite25: 'rgba(255, 255, 255, 0.25)',
      glassWhite30: 'rgba(255, 255, 255, 0.3)',
      glassWhite40: 'rgba(255, 255, 255, 0.4)',
      glassWhite50: 'rgba(255, 255, 255, 0.5)',
      glassWhite60: 'rgba(255, 255, 255, 0.6)',
      glassWhite70: 'rgba(255, 255, 255, 0.7)',
      glassWhite80: 'rgba(255, 255, 255, 0.8)',
      glassWhite90: 'rgba(255, 255, 255, 0.9)',
      glassPrimary05: 'rgba(175, 82, 222, 0.05)',
      glassPrimary10: 'rgba(175, 82, 222, 0.1)',
      glassPrimary15: 'rgba(175, 82, 222, 0.15)',
      glassPrimary20: 'rgba(175, 82, 222, 0.2)',
      glassPrimary25: 'rgba(175, 82, 222, 0.25)',
      glassPrimary30: 'rgba(175, 82, 222, 0.3)',
      glassPrimary40: 'rgba(175, 82, 222, 0.4)',
      glassPrimary50: 'rgba(175, 82, 222, 0.5)',
      glassPrimary60: 'rgba(175, 82, 222, 0.6)',
      glassPrimary70: 'rgba(175, 82, 222, 0.7)',
      glassPrimary80: 'rgba(175, 82, 222, 0.8)',
      glassPrimary90: 'rgba(175, 82, 222, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 -1px 2px rgba(175, 82, 222, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(175, 82, 222, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(175, 82, 222, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    },
    dark: {
      primary: '#bf5af2',
      primaryGlass: 'rgba(191, 90, 242, 0.85)',
      primaryForeground: '#ffffff',
      background: '#1a0d21',
      backgroundGlass: 'rgba(26, 13, 33, 0.85)',
      foreground: '#ffffff',
      card: 'rgba(42, 26, 58, 0.75)',
      cardGlass: 'rgba(42, 26, 58, 0.4)',
      cardForeground: '#ffffff',
      secondary: 'rgba(54, 35, 73, 0.6)',
      secondaryGlass: 'rgba(54, 35, 73, 0.3)',
      secondaryForeground: '#ffffff',
      muted: 'rgba(54, 35, 73, 0.7)',
      mutedForeground: '#b89ac4',
      accent: 'rgba(54, 35, 73, 0.6)',
      accentForeground: '#ffffff',
      border: 'rgba(191, 90, 242, 0.12)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(54, 35, 73, 0.6)',
      inputGlass: 'rgba(54, 35, 73, 0.4)',
      ring: 'rgba(191, 90, 242, 0.3)',
      glassShadowLight: '0 8px 32px rgba(191, 90, 242, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(191, 90, 242, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(191, 90, 242, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(191, 90, 242, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(191, 90, 242, 0.15) 0%, rgba(191, 90, 242, 0.08) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.05)',
      glassWhite15: 'rgba(255, 255, 255, 0.08)',
      glassWhite20: 'rgba(255, 255, 255, 0.1)',
      glassWhite25: 'rgba(255, 255, 255, 0.12)',
      glassWhite30: 'rgba(255, 255, 255, 0.15)',
      glassWhite40: 'rgba(255, 255, 255, 0.2)',
      glassWhite50: 'rgba(255, 255, 255, 0.25)',
      glassWhite60: 'rgba(255, 255, 255, 0.3)',
      glassWhite70: 'rgba(255, 255, 255, 0.4)',
      glassWhite80: 'rgba(255, 255, 255, 0.5)',
      glassWhite90: 'rgba(255, 255, 255, 0.6)',
      glassPrimary05: 'rgba(191, 90, 242, 0.05)',
      glassPrimary10: 'rgba(191, 90, 242, 0.1)',
      glassPrimary15: 'rgba(191, 90, 242, 0.15)',
      glassPrimary20: 'rgba(191, 90, 242, 0.2)',
      glassPrimary25: 'rgba(191, 90, 242, 0.25)',
      glassPrimary30: 'rgba(191, 90, 242, 0.3)',
      glassPrimary40: 'rgba(191, 90, 242, 0.4)',
      glassPrimary50: 'rgba(191, 90, 242, 0.5)',
      glassPrimary60: 'rgba(191, 90, 242, 0.6)',
      glassPrimary70: 'rgba(191, 90, 242, 0.7)',
      glassPrimary80: 'rgba(191, 90, 242, 0.8)',
      glassPrimary90: 'rgba(191, 90, 242, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2)) drop-shadow(0 -1px 2px rgba(191, 90, 242, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(191, 90, 242, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(191, 90, 242, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    }
  },
  
  'soft-pink': {
    id: 'soft-pink',
    name: 'Soft Pink',
    description: '優しく親しみやすい',
    emoji: '🌸',
    colors: {
      primary: '#ff2d92',
      primaryGlass: 'rgba(255, 45, 146, 0.85)',
      primaryForeground: '#ffffff',
      background: '#fffafc',
      backgroundGlass: 'rgba(255, 250, 252, 0.85)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.75)',
      cardGlass: 'rgba(255, 255, 255, 0.4)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(255, 244, 249, 0.6)',
      secondaryGlass: 'rgba(255, 244, 249, 0.3)',
      secondaryForeground: '#3a1a2a',
      muted: 'rgba(255, 247, 251, 0.7)',
      mutedForeground: '#7a5a6e',
      accent: 'rgba(255, 244, 249, 0.6)',
      accentForeground: '#3a1a2a',
      border: 'rgba(255, 45, 146, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.2)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.6)',
      inputGlass: 'rgba(255, 255, 255, 0.4)',
      ring: 'rgba(255, 45, 146, 0.3)',
      glassShadowLight: '0 8px 32px rgba(255, 45, 146, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(255, 45, 146, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(255, 45, 146, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(255, 45, 146, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(255, 45, 146, 0.1) 0%, rgba(255, 45, 146, 0.05) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.1)',
      glassWhite15: 'rgba(255, 255, 255, 0.15)',
      glassWhite20: 'rgba(255, 255, 255, 0.2)',
      glassWhite25: 'rgba(255, 255, 255, 0.25)',
      glassWhite30: 'rgba(255, 255, 255, 0.3)',
      glassWhite40: 'rgba(255, 255, 255, 0.4)',
      glassWhite50: 'rgba(255, 255, 255, 0.5)',
      glassWhite60: 'rgba(255, 255, 255, 0.6)',
      glassWhite70: 'rgba(255, 255, 255, 0.7)',
      glassWhite80: 'rgba(255, 255, 255, 0.8)',
      glassWhite90: 'rgba(255, 255, 255, 0.9)',
      glassPrimary05: 'rgba(255, 45, 146, 0.05)',
      glassPrimary10: 'rgba(255, 45, 146, 0.1)',
      glassPrimary15: 'rgba(255, 45, 146, 0.15)',
      glassPrimary20: 'rgba(255, 45, 146, 0.2)',
      glassPrimary25: 'rgba(255, 45, 146, 0.25)',
      glassPrimary30: 'rgba(255, 45, 146, 0.3)',
      glassPrimary40: 'rgba(255, 45, 146, 0.4)',
      glassPrimary50: 'rgba(255, 45, 146, 0.5)',
      glassPrimary60: 'rgba(255, 45, 146, 0.6)',
      glassPrimary70: 'rgba(255, 45, 146, 0.7)',
      glassPrimary80: 'rgba(255, 45, 146, 0.8)',
      glassPrimary90: 'rgba(255, 45, 146, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 -1px 2px rgba(255, 45, 146, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 45, 146, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 45, 146, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
    },
    dark: {
      primary: '#ff375f',
      primaryGlass: 'rgba(255, 55, 95, 0.85)',
      primaryForeground: '#ffffff',
      background: '#210d14',
      backgroundGlass: 'rgba(33, 13, 20, 0.85)',
      foreground: '#ffffff',
      card: 'rgba(58, 26, 42, 0.75)',
      cardGlass: 'rgba(58, 26, 42, 0.4)',
      cardForeground: '#ffffff',
      secondary: 'rgba(73, 35, 54, 0.6)',
      secondaryGlass: 'rgba(73, 35, 54, 0.3)',
      secondaryForeground: '#ffffff',
      muted: 'rgba(73, 35, 54, 0.7)',
      mutedForeground: '#c49ab8',
      accent: 'rgba(73, 35, 54, 0.6)',
      accentForeground: '#ffffff',
      border: 'rgba(255, 55, 95, 0.12)',
      borderGlass: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(73, 35, 54, 0.6)',
      inputGlass: 'rgba(73, 35, 54, 0.4)',
      ring: 'rgba(255, 55, 95, 0.3)',
      glassShadowLight: '0 8px 32px rgba(255, 55, 95, 0.08)',
      glassShadowMedium: '0 12px 40px rgba(255, 55, 95, 0.12)',
      glassShadowHeavy: '0 20px 64px rgba(255, 55, 95, 0.16)',
      glassShadowUltra: '0 32px 96px rgba(255, 55, 95, 0.24)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(255, 55, 95, 0.15) 0%, rgba(255, 55, 95, 0.08) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.05)',
      glassWhite15: 'rgba(255, 255, 255, 0.08)',
      glassWhite20: 'rgba(255, 255, 255, 0.1)',
      glassWhite25: 'rgba(255, 255, 255, 0.12)',
      glassWhite30: 'rgba(255, 255, 255, 0.15)',
      glassWhite40: 'rgba(255, 255, 255, 0.2)',
      glassWhite50: 'rgba(255, 255, 255, 0.25)',
      glassWhite60: 'rgba(255, 255, 255, 0.3)',
      glassWhite70: 'rgba(255, 255, 255, 0.4)',
      glassWhite80: 'rgba(255, 255, 255, 0.5)',
      glassWhite90: 'rgba(255, 255, 255, 0.6)',
      glassPrimary05: 'rgba(255, 55, 95, 0.05)',
      glassPrimary10: 'rgba(255, 55, 95, 0.1)',
      glassPrimary15: 'rgba(255, 55, 95, 0.15)',
      glassPrimary20: 'rgba(255, 55, 95, 0.2)',
      glassPrimary25: 'rgba(255, 55, 95, 0.25)',
      glassPrimary30: 'rgba(255, 55, 95, 0.3)',
      glassPrimary40: 'rgba(255, 55, 95, 0.4)',
      glassPrimary50: 'rgba(255, 55, 95, 0.5)',
      glassPrimary60: 'rgba(255, 55, 95, 0.6)',
      glassPrimary70: 'rgba(255, 55, 95, 0.7)',
      glassPrimary80: 'rgba(255, 55, 95, 0.8)',
      glassPrimary90: 'rgba(255, 55, 95, 0.9)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.2)) drop-shadow(0 -1px 2px rgba(255, 55, 95, 0.1))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 55, 95, 0.05)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 55, 95, 0.1) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    }
  },

  'natural-crystal': {
    id: 'natural-crystal',
    name: 'Natural Crystal',
    description: 'クリスタルのような透明感のある',
    emoji: '💎',
    colors: {
      primary: '#9ca3af',
      primaryGlass: 'rgba(156, 163, 175, 0.75)',
      primaryForeground: '#ffffff',
      background: '#fafafa',
      backgroundGlass: 'rgba(250, 250, 250, 0.75)',
      foreground: 'oklch(0.145 0 0)',
      card: 'rgba(255, 255, 255, 0.65)',
      cardGlass: 'rgba(255, 255, 255, 0.3)',
      cardForeground: 'oklch(0.145 0 0)',
      secondary: 'rgba(249, 250, 251, 0.5)',
      secondaryGlass: 'rgba(249, 250, 251, 0.25)',
      secondaryForeground: '#374151',
      muted: 'rgba(248, 250, 252, 0.6)',
      mutedForeground: '#6b7280',
      accent: 'rgba(249, 250, 251, 0.5)',
      accentForeground: '#374151',
      border: 'rgba(156, 163, 175, 0.06)',
      borderGlass: 'rgba(255, 255, 255, 0.15)',
      input: 'transparent',
      inputBackground: 'rgba(255, 255, 255, 0.5)',
      inputGlass: 'rgba(255, 255, 255, 0.3)',
      ring: 'rgba(156, 163, 175, 0.25)',
      glassShadowLight: '0 8px 32px rgba(156, 163, 175, 0.06)',
      glassShadowMedium: '0 12px 40px rgba(156, 163, 175, 0.08)',
      glassShadowHeavy: '0 20px 64px rgba(156, 163, 175, 0.12)',
      glassShadowUltra: '0 32px 96px rgba(156, 163, 175, 0.18)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(156, 163, 175, 0.08) 0%, rgba(156, 163, 175, 0.03) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.08)',
      glassWhite15: 'rgba(255, 255, 255, 0.12)',
      glassWhite20: 'rgba(255, 255, 255, 0.15)',
      glassWhite25: 'rgba(255, 255, 255, 0.18)',
      glassWhite30: 'rgba(255, 255, 255, 0.22)',
      glassWhite40: 'rgba(255, 255, 255, 0.3)',
      glassWhite50: 'rgba(255, 255, 255, 0.4)',
      glassWhite60: 'rgba(255, 255, 255, 0.5)',
      glassWhite70: 'rgba(255, 255, 255, 0.6)',
      glassWhite80: 'rgba(255, 255, 255, 0.7)',
      glassWhite90: 'rgba(255, 255, 255, 0.85)',
      glassPrimary05: 'rgba(156, 163, 175, 0.03)',
      glassPrimary10: 'rgba(156, 163, 175, 0.06)',
      glassPrimary15: 'rgba(156, 163, 175, 0.09)',
      glassPrimary20: 'rgba(156, 163, 175, 0.12)',
      glassPrimary25: 'rgba(156, 163, 175, 0.15)',
      glassPrimary30: 'rgba(156, 163, 175, 0.18)',
      glassPrimary40: 'rgba(156, 163, 175, 0.25)',
      glassPrimary50: 'rgba(156, 163, 175, 0.35)',
      glassPrimary60: 'rgba(156, 163, 175, 0.45)',
      glassPrimary70: 'rgba(156, 163, 175, 0.55)',
      glassPrimary80: 'rgba(156, 163, 175, 0.65)',
      glassPrimary90: 'rgba(156, 163, 175, 0.75)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.4)) drop-shadow(0 -1px 2px rgba(156, 163, 175, 0.08))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(156, 163, 175, 0.03)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(156, 163, 175, 0.08) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
    },
    dark: {
      primary: '#6b7280',
      primaryGlass: 'rgba(107, 114, 128, 0.75)',
      primaryForeground: '#ffffff',
      background: '#0f0f0f',
      backgroundGlass: 'rgba(15, 15, 15, 0.75)',
      foreground: '#ffffff',
      card: 'rgba(31, 41, 55, 0.65)',
      cardGlass: 'rgba(31, 41, 55, 0.3)',
      cardForeground: '#ffffff',
      secondary: 'rgba(55, 65, 81, 0.5)',
      secondaryGlass: 'rgba(55, 65, 81, 0.25)',
      secondaryForeground: '#ffffff',
      muted: 'rgba(55, 65, 81, 0.6)',
      mutedForeground: '#9ca3af',
      accent: 'rgba(55, 65, 81, 0.5)',
      accentForeground: '#ffffff',
      border: 'rgba(107, 114, 128, 0.08)',
      borderGlass: 'rgba(255, 255, 255, 0.08)',
      input: 'rgba(55, 65, 81, 0.5)',
      inputGlass: 'rgba(55, 65, 81, 0.3)',
      ring: 'rgba(107, 114, 128, 0.25)',
      glassShadowLight: '0 8px 32px rgba(107, 114, 128, 0.06)',
      glassShadowMedium: '0 12px 40px rgba(107, 114, 128, 0.08)',
      glassShadowHeavy: '0 20px 64px rgba(107, 114, 128, 0.12)',
      glassShadowUltra: '0 32px 96px rgba(107, 114, 128, 0.18)',
      glassGradientPrimary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      glassGradientAccent: 'linear-gradient(135deg, rgba(107, 114, 128, 0.12) 0%, rgba(107, 114, 128, 0.06) 100%)',
      glassWhite10: 'rgba(255, 255, 255, 0.03)',
      glassWhite15: 'rgba(255, 255, 255, 0.05)',
      glassWhite20: 'rgba(255, 255, 255, 0.08)',
      glassWhite25: 'rgba(255, 255, 255, 0.1)',
      glassWhite30: 'rgba(255, 255, 255, 0.12)',
      glassWhite40: 'rgba(255, 255, 255, 0.15)',
      glassWhite50: 'rgba(255, 255, 255, 0.2)',
      glassWhite60: 'rgba(255, 255, 255, 0.25)',
      glassWhite70: 'rgba(255, 255, 255, 0.3)',
      glassWhite80: 'rgba(255, 255, 255, 0.4)',
      glassWhite90: 'rgba(255, 255, 255, 0.5)',
      glassPrimary05: 'rgba(107, 114, 128, 0.03)',
      glassPrimary10: 'rgba(107, 114, 128, 0.06)',
      glassPrimary15: 'rgba(107, 114, 128, 0.09)',
      glassPrimary20: 'rgba(107, 114, 128, 0.12)',
      glassPrimary25: 'rgba(107, 114, 128, 0.15)',
      glassPrimary30: 'rgba(107, 114, 128, 0.18)',
      glassPrimary40: 'rgba(107, 114, 128, 0.25)',
      glassPrimary50: 'rgba(107, 114, 128, 0.35)',
      glassPrimary60: 'rgba(107, 114, 128, 0.45)',
      glassPrimary70: 'rgba(107, 114, 128, 0.55)',
      glassPrimary80: 'rgba(107, 114, 128, 0.65)',
      glassPrimary90: 'rgba(107, 114, 128, 0.75)',
      liquidRefraction: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.15)) drop-shadow(0 -1px 2px rgba(107, 114, 128, 0.08))',
      liquidReflection: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(107, 114, 128, 0.03)',
      liquidCaustics: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(107, 114, 128, 0.08) 0%, transparent 40%)',
      liquidShimmer: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
    }
  }
};

export function applyTheme(themeId: ThemeId, isDark: boolean = false) {
  const theme = COLOR_THEMES[themeId];
  if (!theme) return;
  
  const colors = isDark ? theme.dark : theme.colors;
  const root = document.documentElement;
  
  // Apply all color variables with proper CSS variable names
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-glass', colors.primaryGlass);
  root.style.setProperty('--primary-foreground', colors.primaryForeground);
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--background-glass', colors.backgroundGlass);
  root.style.setProperty('--foreground', colors.foreground);
  root.style.setProperty('--card', colors.card);
  root.style.setProperty('--card-glass', colors.cardGlass);
  root.style.setProperty('--card-foreground', colors.cardForeground);
  root.style.setProperty('--secondary', colors.secondary);
  root.style.setProperty('--secondary-glass', colors.secondaryGlass);
  root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--muted-foreground', colors.mutedForeground);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-foreground', colors.accentForeground);
  root.style.setProperty('--border', colors.border);
  root.style.setProperty('--border-glass', colors.borderGlass);
  root.style.setProperty('--input', colors.input);
  root.style.setProperty('--input-background', colors.inputBackground);
  root.style.setProperty('--input-glass', colors.inputGlass);
  root.style.setProperty('--ring', colors.ring);
  
  // Apply glass specific variables
  root.style.setProperty('--glass-shadow-light', colors.glassShadowLight);
  root.style.setProperty('--glass-shadow-medium', colors.glassShadowMedium);
  root.style.setProperty('--glass-shadow-heavy', colors.glassShadowHeavy);
  root.style.setProperty('--glass-shadow-ultra', colors.glassShadowUltra);
  root.style.setProperty('--glass-gradient-primary', colors.glassGradientPrimary);
  root.style.setProperty('--glass-gradient-accent', colors.glassGradientAccent);
  
  // Apply expanded translucent palette
  root.style.setProperty('--glass-white-10', colors.glassWhite10);
  root.style.setProperty('--glass-white-15', colors.glassWhite15);
  root.style.setProperty('--glass-white-20', colors.glassWhite20);
  root.style.setProperty('--glass-white-25', colors.glassWhite25);
  root.style.setProperty('--glass-white-30', colors.glassWhite30);
  root.style.setProperty('--glass-white-40', colors.glassWhite40);
  root.style.setProperty('--glass-white-50', colors.glassWhite50);
  root.style.setProperty('--glass-white-60', colors.glassWhite60);
  root.style.setProperty('--glass-white-70', colors.glassWhite70);
  root.style.setProperty('--glass-white-80', colors.glassWhite80);
  root.style.setProperty('--glass-white-90', colors.glassWhite90);
  
  root.style.setProperty('--glass-primary-05', colors.glassPrimary05);
  root.style.setProperty('--glass-primary-10', colors.glassPrimary10);
  root.style.setProperty('--glass-primary-15', colors.glassPrimary15);
  root.style.setProperty('--glass-primary-20', colors.glassPrimary20);
  root.style.setProperty('--glass-primary-25', colors.glassPrimary25);
  root.style.setProperty('--glass-primary-30', colors.glassPrimary30);
  root.style.setProperty('--glass-primary-40', colors.glassPrimary40);
  root.style.setProperty('--glass-primary-50', colors.glassPrimary50);
  root.style.setProperty('--glass-primary-60', colors.glassPrimary60);
  root.style.setProperty('--glass-primary-70', colors.glassPrimary70);
  root.style.setProperty('--glass-primary-80', colors.glassPrimary80);
  root.style.setProperty('--glass-primary-90', colors.glassPrimary90);
  
  // Apply optical effects
  root.style.setProperty('--liquid-refraction', colors.liquidRefraction);
  root.style.setProperty('--liquid-reflection', colors.liquidReflection);
  root.style.setProperty('--liquid-caustics', colors.liquidCaustics);
  root.style.setProperty('--liquid-shimmer', colors.liquidShimmer);
  
  // Save theme preference
  localStorage.setItem('smartgym-theme', themeId);
  localStorage.setItem('smartgym-dark-mode', isDark.toString());
}

export function getStoredTheme(): { themeId: ThemeId; isDark: boolean } {
  const storedTheme = localStorage.getItem('smartgym-theme') as ThemeId | null;
  const storedDarkMode = localStorage.getItem('smartgym-dark-mode') === 'true';
  
  return {
    themeId: storedTheme || 'warm-orange',
    isDark: storedDarkMode
  };
}