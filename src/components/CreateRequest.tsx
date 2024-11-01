import React, { useState } from 'react';
import { FileText, Send } from 'lucide-react';
import { format } from 'date-fns';

const templates = [
  {
    id: '1',
    name: 'Academic Transcript Request',
    description: 'Request an official academic transcript',
    fields: [
      {
        name: 'studentId',
        label: 'Student ID',
        type: 'text',
        required: true
      },
      {
        name: 'purpose',
        label: 'Purpose of Request',
        type: 'select',
        options: ['Employment', 'Further Education', 'Personal Records'],
        required: true
      },
      {
        name: 'deliveryDate',
        label: 'Required By',
        type: 'date',
        required: true
      },
      {
        name: 'additionalNotes',
        label: 'Additional Notes',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: '2',
    name: 'Enrollment Verification',
    description: 'Request a verification of current enrollment status',
    fields: [
      {
        name: 'semester',
        label: 'Semester',
        type: 'select',
        options: ['Fall 2024', 'Spring 2024', 'Summer 2024'],
        required: true
      },
      {
        name: 'purpose',
        label: 'Purpose',
        type: 'text',
        required: true
      }
    ]
  }
];

export const CreateRequest: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const template = templates.find(t => t.id === selectedTemplate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the request
    console.log('Submitting request:', {
      templateId: selectedTemplate,
      data: formData,
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-white shadow sm:rounded-lg p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Send className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Request submitted successfully!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your request has been submitted and is being processed.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSelectedTemplate('');
                setFormData({});
                setSubmitted(false);
              }}
              className="btn btn-primary"
            >
              Create Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Create New Request</h1>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-6">
          {!selectedTemplate ? (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Select a Document Template</h2>
              <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 cursor-pointer"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : template ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">{template.name}</h2>
                <p className="text-sm text-gray-500">{template.description}</p>
                
                {template.fields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="mt-1">
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="input"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'date' ? (
                        <input
                          type="date"
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="input"
                        />
                      ) : (
                        <input
                          type="text"
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="input"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplate('');
                    setFormData({});
                  }}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};