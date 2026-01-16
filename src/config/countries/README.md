# Country Configuration Guide

This directory contains configuration files for country pages in the Fight World application.

## Adding a New Country

To add a new country page, follow these simple steps:

### 1. Create a Configuration File

Create a new file: `[country-name].config.ts` in this directory.

```typescript
import type { CountryPageConfig } from "@/components/CountryPage/CountryPage.types";

export const [countryName]Config: CountryPageConfig = {
  countryName: "CountryName",
  themeClassName: "country-theme",
  headerTitle: "Your Header Title",
  topFightersTitle: "Your Top Fighters Title",
  topEventsTitle: "Your Top Events Title",
  colorPalette: {
    primary: "#ca2626",        // Main color
    primaryDark: "#780606",    // Darker shade of primary
    primaryLight: "#8a3d3d",   // Lighter shade of primary
    secondary: "#26c954",      // Secondary color
    secondaryDark: "#3d744d",  // Darker shade of secondary
    background: "#031602",     // Page background color
    text: "#faf9f6",          // Text color
    accent: "#faf9f6",        // Accent color
    error: "#d40000",         // Error color
  },
  maxWidth: "1120px",                    // Container max width
  fontFamily: '"Roboto Slab", sans-serif', // Optional custom font
  enableScrollToTop: true,               // Scroll to top on mount
  enableReduxFighters: false,            // Enable Redux fighters feature
};
```

### 2. Export Your Config

Add your new config to `index.ts`:

```typescript
export { [countryName]Config } from "./[country-name].config";
```

### 3. Create the Country Page Component

Create a new file: `src/pages/countries/[CountryName]/[CountryName].tsx`

```typescript
// Data
import { topFightersData } from "./data/topFightersList";
import { topEventsList } from "./data/topEventsList";
import { mainEventFights } from "./data/mainEventsList";

// Components
import CountryPage from "@/components/CountryPage/CountryPage";

// Config
import { [countryName]Config } from "@/config/countries";

const [CountryName] = () => {
  return (
    <CountryPage
      config={[countryName]Config}
      topFightersData={topFightersData}
      topEventsList={topEventsList}
      mainEventFights={mainEventFights}
    />
  );
};

export default [CountryName];
```

### 4. Create Data Files

Create the following data files in `src/pages/countries/[CountryName]/data/`:

- `topFightersList.ts` - Array of top fighters
- `topEventsList.ts` - Array of top events/videos
- `mainEventsList.ts` - Array of main event fights

That's it! Your new country page is ready to use. The styling will automatically adapt to your color palette, and all components will work consistently across all country pages.

## Configuration Options

### Required Fields

- `countryName`: Unique identifier for the country
- `themeClassName`: CSS class name for the theme
- `headerTitle`: Main header title for the page
- `topFightersTitle`: Title for the top fighters section
- `topEventsTitle`: Title for the top events section
- `colorPalette`: Complete color palette object
- `maxWidth`: Maximum width for the content container

### Optional Fields

- `fontFamily`: Custom font family (default: "Roboto Slab", sans-serif)
- `enableScrollToTop`: Scroll to top on component mount (default: false)
- `enableReduxFighters`: Enable Redux fighters integration (default: false)

## Color Palette Tips

- Use a color picker tool to generate harmonious color palettes
- Ensure sufficient contrast between `background` and `text` colors
- The `primary` color is used for buttons and main UI elements
- The `background` color is also used for borders and shadows
- Test your colors for accessibility (WCAG standards)
