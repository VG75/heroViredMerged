# UniApply API - Complete Curl Commands Guide

Base URL: `http://localhost:5000/api`

---

## 1. Authentication

### Register Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "john@student.com",
    "password": "test123",
    "role": "STUDENT"
  }'
```

**Response:** Returns `{ token, user }` - **SAVE THE TOKEN!**

### Register Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@student.com",
    "password": "test123"
  }'
```

---

## 2. Applications

**Replace `YOUR_TOKEN_HERE` with actual token from registration/login**

### Create Application (Student)
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "universityName": "IIT Delhi",
    "programName": "M.Tech CSE",
    "personalDetails": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@student.com",
      "statementOfPurpose": "I want to pursue M.Tech in AI/ML"
    }
  }'
```

**Response:** Returns application with `id` - **SAVE THE APPLICATION ID!**

### Get My Applications (Student)
```bash
curl -X GET http://localhost:5000/api/applications/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Applications (Admin)
```bash
curl -X GET http://localhost:5000/api/applications \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get Application by ID
```bash
curl -X GET http://localhost:5000/api/applications/APPLICATION_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Application Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/applications/APPLICATION_ID_HERE/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "status": "VERIFIED",
    "adminComments": "All documents verified successfully"
  }'
```

---

## 3. Documents

### Upload Document (Student)
```bash
curl -X POST http://localhost:5000/api/documents \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/your/document.pdf" \
  -F "applicationId=APPLICATION_ID_HERE" \
  -F "type=MARKSHEET_10"
```

**Document Types:** `MARKSHEET_10`, `MARKSHEET_12`, `AADHAR`, `DRIVER_LICENSE`

### Verify Document (Admin)
```bash
curl -X PUT http://localhost:5000/api/documents/DOCUMENT_ID_HERE/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "status": "VERIFIED",
    "adminComments": "Document is valid and clear"
  }'
```

---

## 4. Support Tickets (NEW!)

### Create Ticket (Student)
```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "subject": "Issue with document upload",
    "description": "I am unable to upload my 12th marksheet. Please help.",
    "category": "DOCUMENT_ISSUE",
    "priority": "HIGH",
    "applicationId": "APPLICATION_ID_HERE"
  }'
```

**Categories:** `DOCUMENT_ISSUE`, `PAYMENT`, `APPLICATION_STATUS`, `TECHNICAL`, `OTHER`  
**Priorities:** `LOW`, `MEDIUM`, `HIGH`, `URGENT`

**Response:** Returns ticket with `id` - **SAVE THE TICKET ID!**

### Get My Tickets (Student)
```bash
curl -X GET http://localhost:5000/api/tickets/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Tickets (Admin)
```bash
curl -X GET http://localhost:5000/api/tickets \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get Tickets by Status (Admin)
```bash
curl -X GET "http://localhost:5000/api/tickets?status=OPEN" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Statuses:** `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`

### Respond to Ticket (Admin)
```bash
curl -X PUT http://localhost:5000/api/tickets/TICKET_ID_HERE/respond \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "response": "We have reviewed your issue. Please try uploading in PNG format instead of PDF.",
    "status": "IN_PROGRESS"
  }'
```

### Close Ticket (Student/Admin)
```bash
curl -X PUT http://localhost:5000/api/tickets/TICKET_ID_HERE/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "CLOSED"
  }'
```

---

## 5. Payments (NEW!)

### Create Payment (Student)
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 1500,
    "type": "APPLICATION_FEE",
    "applicationId": "APPLICATION_ID_HERE"
  }'
```

**Payment Types:**
- `APPLICATION_FEE` - For final application submission
- `ISSUE_RESOLUTION_FEE` - To view admin comments on raised issues

**Response:** Returns payment with `id` - **SAVE THE PAYMENT ID!**

### Process Payment (Student) - Mock Gateway
```bash
curl -X POST http://localhost:5000/api/payments/PAYMENT_ID_HERE/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Note:** This auto-completes payment (mock). Real implementation would redirect to Razorpay/Stripe.

### Get My Payments (Student)
```bash
curl -X GET http://localhost:5000/api/payments/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Payments (Admin)
```bash
curl -X GET http://localhost:5000/api/payments \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## Complete Test Flow Example

### Student Journey:
```bash
# 1. Register
TOKEN=$(curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","email":"test@student.com","password":"test123","role":"STUDENT"}' \
  | jq -r '.token')

# 2. Create Application
APP_ID=$(curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"universityName":"IIT Delhi","programName":"M.Tech CSE","personalDetails":{"firstName":"Test","lastName":"Student","email":"test@student.com"}}' \
  | jq -r '.id')

# 3. Create Ticket
TICKET_ID=$(curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"subject\":\"Need help\",\"description\":\"Please assist\",\"applicationId\":\"$APP_ID\"}" \
  | jq -r '.id')

# 4. Create Payment
PAYMENT_ID=$(curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"amount\":1500,\"type\":\"APPLICATION_FEE\",\"applicationId\":\"$APP_ID\"}" \
  | jq -r '.id')

# 5. Process Payment
curl -X POST http://localhost:5000/api/payments/$PAYMENT_ID/process \
  -H "Authorization: Bearer $TOKEN"

# 6. View My Applications
curl -X GET http://localhost:5000/api/applications/my \
  -H "Authorization: Bearer $TOKEN"
```

### Admin Journey:
```bash
# 1. Register Admin
ADMIN_TOKEN=$(curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"admin123","role":"ADMIN"}' \
  | jq -r '.token')

# 2. View All Applications
curl -X GET http://localhost:5000/api/applications \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 3. View All Tickets
curl -X GET http://localhost:5000/api/tickets \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 4. Respond to Ticket
curl -X PUT http://localhost:5000/api/tickets/$TICKET_ID/respond \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"response":"Issue resolved","status":"RESOLVED"}'

# 5. Update Application Status
curl -X PUT http://localhost:5000/api/applications/$APP_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"status":"VERIFIED","adminComments":"Approved"}'
```

---

## Testing with Postman

1. **Import as Collection**: Save endpoints to Postman
2. **Set Environment Variables**:
   - `base_url`: `http://localhost:5000/api`
   - `student_token`: (from register/login)
   - `admin_token`: (from admin register/login)
3. **Use Variables**: `{{base_url}}/applications` with `Bearer {{student_token}}`

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized, admin only"
}
```

### 404 Not Found
```json
{
  "message": "Application not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## Notes

- All endpoints return JSON
- Tokens don't expire (for simplicity)
- File uploads use `multipart/form-data`
- All other requests use `application/json`
- Redis caching enabled on GET endpoints
- Payment gateway is mocked for testing
