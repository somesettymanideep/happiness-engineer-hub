export interface TextTestimonial {
  id: string;
  name: string;
  designation?: string;
  review: string;
  image?: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  designation?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: string;
}
