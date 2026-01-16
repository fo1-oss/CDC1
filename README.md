# CDC Investor Dataroom

A professional investor data room dashboard for **Crep Dog Crew** - India's premier sneaker and streetwear destination.

## Project Structure

```
cdc-investor-dataroom/
├── frontend/                    # Frontend application
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   └── styles.css          # All styles (CDC brand theme)
│   ├── js/
│   │   ├── api.js              # API service module
│   │   ├── charts.js           # ApexCharts configurations
│   │   └── app.js              # Main application logic
│   └── assets/                 # Images and static assets
│
├── backend/                     # Node.js/Express API
│   ├── server.js               # Express server entry point
│   ├── package.json            # Dependencies
│   ├── config/
│   │   └── index.js            # Configuration settings
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── metricsController.js # Business metrics
│   │   ├── documentsController.js # Document management
│   │   └── teamController.js   # Team information
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── metrics.js          # Metrics routes
│   │   ├── documents.js        # Document routes
│   │   └── team.js             # Team routes
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   └── .env.example            # Environment variables template
│
└── README.md                    # This file
```

## Features

- **Access Control**: Gated access with email/organization verification
- **Key Metrics Dashboard**: Real-time business metrics and KPIs
- **Financial Data**: Revenue charts, P&L summary, unit economics
- **Store Performance**: Individual store metrics and product mix
- **Audited Financials**: Historical audited data with visualizations
- **Document Library**: Secure document downloads
- **Team Section**: Founder profiles and contact information

## Tech Stack

### Frontend
- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- ApexCharts for visualizations
- Font Awesome icons
- Inter font family

### Backend
- Node.js
- Express.js
- JWT for authentication
- Helmet for security
- Morgan for logging
- Express Rate Limit

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your settings
# Change JWT_SECRET for production!

# Start development server
npm run dev

# Or start production server
npm start
```

The API will run on `http://localhost:3001`

### Frontend Setup

For development, you can serve the frontend using any static server:

```bash
# Using Python
cd frontend
python -m http.server 3000

# Using Node.js serve package
npx serve frontend -p 3000

# Using VS Code Live Server extension
# Just open index.html and click "Go Live"
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/request-access` - Request dataroom access
- `GET /api/auth/verify` - Verify access token

### Metrics
- `GET /api/metrics/key` - Get key business metrics
- `GET /api/metrics/revenue` - Get revenue data
- `GET /api/metrics/financial-summary` - Get P&L summary
- `GET /api/metrics/stores` - Get store performance data
- `GET /api/metrics/unit-economics` - Get unit economics
- `GET /api/metrics/audited` - Get audited financials

### Documents
- `GET /api/documents` - List available documents
- `GET /api/documents/:id` - Get document metadata
- `GET /api/documents/:id/download` - Download document

### Team
- `GET /api/team` - Get team information
- `GET /api/team/:id` - Get specific team member

## Design System

### Brand Colors
- **Cream** (Background): `#F5F3EB`
- **Lime** (Primary): `#C0E529`
- **Olive**: `#6B8E23`
- **Olive Dark**: `#4A5D23`
- **Olive Darker**: `#3D4A2B`
- **Black**: `#000000`
- **White**: `#FFFFFF`

### Components
- Metric Rows (pill-shaped)
- CDC Cards (rounded with black borders)
- Store Cards (with color variants)
- Document Cards (with hover effects)
- Founder Cards (with avatar initials)

## Production Deployment

### Environment Variables
Set the following in production:
```
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=https://your-domain.com
```

### Security Considerations
1. Use HTTPS in production
2. Set strong JWT secrets
3. Configure proper CORS origins
4. Enable rate limiting
5. Add IP whitelisting if needed
6. Implement proper logging and monitoring

## License

MIT License - Copyright (c) 2026 Crep Dog Crew

## Contact

For investor relations: fo1@crepdogcrew.com
Website: https://crepdogcrew.com
