# Tasks to be done for making it fully functional Backend

## client (`rebeca.in`)
1. UI development with some animations (less imp)
2. Login Functionality for users (clarity needed)
3. Event Registration functionality with payment
4. Merch payment functionality
### 5. Event Registration Functionality
### 5.1 Single Registration
1. Name
2. Email
3. Phone
4. College Name (if Non IIESTian)
5. Payment Screenshot (if Non IIESTian)
### 5.2 Team Registration
5.1 plus
6. Team Name
7. Team members

## Admin (`admin.rebeca.in`)
The website needs to have an authentication. Only Rebeca Official Email is allowed to enter.
Form needed for:
### 1. Event Addition
Form fields:
1. Event Name
2. Description
3. StartTime and Endtime
4. Venue
5. Rules list 
6. Type (team event or single)
7. Poster
8. RegistrationFee
9. Gallery Images
10. Main Coordinators:
    - Member Name
    - Profile Pic

### 2. Team addition
Form Fields:
1. Member Name
2. Profile Pic
3. Role
4. Team Name

```
instruo-backend/
├── controllers/
│   ├── admin/
│   │   ├── eventController.js
│   │   ├── teamController.js
│   │   └── authController.js
│   ├── user/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── merchController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Event.js
│   ├── Team.js
│   ├── User.js
│   └── Registration.js
├── routes/
│   ├── adminRoutes.js
│   ├── userRoutes.js
│   └── index.js
├── services/
│   ├── paymentService.js
│   ├── emailService.js
│   └── fileService.js
├── utils/
│   ├── constants.js
│   ├── logger.js
│   └── validation.js
├── config/
│   ├── database.js
│   ├── cloudinary.js
│   └── env.js
├── tests/
│   ├── controllers/
│   ├── routes/
│   └── utils/
├── app.js
├── server.js
└── package.json
```