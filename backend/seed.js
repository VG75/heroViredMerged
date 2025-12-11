import { University, Program, sequelize } from './src/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Create universities
        const universities = await University.bulkCreate([
            {
                name: 'IIT Delhi',
                location: 'New Delhi, India',
                ranking: 1,
                logoColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                description: 'Premier engineering institute in India'
            },
            {
                name: 'IIT Bombay',
                location: 'Mumbai, India',
                ranking: 2,
                logoColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                description: 'Leading technical university'
            },
            {
                name: 'BITS Pilani',
                location: 'Pilani, India',
                ranking: 3,
                logoColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
                description: 'Top private engineering college'
            }
        ]);

        console.log('✅ Universities created');

        // Create programs
        const programs = [
            // IIT Delhi programs
            { universityId: universities[0].id, name: 'M.Tech - Computer Science', degree: 'M.Tech', duration: '2 years', fee: 50000 },
            { universityId: universities[0].id, name: 'MBA', degree: 'MBA', duration: '2 years', fee: 75000 },
            { universityId: universities[0].id, name: 'M.Sc - Data Science', degree: 'M.Sc', duration: '2 years', fee: 45000 },

            // IIT Bombay programs
            { universityId: universities[1].id, name: 'M.Tech - AI & ML', degree: 'M.Tech', duration: '2 years', fee: 55000 },
            { universityId: universities[1].id, name: 'M.Tech - Electrical Engineering', degree: 'M.Tech', duration: '2 years', fee: 50000 },
            { universityId: universities[1].id, name: 'MBA - Technology Management', degree: 'MBA', duration: '2 years', fee: 80000 },

            // BITS Pilani programs
            { universityId: universities[2].id, name: 'M.E - Software Engineering', degree: 'M.E', duration: '2 years', fee: 60000 },
            { universityId: universities[2].id, name: 'MBA', degree: 'MBA', duration: '2 years', fee: 70000 },
            { universityId: universities[2].id, name: 'M.Tech - Cybersecurity', degree: 'M.Tech', duration: '2 years', fee: 65000 }
        ];

        await Program.bulkCreate(programs);
        console.log('✅ Programs created');

        console.log('\n📊 Seed Summary:');
        console.log(`   - ${universities.length} universities`);
        console.log(`   - ${programs.length} programs`);

        await sequelize.close();
        console.log('\n✅ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
