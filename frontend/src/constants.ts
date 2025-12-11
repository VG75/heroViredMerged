import { Application, ApplicationStatus, University } from './types';

export const UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'IIT Delhi',
    location: 'New Delhi',
    ranking: 1,
    logoColor: 'bg-red-100 text-red-600',
    programs: [
      { id: 'p1', name: 'Computer Science', degree: 'M.Tech', duration: '2 Years', fee: 50000 },
      { id: 'p2', name: 'Electrical Engineering', degree: 'M.Tech', duration: '2 Years', fee: 50000 },
    ]
  },
  {
    id: '2',
    name: 'IIT Bombay',
    location: 'Mumbai',
    ranking: 2,
    logoColor: 'bg-blue-100 text-blue-600',
    programs: [
      { id: 'p3', name: 'Data Science', degree: 'M.Tech', duration: '2 Years', fee: 60000 },
      { id: 'p4', name: 'MBA', degree: 'Masters', duration: '2 Years', fee: 400000 },
    ]
  },
  {
    id: '3',
    name: 'BITS Pilani',
    location: 'Pilani',
    ranking: 5,
    logoColor: 'bg-yellow-100 text-yellow-600',
    programs: [
      { id: 'p5', name: 'Software Systems', degree: 'M.Tech', duration: '2 Years', fee: 150000 },
    ]
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'APP-2411-00123',
    studentName: 'Rahul Sharma',
    universityName: 'IIT Delhi',
    programName: 'Computer Science',
    status: ApplicationStatus.ADMIN_REVIEW,
    submittedAt: '2024-11-20',
    updatedAt: '2024-11-21',
    feePaid: false,
    score: 92,
    documents: [
      { id: 'd1', name: '10th Marksheet', type: '10th', status: 'VERIFIED', uploadDate: '2024-11-19', aiData: { score: '95%', board: 'CBSE' } },
      { id: 'd2', name: '12th Marksheet', type: '12th', status: 'VERIFIED', uploadDate: '2024-11-19', aiData: { score: '92%', board: 'CBSE' } },
      { id: 'd3', name: 'Aadhar Card', type: 'ID', status: 'PENDING', uploadDate: '2024-11-20' },
    ]
  },
  {
    id: 'APP-2411-00124',
    studentName: 'Priya Singh',
    universityName: 'IIT Bombay',
    programName: 'MBA',
    status: ApplicationStatus.DOCS_PENDING,
    submittedAt: '2024-11-18',
    updatedAt: '2024-11-22',
    feePaid: false,
    score: 85,
    documents: [
      { id: 'd4', name: 'Graduation Degree', type: 'Degree', status: 'REJECTED', rejectionReason: 'Document is blurry', uploadDate: '2024-11-18' },
    ]
  },
  {
    id: 'APP-2411-00125',
    studentName: 'Amit Kumar',
    universityName: 'BITS Pilani',
    programName: 'Software Systems',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-11-15',
    updatedAt: '2024-11-16',
    feePaid: true,
    score: 88,
    documents: [
      { id: 'd5', name: 'All Documents', type: 'Bundle', status: 'VERIFIED', uploadDate: '2024-11-15' }
    ]
  },
  {
    id: 'APP-2411-00126',
    studentName: 'Rahul Sharma',
    universityName: 'IIT Delhi',
    programName: 'Electrical Engineering',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-11-25',
    updatedAt: '2024-11-26',
    feePaid: false,
    score: 89,
    documents: [
      { id: 'd6', name: 'All Documents', type: 'Bundle', status: 'VERIFIED', uploadDate: '2024-11-25' }
    ]
  }
];