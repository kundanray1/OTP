/* eslint-disable */

import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios> ;

describe('Verification Form', () => {
  test('renders the verification form', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/Verification code:/i)).toBeTruthy();
  });

  test('pasting a valid 6-digit code fills all inputs', () => {
    const { container, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const inputGroup = container.querySelector('.input-group');
    expect(inputGroup).toBeTruthy();

    fireEvent.paste(inputGroup!, {
      clipboardData: {
        getData: () => '123456'
      }
    });

    const inputs = getAllByRole('textbox');
    const inputValues = inputs.map(input => (input as HTMLInputElement).value);
    expect(inputValues).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  test('shows an error when inputs are incomplete', async () => {
    const { getByRole, findByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const submitButton = getByRole('button', { name: /SUBMIT/i });
    fireEvent.click(submitButton);
    const errorElement = await findByText(/All fields must be filled with numeric values./i);
    expect(errorElement).toBeTruthy();
  });

  test('submits successfully with valid input', async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });
    const { getAllByRole, getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const inputs = getAllByRole('textbox');
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });
    const submitButton = getByRole('button', { name: /SUBMIT/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/verify', { code: '123456' });
    });
  });
});
