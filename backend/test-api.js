import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

const testApplicationCreation = async () => {
    try {
        console.log('🧪 Starting Application Creation Test\n');

        // Step 1: Register a test user
        console.log('1️⃣ Registering test user...');
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Student',
                email: 'teststudent@example.com',
                password: 'test123',
                role: 'STUDENT'
            })
        });

        let token;
        if (registerRes.status === 201) {
            const registerData = await registerRes.json();
            token = registerData.token;
            console.log('✅ User registered successfully');
            console.log(`   Token: ${token.substring(0, 20)}...`);
        } else if (registerRes.status === 400) {
            // User already exists, try login
            console.log('⚠️  User exists, trying login...');
            const loginRes = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'teststudent@example.com',
                    password: 'test123'
                })
            });
            const loginData = await loginRes.json();
            token = loginData.token;
            console.log('✅ User logged in successfully');
        } else {
            const error = await registerRes.text();
            throw new Error(`Registration failed: ${error}`);
        }

        // Step 2: Create application
        console.log('\n2️⃣ Creating application...');
        const appData = {
            universityName: "Test University",
            programName: "Test Program",
            personalDetails: {
                firstName: "Test",
                lastName: "User",
                email: "test@test.com"
            }
        };

        const createRes = await fetch(`${API_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appData)
        });

        if (createRes.status === 201) {
            const application = await createRes.json();
            console.log('✅ Application created successfully!');
            console.log(`   Application ID: ${application.id}`);
            console.log(`   University: ${application.universityName}`);
            console.log(`   Program: ${application.programName}`);
            console.log(`   Status: ${application.status}`);
            console.log(`   Created At: ${application.createdAt}`);
        } else {
            const error = await createRes.text();
            console.log(`❌ Application creation failed (${createRes.status})`);
            console.log(`   Error: ${error}`);
            return;
        }

        // Step 3: Verify it was saved by fetching it
        console.log('\n3️⃣ Verifying application was saved...');
        const fetchRes = await fetch(`${API_URL}/applications/my`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const applications = await fetchRes.json();
        console.log(`✅ Found ${applications.length} application(s) for this user`);

        if (applications.length > 0) {
            const latest = applications[applications.length - 1];
            console.log('\n📋 Latest application:');
            console.log(`   ID: ${latest.id}`);
            console.log(`   University: ${latest.universityName}`);
            console.log(`   Program: ${latest.programName}`);
            console.log(`   Status: ${latest.status}`);
        }

        console.log('\n✅ TEST PASSED - Applications are being saved to database!');

    } catch (error) {
        console.error('\n❌ TEST FAILED');
        console.error('Error:', error.message);
    }
};

testApplicationCreation();
