#  KTRH Hospital Website

##  Project Overview
KTRH (Kisii Teaching and Referral Hospital) is a comprehensive hospital website built with modern web technologies. The platform serves as both an informational hub for patients and a management system for hospital operations.

###  Live Sites
- **Frontend (Patient-facing):** https://ktrh.vercel.app/
- **Backend Admin Panel:** https://better-friend-c539968cc5.strapiapp.com/admin

---

##  Architecture

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Frontend │ │ Backend API │ │ Database │
│ (HTML/CSS/JS) │────▶│ (Strapi v4) │────▶│ (PostgreSQL) │
│ Vercel Hosted │ │ Cloud Hosted │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘



##  Project Structure

ktrh-website/
├── index.html # Homepage
├── about.html # About Us page
├── services.html # Medical Services
├── departments.html # Hospital Departments
├── doctors.html # Doctors Directory
├── projects.html # Hospital Projects
├── gallery.html # Media Gallery
├── careers.html # Careers/Jobs
├── contact.html # Contact Us
├── appointment.html # Book Appointments
├── css/ # Stylesheets
│ ├── style.css # Main styles
│ ├── responsive.css # Responsive design
│ └── animations.css # Animations
├── js/ # JavaScript files
│ ├── main.js # Common functionality
│ ├── about.js # About page logic
│ ├── services.js # Services page logic
│ ├── doctors.js # Doctors page logic
│ ├── departments.js # Departments page logic
│ ├── projects.js # Projects page logic
│ ├── gallery.js # Gallery page logic
│ └── appointment.js # Appointment booking
├── images/ # Static images
└── README.md # Documentation



##  Frontend Setup (Local Development)

### Prerequisites

- Git
- Code Editor (VS Code, Cursor, etc.)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ktrh-website.git
   cd ktrh-website
Install live-server


npm install -g live-server
Run the development server


live-server
Opens automatically at: http://localhost:8080

Development Workflow
Edit HTML files in root directory

Edit CSS files in /css

Edit JavaScript files in /js

Changes auto-refresh in the browser

## Pages Overview
### Static Pages (No API Calls)
- **index.html** – Homepage
- **contact.html** – Contact information
- **careers.html** – Job opportunities
- **appointment.html** – Appointment booking

### Dynamic Pages (Strapi-powered)
- **about.html** – About hospital
- **services.html** – Medical services
- **departments.html** – Hospital departments
- **doctors.html** – Doctors directory
- **projects.html** – Hospital projects
- **gallery.html** – Media gallery

## Backend Setup (Strapi CMS)

### Prerequisites
- Strapi Cloud account (for production)
- Node.js (for local development)

### Local Strapi Development
- Create a new Strapi project named `ktrh-backend`
- Set up the required content types:
  - Services
  - Departments
  - Doctors
  - Projects
  - Gallery Items
  - About Page Content

### API Permissions Configuration
- Navigate to **Settings → Users & Permissions → Roles**
- Edit the **Public** role
- Enable the following permissions for all content types:
  - `find`
  - `findOne`

### Running the Backend Locally
- Navigate to the `ktrh-backend` directory
- Start the Strapi development server
- Access the admin panel at:  
  **http://localhost:1337/admin**

## Content Types Structure
###  Services
Each service represents a medical specialty offered by the hospital.

``json
{
  "name": "Cardiology",
  "slug": "cardiology",
  "category": "specialized",
  "icon_class": "fas fa-heartbeat",
  "description": "Comprehensive heart care services...",
  "features": ["Feature 1", "Feature 2"],
  "procedures": ["Procedure 1", "Procedure 2"],
  "contact": {
    "phone": "+254 758 721 997",
    "email": "cardiology@ktrh.or.ke"
  }
}
### Departments

Departments organize hospital services and operational units.

``json
{
  "name": "Cardiology Department",
  "slug": "cardiology",
  "type": "clinical",
  "headOfDepartment": "Dr. Michael Otieno",
  "services": ["Service 1", "Service 2"],
  "equipment": ["Equipment 1", "Equipment 2"],
  "stats": {
    "patientCount": "5000+ annually",
    "successRate": "98%"
  }
}
###  Doctors

Doctors are associated with specific departments and provide specialized medical services.

``json
{
  "name": "Dr. Emily Chen",
  "title": "Senior Cardiologist",
  "department": "Cardiology",
  "experience": "15+ Years",
  "qualifications": ["MD in Cardiology"],
  "expertise": ["Coronary Angioplasty", "Heart Failure"]
}
## API Integration
js
Copy code
const STRAPI_API_URL = 'https://better-friend-c539968cc5.strapiapp.com/api';
js
Copy code
async function fetchServices() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/services?populate=*`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}
## Deployment
Frontend (Vercel)
Static site

No build command

Root output directory

Backend (Strapi Cloud)
PostgreSQL database

Auto-deploy from GitHub

Environment variables configured

## Contributing
Developers
bash
Copy code
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
Content Managers
Use Strapi Admin Panel

Content updates reflect instantly on live site

## Troubleshooting
Common Issues
CORS Errors: Configure allowed origins

API 404: Check permissions & endpoints

Images not loading: Verify media library & permissions

### Mobile Responsiveness
Mobile: 320px – 767px

Tablet: 768px – 1023px

Desktop: 1024px+

## License
Proprietary software owned by Kisii Teaching and Referral Hospital

### Support
Technical Support

Email: techsupport@ktrh.or.ke

Hospital Contact

Phone: +254 758 721 997

Email: info@ktrh.or.ke

Location: Kisii Teaching and Referral Hospital, Kisii, Kenya

## Acknowledgments
Ministry of Health Kenya

Kisii County Government

KTRH Medical Staff

Open-source community

Last Updated: January 2025
Version: 1.0.0
Maintainer: KTRH ICT Department

 https://ktrh.vercel.app/
