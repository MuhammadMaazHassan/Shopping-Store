# Shopping Store - Full Stack E-commerce

A modern, responsive e-commerce shopping store built with Next.js (frontend) and Express.js (backend).

## Features

- 🛍️ **54+ Products** across 6 categories (Footwear, Apparel, Electronics, Accessories, Home, Fitness)
- 🚚 **Multiple Delivery Options** (Standard FREE, Express $9.99, Overnight $24.99)
- 🛒 **Shopping Cart** with localStorage persistence
- 👤 **User Authentication** (Login/Register)
- 📱 **Fully Responsive** design with animations
- 🎨 **Modern UI** with Tailwind CSS and custom green theme
- ⚡ **Fast Performance** with Next.js optimization

## Project Structure

```
shopping-store-backend/
├── frontend/          # Next.js React application (port 3000)
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React Context for state management
│   ├── data/          # Static product data
│   ├── pages/         # Next.js pages and API routes
│   ├── styles/        # Global CSS and animations
│   └── package.json
├── backend/           # Express.js API server (port 5000)
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── server.js      # Main server file
│   └── package.json
├── start.bat          # Windows batch file to start both servers
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas) - optional for basic functionality
- npm or yarn

### Installation

1. **Clone and navigate to the project:**

   ```bash
   cd shopping-store-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install concurrently and set up both frontend and backend.

### Running the Application

#### Option 1: Run both servers together (Recommended)

```bash
npm run dev
```

This starts both frontend (http://localhost:3000) and backend (http://localhost:5000) simultaneously.

#### Option 2: Run servers separately

**Start the backend:**

```bash
npm run dev:backend
# or
cd backend && npm run dev
```

Backend runs on http://localhost:5000

**Start the frontend:**

```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

Frontend runs on http://localhost:3000

#### Option 3: Windows Batch File

Double-click `start.bat` to start both servers in separate command windows.

### Building for Production

1. **Build the frontend:**

   ```bash
   npm run build:frontend
   npm run start:frontend
   ```

2. **Build the backend:**
   ```bash
   npm run start:backend
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/user/profile` - Get user profile
- `POST /api/orders` - Create order

## Technologies Used

### Frontend

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Context API** - State management

### Backend

- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Features in Detail

### Product Catalog

- 54 products with detailed information
- Category filtering (All, Footwear, Apparel, Electronics, Accessories, Home, Fitness)
- Product ratings and reviews
- Stock availability tracking

### Shopping Experience

- Interactive product detail pages
- Delivery option selection with pricing
- Shopping cart with quantity management
- Order summary and checkout flow

### User Experience

- Smooth animations and transitions
- Responsive design for all devices
- Modern green color scheme
- Intuitive navigation

## Database Setup (Optional)

If you want full database functionality:

1. **Install MongoDB locally** or use MongoDB Atlas
2. **Update `.env` in backend directory:**
   ```
   MONGO_URI=mongodb://localhost:27017/shoppingstore
   JWT_SECRET=your_super_secret_key_change_this
   PORT=5000
   ```

The app works with static data if MongoDB is not available.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
