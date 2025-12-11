// Mock AI Service until Python service is fully integrated
export const extractDocumentData = async (filePath, docType) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock extraction logic based on docType
            let extractedData = {};
            let verificationStatus = 'VERIFIED';
            let issues = [];

            if (docType.includes('MARKSHEET')) {
                const score = Math.floor(Math.random() * (100 - 60 + 1) + 60);
                extractedData = {
                    studentName: "Mock Student Name", // In real app, OCR this
                    marks: score,
                    passingYear: 2023,
                    board: "CBSE"
                };
                if (score < 40) {
                    verificationStatus = 'REJECTED';
                    issues.push("Low marks");
                }
            } else if (docType === 'AADHAR') {
                extractedData = {
                    aadharNumber: "1234-5678-9012",
                    name: "Mock Student Name",
                    dob: "2000-01-01"
                };
            }

            // randomly simulating an AI flag for low quality
            if (Math.random() > 0.9) {
                verificationStatus = 'ISSUE_RAISED';
                issues.push("Document blurry");
            }

            resolve({
                extractedData,
                verificationStatus,
                issues
            });
        }, 1500); // Simulate processing delay
    });
};
