
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
