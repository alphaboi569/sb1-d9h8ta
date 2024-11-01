import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const requests = [
  {
    id: '1',
    templateId: '1',
    templateName: 'Academic Transcript Request',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00Z',
    data: {
      studentId: '12345',
      purpose: 'Employment',
      deliveryDate: '2024-04-01',
      additionalNotes: 'Urgent request'
    }
  },
  {
    id: '2',
    templateId: '2',
    templateName: 'Enrollment Verification',
    status: 'processing',
    createdAt: '2024-03-14T15:45:00Z',
    data: {
      semester: 'Spring 2024',
      purpose: 'Visa application'
    }
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'processing':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'rejected':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const RequestList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {requests.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIcon status={request.status} />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {request.templateName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created on {format(new Date(request.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <div className="mt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    {Object.entries(request.data).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new request.</p>
          </div>
        )}
      </div>
    </div>
  );
};