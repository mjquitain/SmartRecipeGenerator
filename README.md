# 🍳 Smart Recipe Generator from Leftover Ingredients

> **Reduce food waste, save money, and discover delicious recipes using ingredients you already have!**

Smart Recipe Generator is a web application designed to help users minimize food waste by suggesting recipes based on available ingredients in their pantry. Track expiry dates, get timely notifications, and generate creative meal ideas before your food goes to waste.

## 🌟 Features

### 🥕 Ingredient Management
- **Add & Track Ingredients**: Easily add ingredients with quantities, categories, and expiry dates
- **Expiry Notifications**: Get alerts for ingredients that are expiring soon or already expired
- **Categorized View**: Organize ingredients by type (Vegetables, Proteins, Dairy, Grains, etc.)
- **Edit & Delete**: Manage your pantry with full CRUD operations

### 🍽️ Recipe Generation
- **Smart Recipe Search**: Generate recipe ideas based on your available ingredients
- **Multiple Recipe Sources**: Integration with TheMealDB API for diverse recipe options
- **Three Recipe Views**:
  - **Generate**: Create new recipes from selected ingredients
  - **Saved**: Access your saved recipe collection
  - **Favorites**: Quick access to your favorite recipes

### 📊 Dashboard & Analytics
- **Quick Statistics**: View recipes generated, food saved, and more
- **Visual Insights**: Track your food waste reduction progress
- **Expiry Calendar**: See upcoming expiry dates at a glance

### 🔔 Smart Notifications
- **Priority Alerts**: Categorized by urgency (Expired, 0-3 days, 4-7 days)
- **Color-Coded Warnings**: Visual indicators for different urgency levels
- **Dismissible Notifications**: Manage alerts as you use ingredients

### 👤 User Profile
- **Profile Management**: Update personal information and preferences
- **Achievement System**: Track milestones and unlock badges
- **Usage Statistics**: View recipes generated, food saved, and days active
- **Account Settings**: Manage password, notifications, and privacy

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript 5.7.2** - Type safety
- **Vite 7.1.12** - Build tool and dev server
- **Mantine 8.3.5** - Component library
- **TanStack React Router 1.132.0** - Client-side routing
- **Lucide React 0.545.0** - Icon library
- **Tailwind CSS 4.0.6** - Utility-first styling

### APIs
- **TheMealDB API** - Recipe data and meal information

### Package Manager
- **pnpm** - Fast, disk space efficient package manager

## 📁 Project Structure

```
SmartRecipeGenerator/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── Header.tsx     # Navigation header with sidebar
│   │   ├── pages/             # Page components
│   │   │   ├── login/         # Login page
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── recipe/        # Recipe browsing (Generate/Saved/Favorites)
│   │   │   ├── ingredients/   # Ingredient management table
│   │   │   ├── notification/  # Expiry notifications
│   │   │   └── profile/       # User profile & settings
│   │   ├── routes/            # Route definitions
│   │   ├── data/              # Mock data for development
│   │   │   └── mock_ingredients_data.js
│   │   ├── utils/             # Helper functions
│   │   │   └── recipeApi.js   # API integration helpers
│   │   ├── integrations/      # Third-party integrations
│   │   ├── main.tsx           # Application entry point
│   │   └── styles.css         # Global styles
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **pnpm** (install via `npm install -g pnpm`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mjquitain/SmartRecipeGenerator.git
   cd SmartRecipeGenerator
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Key Features in Detail

### Expiry Date Tracking
The app calculates and displays:
- Days in storage
- Days until expiry
- Color-coded status (Fresh, Expiring Soon, Expired)

### Recipe API Integration
- Fetches real recipe data from TheMealDB
- Returns meal suggestions with images and instructions
- Plans for multi-ingredient search with Spoonacular API

### Local Storage
- Favorites and saved recipes persist across sessions
- Ingredient data maintained locally (future: backend integration)

## 🔮 Future Enhancements

- [ ] User authentication and backend integration
- [ ] Advanced ingredient-based search with Spoonacular API
- [ ] Recipe details modal with full instructions
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Nutritional information
- [ ] Social features (share recipes, community)
- [ ] Mobile app (React Native)
- [ ] Barcode scanning for quick ingredient entry
- [ ] AI-powered recipe customization

## 👥 Authors

- **mjquitain** - [GitHub Profile](https://github.com/mjquitain)

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) - Free recipe API
- [Mantine](https://mantine.dev/) - Beautiful React components
- [Lucide](https://lucide.dev/) - Clean, consistent icons
- Inspired by the global effort to reduce food waste

---

**Made with 💚 to fight food waste, one recipe at a time.**