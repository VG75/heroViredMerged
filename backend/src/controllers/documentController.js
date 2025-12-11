import { Document, Application } from '../models/index.js';
import { extractDocumentData } from '../utils/aiService.js';
import path from 'path';

// @desc    Upload a document
// @route   POST /api/documents
// @access  Private (Student)
export const uploadDocument = async (req, res) => {
    try {
        const { applicationId, type } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const application = await Application.findByPk(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user owns application
        if (application.userId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Create Document record
        const document = await Document.create({
            applicationId,
            type,
            url: file.path,
            status: 'PENDING'
        });

        // Trigger AI Extraction (Async)
        // In a real production app, this should be a background job
        extractDocumentData(file.path, type).then(async (result) => {
            document.aiExtractionData = result.extractedData;

            // Auto-verify if AI is confident (Mock logic)
            if (result.verificationStatus === 'VERIFIED') {
                // We can auto-verify or keep it pending for admin. 
                // Requirement says: "AI flags potential issues for admin to check"
                // So we store the AI result but let Admin decide mostly, 
                // OR we can set status if confidence is high.
                // Let's set it to PENDING but attach data.
            } else {
                // Could flag it
                document.adminComments = "AI Alert: " + result.issues.join(", ");
            }
            await document.save();
        });

        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Verify document (Admin)
// @route   PUT /api/documents/:id/verify
// @access  Private (Admin)
export const verifyDocument = async (req, res) => {
    const { status, adminComments } = req.body;

    try {
        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        document.status = status;
        if (adminComments) {
            document.adminComments = adminComments;
        }

        await document.save();

        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
