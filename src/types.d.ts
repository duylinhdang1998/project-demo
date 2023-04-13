type Status = 'idle' | 'loading' | 'success' | 'failure';

type OnFailureWithMessageOfStatusCode = (message: string) => void;
