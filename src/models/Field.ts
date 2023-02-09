export interface Option {
  key?: string;
  value?: string;
  [key: string]: any;
}

export interface Field {
  id?: string;
  label?: string;
  type?: 'email' | 'text' | 'select' | 'datetime' | 'number' | 'file' | 'image' | 'checkbox';
  placeholder?: string;
  options?: Option[];
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
}
