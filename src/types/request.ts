export type RequestStatus = 'pending' | 'processing' | 'completed' | 'rejected';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'date' | 'select';
    options?: string[];
    required: boolean;
  }[];
}

export interface DocumentRequest {
  id: string;
  templateId: string;
  userId: string;
  status: RequestStatus;
  data: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  comments?: string[];
}