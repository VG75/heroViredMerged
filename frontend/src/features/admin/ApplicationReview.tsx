import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Check, X, FileText, Bot } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_APPLICATIONS } from '../../constants';

export const ApplicationReview = () => {
  const { id } = useParams();
  const app = MOCK_APPLICATIONS.find(a => a.id === id) || MOCK_APPLICATIONS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/admin/dashboard" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{app.id}</h1>
            <Badge status={app.status} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{app.universityName} - {app.programName}</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 border-red-200 dark:border-red-900/50">
             <X className="w-4 h-4 mr-2" /> Reject
           </Button>
           <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
             <Check className="w-4 h-4 mr-2" /> Approve Application
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student Info & Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Applicant Information</h3>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">Full Name</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200 mt-1">{app.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">Email</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200 mt-1">student@example.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">Phone</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200 mt-1">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">DOB</p>
                  <p className="font-medium text-slate-900 dark:text-slate-200 mt-1">15 May 1999</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Documents Verification</h3>
              <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <Bot className="w-4 h-4" />
                <span className="font-medium">AI Analysis Completed</span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {app.documents.map((doc) => (
                <div key={doc.id} className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                         <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                       </div>
                       <div>
                         <h4 className="font-medium text-slate-900 dark:text-slate-100">{doc.name}</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400">{doc.type} • Uploaded {doc.uploadDate}</p>
                       </div>
                     </div>
                     <Badge status={doc.status} />
                   </div>

                   {/* AI Insights */}
                   {doc.aiData && (
                     <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700 text-sm">
                       <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-1">
                         <Bot className="w-3 h-3" /> AI Extracted Data
                       </p>
                       <div className="flex gap-4">
                         {Object.entries(doc.aiData).map(([key, value]) => (
                           <div key={key}>
                             <span className="text-slate-400 capitalize">{key}: </span>
                             <span className="font-medium text-slate-900 dark:text-slate-200">{value}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Actions */}
                   <div className="flex gap-2 justify-end">
                     <Button size="sm" variant="outline">View</Button>
                     <Button size="sm" variant="success">Verify</Button>
                     <Button size="sm" variant="danger">Reject</Button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Notes */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
             <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Internal Notes</h3>
             <textarea 
               className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
               placeholder="Add internal notes for other admins..."
             ></textarea>
             <div className="mt-3 flex justify-end">
               <Button size="sm" variant="secondary">Save Note</Button>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
             <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Actions</h3>
             <div className="space-y-2">
               <Button variant="outline" className="w-full justify-start">Email Applicant</Button>
               <Button variant="outline" className="w-full justify-start">Request Changes</Button>
               <Button variant="outline" className="w-full justify-start">Flag for Super Admin</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};