#  Driver & Route Management System

managing drivers and routes with a comprehensive dashboard interface.

##  Features Implemented

### 📊 **Dashboard & Tables**
- **Drivers Management Table**
  - View all drivers with status indicators (Available, On-trip, Off-duty)
  - Rating display with star icons
  - Responsive design for all screen sizes
  - Action menu (Update, Delete, Show All Data)

- **Routes Management Table**
  - View all routes with driver assignments
  - From/To location display
  - Driver name integration


###  **Driver Management**
- **Multi-step Driver Registration Form**
  - Step 1: Basic Information (Name, Phone)
  - Step 2: Vehicle Details (Car Type, City)
  - Form validation with Zod schemas
  - Auto-generation of driver ID and default values
  - Progress indicators and smooth navigation
  - Data persistence to JSON file

- **Driver Details Modal**
  - Comprehensive driver information display
  - Responsive modal design
  - Professional data presentation

### 🛣️ **Route Management**
- **Add Route Form**
  - Route title, From/To locations
  - Driver selection from dropdown
  - Real-time driver data loading
  - Form validation and error handling



### 🔧 **Technical Features**
- **Form Management**
  - React Hook Form integration
  - Zod validation schemas
  - TypeScript type safety
  - Error handling and display

- **State Management**
  - React Context for global state
  - Local storage for persistence
  - JSON file-based data storage
  - Real-time data synchronization

- **API Integration**
  - simple RESTful API endpoints

## 🛠️ Setup Instructions

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drb-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```


### Project Structure
```
drb-task/
├── app/                    # Next.js app router
│   ├── (pages)/           # Page routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── forms/             # Form components
│   ├── tables/            # Table components
│   └── ui/                # UI components
├── data/                  # JSON data files
│   ├── drivers.json       # Drivers data
│   └── routes.json        # Routes data
├── schemas/               # Zod validation schemas
├── context/               # React contexts
├── interfaces/            # TypeScript interfaces
└── lib/                   # Utility functions
```

## 🎯 Assumptions Made

### **Data Storage**
- Used JSON files (`drivers.json`, `routes.json`) for data persistence
- Assumed local file system storage is acceptable for this demo
- Driver and route data structures are predefined and consistent
- driver was updated immediately by end point and updated json file 
- route using context and localstorage 






