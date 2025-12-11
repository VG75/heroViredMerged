import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, CheckCircle, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { applicationService } from '../../services/applicationService';

const activityData = [
  { name: 'Mon', apps: 12 },
  { name: 'Tue', apps: 19 },
  { name: 'Wed', apps: 15 },
  { name: 'Thu', apps: 25 },
  { name: 'Fri', apps: 32 },
  { name: 'Sat', apps: 18 },
  { name: 'Sun', apps: 10 },
];

export const AdminDashboard = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apps = await applicationService.getAllApplications();
        setApplications(apps);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
        <div className="flex gap-2">
          <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-slate-200">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Applications</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">1,247</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">+12.5% from last week</p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Review</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">89</h3>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 font-medium">Requires attention</p>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <AlertOctagon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Verified</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">856</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">94% Accuracy Rate</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Students</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">3,402</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Across 12 Universities</p>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Application Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '8px',
                    color: '#f8fafc'
                  }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="apps" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pending Review</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.slice(0, 4).map((app) => (
              <Link to={`/admin/review/${app.id}`} key={app.id} className="block hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors p-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{app.User?.name || 'Student'}</p>
                  <Badge status={app.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{app.universityName} • {app.programName}</p>
                {app.score && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">AI Score:</span>
                    <span className={`font-bold ${app.score > 90 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>{app.score}%</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};