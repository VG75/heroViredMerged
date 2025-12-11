import api from '../api/axios';

export interface ApplicationData {
    universityName: string;
    programName: string;
    personalDetails: {
        firstName: string;
        lastName: string;
        email: string;
        statementOfPurpose?: string;
    };
}

export const applicationService = {
    // Get all applications for the logged-in student
    getMyApplications: async () => {
        const { data } = await api.get('/applications/my');
        return data;
    },

    // Get all applications (Admin only)
    getAllApplications: async () => {
        const { data } = await api.get('/applications');
        return data;
    },

    // Get application by ID
    getApplicationById: async (id: string) => {
        const { data } = await api.get(`/applications/${id}`);
        return data;
    },

    // Create new application
    createApplication: async (applicationData: ApplicationData) => {
        const { data } = await api.post('/applications', applicationData);
        return data;
    },

    // Update application status (Admin only)
    updateApplicationStatus: async (id: string, status: string, adminComments?: string) => {
        const { data } = await api.put(`/applications/${id}/status`, {
            status,
            adminComments
        });
        return data;
    },

    // Withdraw application
    withdrawApplication: async (id: string) => {
        const { data } = await api.put(`/applications/${id}/withdraw`);
        return data;
    }
};

export const documentService = {
    // Upload document
    uploadDocument: async (applicationId: string, type: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('applicationId', applicationId);
        formData.append('type', type);

        const { data } = await api.post('/documents', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    },

    // Verify document (Admin only)
    verifyDocument: async (id: string, status: string, adminComments?: string) => {
        const { data } = await api.put(`/documents/${id}/verify`, {
            status,
            adminComments
        });
        return data;
    }
};
