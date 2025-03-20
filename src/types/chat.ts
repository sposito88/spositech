export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

export interface ChatbotProps {
  onClose: () => void;
} 