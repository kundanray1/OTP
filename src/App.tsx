import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import api from './api';
import { toast, ToastContainer } from 'react-toastify';

const CODE_LENGTH = 6;

const App: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits or empty value
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    setError('');

    // Move focus to next input
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting a 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setInputs(pastedData.split(''));
      setError('');
      inputRefs.current[5]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputs.some(input => !/^\d$/.test(input))) {
      setError('All fields must be filled with numeric values.');
      return;
    }

    const code = inputs.join('');
    try {
      const response = await api.post('/verify', { code });
      if (response.status === 200) {
        toast.success('Verification successful! Redirecting...');

        setTimeout(() => {

          navigate('/success');
        }, 1000);
      }
    } catch {
      toast.error('Verification Error');
    }
  };

  return (
    <div className="container">
      <h2>Verification code:</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group" onPaste={handlePaste}>
          {inputs.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`verification-input ${!value ? 'input-error' : ''}`}
            />
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className='submit-container'>
          <button type="submit" className="submit-button">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default App;
