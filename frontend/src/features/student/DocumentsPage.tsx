import React, { useState } from 'react';
import { FileText, Upload, Shield, Download, Trash2, Eye, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocStatus = 'MISSING' | 'UPLOADING' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'OPTIONAL';

interface StudentDocument {
  id: string;
  title: string;
  description: string;
  status: DocStatus;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  rejectionReason?: string;
  icon: React.ElementType;
}

const INITIAL_DOCS: StudentDocument[] = [
  {
    id: '10th_marksheet',
    title: '10th Class Marksheet',
    description: 'Official marksheet issued by your secondary education board.',
    status: 'VERIFIED',
    fileName: 'rahul_10th_final.pdf',
    fileSize: '2.4 MB',
    uploadDate: '20 Nov 2024',
    icon: FileText
  },
  {
    id: '12th_marksheet',
    title: '12th Class Marksheet',
    description: 'Official marksheet issued by your higher secondary education board.',
    status: 'MISSING',
    icon: FileText
  },
  {
    id: 'govt_id',
    title: 'Government Identity Proof',
    description: 'Valid IDs: Aadhar Card, Passport',
    status: 'REJECTED',
    rejectionReason: 'Image was blurry and ID number was not visible. Please re-upload a clear copy.',
    fileName: 'my_aadhar_scan.jpg',
    fileSize: '4.1 MB',
    uploadDate: '22 Nov 2024',
    icon: Shield
  },
  {
    id: 'secondary_id',
    title: 'Secondary ID Proof',
    description: 'Driver License, Voter ID, or PAN Card. Useful for additional identity verification.',
    status: 'OPTIONAL',
    icon: CreditCard
  }
];

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<StudentDocument[]>(INITIAL_DOCS);

  const handleUpload = (id: string) => {
    // Simulate upload process
    setDocuments(prev => prev.map(doc => {
      if (doc.id === id) return { ...doc, status: 'UPLOADING' };
      return doc;
    }));

    setTimeout(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.id === id) {
          return {
            ...doc,
            status: 'PENDING',
            fileName: `uploaded_${doc.id}.pdf`,
            fileSize: '1.8 MB',
            uploadDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            rejectionReason: undefined // Clear rejection reason if re-uploading
          };
        }
        return doc;
      }));
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Documents</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your educational and identity documents. These will be used for all your university applications.</p>
      </div>

      <div className="grid gap-6">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className={`
              relative overflow-hidden rounded-xl border p-6 transition-all duration-200
              ${(doc.status === 'MISSING' || doc.status === 'OPTIONAL') ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-dashed' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'}
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Icon Section */}
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
                ${doc.status === 'VERIFIED' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 
                  doc.status === 'REJECTED' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                  doc.status === 'OPTIONAL' ? 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500' :
                  'bg-blue-50 dark:bg-blue-900/20 text-brand-600 dark:text-brand-400'}
              `}>
                <doc.icon className="w-8 h-8" />
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doc.title}</h3>
                  <Badge status={doc.status} />
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{doc.description}</p>
                
                {doc.status === 'REJECTED' && (
                  <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span><span className="font-semibold">Action Required:</span> {doc.rejectionReason}</span>
                  </div>
                )}

                {(doc.status === 'VERIFIED' || doc.status === 'PENDING') && (
                  <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {doc.fileName}
                    </span>
                    <span>{doc.fileSize}</span>
                    <span>• Uploaded on {doc.uploadDate}</span>
                  </div>
                )}
              </div>

              {/* Action Section */}
              <div className="flex flex-col sm:flex-row gap-3 md:items-center">
                 {doc.status === 'MISSING' || doc.status === 'REJECTED' || doc.status === 'UPLOADING' || doc.status === 'OPTIONAL' ? (
                   <Button 
                    onClick={() => handleUpload(doc.id)} 
                    isLoading={doc.status === 'UPLOADING'}
                    variant={doc.status === 'OPTIONAL' ? 'outline' : 'primary'}
                    className="min-w-[140px]"
                   >
                     <Upload className="w-4 h-4 mr-2" />
                     {doc.status === 'UPLOADING' ? 'Uploading...' : 'Upload File'}
                   </Button>
                 ) : (
                   <>
                     <Button variant="outline" size="sm" className="text-slate-600 dark:text-slate-300">
                       <Eye className="w-4 h-4 mr-2" /> Preview
                     </Button>
                     {doc.status !== 'VERIFIED' && (
                       <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     )}
                   </>
                 )}
              </div>
            </div>

            {/* Verification Watermark for Verified Docs */}
            {doc.status === 'VERIFIED' && (
              <div className="absolute -top-3 -right-3 text-green-100 dark:text-green-900/20 rotate-12 pointer-events-none">
                <CheckCircle2 className="w-32 h-32" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Document Guidelines</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300">
          <li>Documents must be in PDF, JPG, or PNG format.</li>
          <li>Maximum file size allowed is 5MB per document.</li>
          <li>Ensure scanned copies are clear and all text is readable.</li>
        </ul>
      </div>
    </div>
  );
};