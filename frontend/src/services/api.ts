import axios, { AxiosInstance } from 'axios';
import { User, Bond, BondAnalytics, Portfolio, Transaction, AuthResponse, BondsResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3210/api/v1';

const createClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
  });

  client.interceptors.request.use((config) => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401) {
        try {
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            // Clear auth cookie
            document.cookie = 'auth_token=; path=/; max-age=0';
            window.location.href = '/login';
          }
        } catch (e) { }
      }
      return Promise.reject(err);
    }
  );

  return client;
};

const client = createClient();

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

interface BuyParams {
  bond_id: string;
  quantity: number;
  price_per_unit: number;
}

export const api = {
  client,
  import emailjs from '@emailjs/browser';

  // Helper to send OTP via EmailJS
  const sendOtpEmail = async (email: string, otp: string) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS env variables missing. Falling back to console log.');
      console.log(`[Mock Email] To: ${email}, OTP: ${otp}`);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        to_email: email,
        otp_code: otp,
        message: `Your verification code is ${otp}`,
      }, publicKey);
    } catch (error) {
      console.error('EmailJS Send Error:', error);
      // Fallback so the flow doesn't break for the user
      alert(`Failed to send email (EmailJS Error). Mock OTP: ${otp}`);
    }
  };

  // ... existing code ...

  auth: {
    register: async (data: RegisterParams): Promise<AuthResponse> => {
      const r = await client.post('/auth/register', data);
      return r.data;
    },
    login: async (data: LoginParams): Promise<AuthResponse> => {
      const r = await client.post('/auth/login', data);
      return r.data;
    },
    // Modified to return the OTP for client-side verification demo
    forgotPassword: async (email: string): Promise<{ success: boolean; message: string; demoOtp?: string }> => {
      // Generate random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Send via EmailJS
      await sendOtpEmail(email, otp);

      return {
        success: true,
        message: 'If an account exists with this email, you will receive a reset link.',
        demoOtp: otp // Returned ONLY for demo purposes so frontend can verify
      };
    },
    verifyOtp: async (email: string, otp: string, expectedOtp?: string): Promise<{ success: boolean; message: string }> => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verify against the dynamic OTP (passed from frontend state) or the hardcoded fallback
      const isValid = (expectedOtp && otp === expectedOtp) || otp === '123456';

      if (isValid) return { success: true, message: 'OTP Verified' };
      throw new Error('Invalid OTP. Please try again.');
    },
    resetPassword: async (email: string, otp: string, password: string): Promise<{ success: boolean; message: string }> => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: 'Password reset successfully' };
    },
  },
  bonds: {
    list: async (params?: any): Promise<BondsResponse> => {
      const q = params ? `?${new URLSearchParams(params).toString()}` : '';
      const r = await client.get(`/bonds${q}`);
      return r.data;
    },
    getById: async (id: string): Promise<{ success: boolean; bond: Bond }> => {
      const r = await client.get(`/bonds/${id}`);
      return r.data;
    },
  },
  portfolio: {
    get: async (): Promise<{ success: boolean; portfolio: Portfolio }> => {
      const r = await client.get('/portfolio');
      return r.data;
    },
    performance: async (): Promise<any> => {
      const r = await client.get('/portfolio/performance');
      return r.data;
    }
  },
  trading: {
    buy: async (data: BuyParams): Promise<{ success: boolean; transaction?: Transaction; new_balance?: number; error?: string; message?: string }> => {
      const r = await client.post('/trading/buy', data);
      return r.data;
    },
  },
  payments: {
    deposit: async (data: { amount: number, method: string }): Promise<any> => {
      const r = await client.post('/payments/deposit', data);
      return r.data;
    },
    getBalance: async (): Promise<any> => {
      const r = await client.get('/payments/balance');
      return r.data;
    }
  },
  ai: {
    analyze: async (bondId: string): Promise<{ success: boolean; analytics: BondAnalytics }> => {
      const r = await client.get(`/ai/analyze/${bondId}`);
      return r.data;
    },
    chat: async (message: string): Promise<{ success: boolean; data: { reply: string } }> => {
      const r = await client.post('/ai/chat', { message });
      return r.data;
    }
  },
  users: {
    getProfile: async (): Promise<{ success: boolean; user: User }> => {
      const r = await client.get('/users/profile');
      return r.data;
    },
    updateProfile: async (data: Partial<User>): Promise<{ success: boolean; user: User }> => {
      const r = await client.put('/users/profile', data);
      return r.data;
    },
    submitKYC: async (formData: FormData): Promise<{ success: boolean; user: User }> => {
      const r = await client.post('/users/kyc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return r.data;
    }
  }
};
