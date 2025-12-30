# Inkle Task - Customer data management Dashboard

A modern, feature-rich customer data management dashboard built with React, TypeScript, and TanStack Table. This application provides a comprehensive interface for viewing, filtering, searching, and editing customer information with a focus on user experience and performance.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)

## 🚀 Features

### Core Functionality

- **Advanced Data Table** - Powered by TanStack Table with full sorting, filtering, and pagination support
- **Real-time Search** - Global search across all columns with instant results
- **Multi-select Filters** - Country and gender filters with badge visualization
- **Customer Editing** - In-line edit modal with searchable country selector
- **Data Refresh** - Manual reload button to fetch latest data from API
- **Responsive Design** - Fully responsive layout optimized for all screen sizes

### User Experience

- **Skeleton Loading** - Accurate loading states matching actual table structure
- **Toast Notifications** - Success/error feedback using react-hot-toast
- **3-Ball Loader** - Smooth animated loader during save operations
- **Custom Scrollbars** - Styled webkit scrollbars for better aesthetics
- **Hover States** - Interactive cursor pointers and visual feedback on all interactive elements

### Technical Highlights

- **Modular Architecture** - Fully componentized structure for maintainability
- **Custom Font System** - BeVietnam Regular and SemiBold fonts with utility classes
- **Type Safety** - Comprehensive TypeScript interfaces and type definitions
- **Event System** - Custom event-based communication between components
- **API Integration** - RESTful API with GET and PUT operations
- **Searchable Combobox** - Command component for efficient country selection

## 🛠️ Tech Stack

### Frontend Framework

- **React** 19.2.0 - Modern UI library with hooks
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.2.4 - Next-generation build tool
- **React Router DOM** 7.11.0 - Client-side routing

### UI Components & Styling

- **TanStack Table** 8.21.3 - Headless table library for complex data grids
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **ShadCN UI** - Accessible component library (Dialog, Command, Popover, Button)
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** 0.562.0 - Beautiful icon library
- **react-hot-toast** 2.6.0 - Notification system

### Developer Tools

- **ESLint** 9.39.1 - Code linting and quality
- **TypeScript ESLint** 8.46.4 - TypeScript-specific linting rules
- **Vite Plugin React SWC** 4.2.2 - Fast refresh with SWC

### Utilities

- **class-variance-authority** - CVA for component variants
- **clsx** & **tailwind-merge** - Utility for conditional className joining
- **cmdk** - Command menu component (used in searchable combobox)

## 📁 Project Structure

```
inkle-task/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DContent.tsx          # Main dashboard content orchestrator
│   │   │   └── DHeader.tsx           # Dashboard header
│   │   └── ui/
│   │       ├── dropdowns/
│   │       │   ├── CountryFilterDropdown.tsx  # Country multi-select filter
│   │       │   └── GenderFilterDropdown.tsx   # Gender multi-select filter
│   │       ├── shadcn/                # ShadCN UI components
│   │       │   ├── button.tsx
│   │       │   ├── command.tsx
│   │       │   ├── dialog.tsx
│   │       │   ├── dropdown-menu.tsx
│   │       │   └── popover.tsx
│   │       ├── DataTable.tsx         # Generic reusable table component
│   │       ├── EditCustomerModal.tsx # Customer edit modal with API integration
│   │       ├── PageSizeSelector.tsx  # Page size dropdown (10/20/30/40/50)
│   │       ├── Pagination.tsx        # Pagination controls (<<, <, >, >>)
│   │       ├── SearchBar.tsx         # Global search input with reload button
│   │       ├── TableSkeleton.tsx     # Loading skeleton matching table structure
│   │       └── ThreeBallLoader.tsx   # Animated 3-ball loader
│   ├── contexts/
│   │   └── UsersContext.tsx          # Global state for users and countries
│   ├── lib/
│   │   ├── table-columns.tsx         # TanStack Table column definitions
│   │   └── utils.ts                  # Utility functions (cn helper)
│   ├── pages/
│   │   └── Dashboard.tsx             # Main dashboard page
│   ├── types/
│   │   └── declaration.ts            # TypeScript type definitions
│   ├── App.tsx                       # Root component with routing
│   ├── App.css                       # Global styles, fonts, scrollbars
│   └── main.tsx                      # Application entry point
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite configuration
└── tailwind.config.js                # Tailwind CSS configuration
```

## 🎨 Key Implementation Details

### Column Definitions

The table includes 8 columns with custom rendering:

