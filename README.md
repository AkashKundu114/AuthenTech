
# Certificate Verifier (AuthenTech)

Certificate Verifier is a **full-stack application** to verify the authenticity of certificates. It detects fake certificates using **AI, OCR, QR scanning**, performs **digital signature verification**, and provides an **admin dashboard** to monitor verification logs and download certificates. Future updates include **blockchain integration** for secure certificate verification.

---

## Features

### Backend (Spring Boot + MySQL + Security + AI/OCR/QR)
- Certificate verification using OCR and QR code scanning
- **AI-powered forgery detection**
- Digital signature verification
- Verification against uploaded datasets for fraud detection
- University/college database verification
- Admin authentication and secure access
- Verification logs and report generation
- **Future blockchain integration** for tamper-proof certificates

### Frontend (React + Tailwind CSS)
- Upload certificates for verification
- Real-time verification results
- Admin dashboard for:
  - Viewing verification logs
  - Downloading certificates in bulk (original or fake)
  - Monitoring user activities and reports

---

## Project Structure

```
certificate-verifier/
│
├── backend/
│   ├── src/main/java/com/example/certverify/
│   │   ├── controller/      # REST Controllers including AdminController
│   │   ├── service/         # Business logic including AdminService, AIModelService
│   │   ├── model/           # Entities like Admin, User, Certificate
│   │   ├── repository/      # JPA Repositories including AdminRepository
│   │   ├── security/        # JWT & Security configs
│   │   ├── utils/           # Utility classes for OCR, QR, Digital Signatures
│   │   └── exception/       # Custom exceptions
│   └── resources/           # application.properties, schema.sql
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # UploadPage, VerificationResultPage, AdminDashboard
│   │   ├── components/       # Navbar, LogsViewer, AdminLogsTable, CertificateDownload
│   │   ├── utils/            # API helper, Auth helper
│   │   └── styles/           # Tailwind globals
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Getting Started

### Backend
1. Install **Java 17+** and **Maven**.
2. Configure **MySQL database** in `application.properties`.
3. Run the backend:
```
cd backend
mvn spring-boot:run
```

### Frontend
1. Install **Node.js 18+**.
2. Install dependencies:
```
cd frontend
npm install
```
3. Start dev server:
```
npm run dev
```

---

## Admin Dashboard
- Navigate to `/admin/login` to log in.
- View verification logs and download certificates as **original** or **fake**.
- Monitor verified datasets and flagged forgery attempts.

---

## Future Enhancements
- Blockchain-based **secure certificate storage and verification**
- AI model improvements for **better forgery detection**
- Integration with multiple university and college databases
- Automated **digital signature validation** against national registries

---

## License
This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## Contributors
- **Akash Kundu** (Backend Developer)
- Open for community contributions
