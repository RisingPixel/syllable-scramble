# 🎯 SYLLABLE

A fast-paced arcade word game where players race against the clock to find words containing a random syllable.

![Game Preview](https://img.shields.io/badge/Platform-Web-blue) ![Languages](https://img.shields.io/badge/Languages-5-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎮 Play Now

[Play on Poki](https://poki.com) | [Live Demo](https://lovable.dev/projects/3bff23fa-d94d-40ba-a5c3-cf488656d0f9)

## 📖 About

SYLLABLE challenges players to find as many words as possible containing a given syllable in just **60 seconds**. With support for 5 languages, an advanced combo system, and shareable challenges, it's designed for quick, addictive gameplay sessions.

### Key Features

- ⏱️ **60-Second Rounds** - Fast-paced gameplay perfect for mobile
- 🌍 **5 Languages** - English, French, Italian, German, Spanish
- 🔥 **Combo System** - Chain words quickly for up to 5x multiplier
- 🏆 **12 Achievements** - From "First Word" to "Combo Master"
- 📈 **Progression System** - Level up and track your XP
- 🎯 **Challenge Mode** - Share custom syllable challenges with friends
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop

## 🎯 How to Play

1. **Start** - A random syllable appears (e.g., "UR")
2. **Type** - Enter words containing that syllable (e.g., "burn", "turtle", "turn")
3. **Score** - Earn points based on word length and bonuses
4. **Combo** - Find words within 5 seconds to build multipliers
5. **Share** - Challenge friends to beat your score

### Scoring System

| Bonus Type | Points |
|------------|--------|
| Base (per letter) | 10 pts |
| Starts with syllable | +5 pts |
| Ends with syllable | +5 pts |
| Syllable appears 2x | +10 pts |
| Rare letters (Q, X, Z, etc.) | +3-5 pts |
| Combo multiplier | 1.5x - 5x |

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State**: React Context
- **Monetization**: Poki SDK
- **Performance**: Service Worker caching, Brotli/Gzip compression

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd syllable-game

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Game.tsx          # Main game component
│   ├── Welcome.tsx       # Start screen
│   ├── Results.tsx       # End game screen
│   ├── Timer.tsx         # Countdown timer
│   ├── WordList.tsx      # Found words display
│   ├── ScorePopup.tsx    # Score feedback
│   └── ui/               # shadcn components
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   └── syllables/        # Syllable sets per language
├── hooks/
│   ├── usePokiSDK.ts     # Poki integration
│   └── use-toast.ts
├── locales/              # i18n translations
├── types/
│   ├── achievements.ts
│   └── i18n.ts
└── utils/
    ├── achievements.ts    # Achievement definitions
    ├── dictionaryLoader.ts
    ├── playerProgress.ts
    ├── scoreCalculator.ts
    └── validateWord.ts

public/
└── dictionaries/         # Word lists (en, fr, it, de, es)
```

## 🌍 Adding a New Language

1. Create syllable file: `src/data/syllables/{lang}.ts`
2. Add translations: `src/locales/{lang}.ts`
3. Add dictionary: `public/dictionaries/{lang}.txt`
4. Update `LanguageContext.tsx` and `syllables/index.ts`

## 🎯 Challenge Mode

Share custom challenges with friends using URL parameters:

```
https://your-game.com/?syl=UR&lang=en
```

Parameters:
- `syl` - The syllable to use
- `lang` - Language code (en, fr, it, de, es)

## 📊 Achievements

| Achievement | Condition | Tier |
|-------------|-----------|------|
| First Steps | Find your first word | 🥉 Bronze |
| Quick Start | Find a word in first 5 seconds | 🥉 Bronze |
| Hot Streak | 5 correct words in a row | 🥈 Silver |
| Speed Demon | 3 words in 10 seconds | 🥈 Silver |
| Word Wizard | Find 15+ words in one game | 🥇 Gold |
| Linguist | Use a word with 10+ letters | 🥇 Gold |
| Combo Master | Reach 5x combo multiplier | 💎 Diamond |
| Time Lord | Finish with 30+ seconds left | 💎 Diamond |

## 🔧 Configuration

### Environment Variables

No environment variables required for basic setup.

### Poki SDK

The game integrates with [Poki SDK](https://sdk.poki.com/) for monetization. Ad breaks are triggered between game sessions.

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome for Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Poki](https://poki.com) - Game distribution platform
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Lovable](https://lovable.dev) - Development platform

---

**Made with ❤️ using [Lovable](https://lovable.dev)**