- **ID** (60px) - Plain text identifier
- **Name** (200px) - Purple text (#5622FF) for visual hierarchy
- **Country** (180px) - With multi-select filter dropdown
- **Gender** (80px) - Badge component with color coding (Male: #BF1A2F, Female: #2D7BB9)
- **Entity** (150px) - Business entity with fallback text
- **Tax** (80px) - Number formatting with locale support
- **Request Date** (140px) - ISO date formatting
- **Edit** (80px) - Pencil icon button triggering edit modal

### Filter System

- **Country Filter**: Multi-select dropdown with selected items displayed at top
- **Gender Filter**: Badge-rendered multi-select matching table styling
- **Global Search**: Real-time search across all table columns
- **Filter Persistence**: Selected filters maintain state during search/sort operations

### Edit Modal Features

- **ShadCN Dialog**: Accessible modal with keyboard navigation
- **Native HTML Inputs**: Custom font inheritance without ShadCN input components
- **Searchable Combobox**: Command + Popover pattern for country selection
- **PUT API Integration**: Updates customer data at `/taxes/:id` endpoint
- **Loading States**: 3-ball animated loader during save operation
- **Toast Notifications**: Success and error feedback
- **Auto-refresh**: Table data refreshes automatically after successful save

### Custom Font System

```css
/* Font Variables */
--font-family-reg: BeVietnam Regular
--font-family-sb: BeVietnam SemiBold

/* Tailwind Utilities */
.font-reg {
  font-family: var(--font-family-reg);
}
.font-sb {
  font-family: var(--font-family-sb);
}
```

### Scrollbar Customization

Custom webkit scrollbar styling for modern browsers:

- Width: 8px
- Track: Light gray (#f1f1f1)
- Thumb: Medium gray (#888) with darker hover (#555)
- Firefox fallback using scrollbar-width: thin

## 🔌 API Integration

### Endpoints

```
Base URL: https://685013d7e7c42cfd17974a33.mockapi.io

GET  /countries     - Fetch all countries
GET  /taxes         - Fetch all customer/tax records
PUT  /taxes/:id     - Update specific customer record
```

### Data Flow

1. **Initial Load**: Parallel fetch of countries and taxes data on mount
2. **Data Normalization**: Transform API data (gender title case, resolve country IDs)
3. **State Management**: React Context provides `cleanedUsers`, `isLoading`, `refetchUsers`
4. **Updates**: PUT request sends full user object with updated fields
5. **Refresh**: Manual or automatic data refetch after mutations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern browser with ES6+ support

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd inkle-task
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open browser to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 🎯 Usage

### Search

- Type in the search bar to filter across all columns
- Click the refresh icon to reload data from API

### Filter

- Click the filter icon on Country or Gender column headers
- Select/deselect items from dropdown
- Use "Clear All" to reset filters
- Dropdowns stay open during selection for convenience

### Sort

- Click on sortable column headers to sort ascending/descending
- Country and Gender columns are filter-only (sorting disabled)

### Edit Customer

- Click the pencil icon in the Edit column
- Update name in text input
- Search and select country from combobox
- Click "Save" to update (shows 3-ball loader)
- Toast notification confirms success/failure
- Table auto-refreshes with updated data

### Pagination

- Use "<<" and ">>" for first/last page
- Use "<" and ">" for previous/next page
- Select entries per page (10, 20, 30, 40, 50)
- Current page indicator shows "Page X of Y"

## 🎨 Design Decisions

### Why Native HTML Inputs?

ShadCN's Label and Input components had hardcoded font weights (font-semibold, font-medium) that overrode custom font utilities. Using native HTML elements ensures proper font inheritance while maintaining accessibility.

### Why Separate Dropdown Components?

Country and Gender filters share similar logic but have different badge rendering and data sources. Separate components improve maintainability while allowing specific customizations.

### Why Custom Event System?

The Edit button in table columns uses `CustomEvent` dispatch to communicate with the parent component. This decouples the column definition from the modal logic, making the table truly reusable.

### Why Table Skeleton Structure?

The skeleton loader imports actual column definitions (`userTableColumns`) to match exact widths and structure. This creates a seamless loading experience where the skeleton morphs into real data.

### Why Combobox Over Select?

With potentially many countries, a searchable combobox provides better UX than scrolling through a long dropdown. The Command component offers built-in keyboard navigation and search.

## 📝 Scripts

```json
{
  "dev": "vite", // Start development server
  "build": "tsc -b && vite build", // Type check and build for production
  "lint": "eslint .", // Run ESLint on codebase
  "preview": "vite preview" // Preview production build locally
}
```

## 🤝 Contributing

This is a task project. For contributions:

1. Maintain TypeScript strict mode compliance
2. Follow existing component patterns
3. Use Tailwind utilities over custom CSS
4. Ensure all interactive elements have cursor-pointer
5. Add proper TypeScript interfaces for new features
6. Test across different screen sizes

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- **TanStack Table** - Incredible headless table library
- **ShadCN UI** - Beautiful, accessible component system
- **Radix UI** - Unstyled primitives for accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Consistent and beautiful icon set

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
