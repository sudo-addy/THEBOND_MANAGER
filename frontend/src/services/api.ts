import axios, { AxiosInstance } from 'axios';

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
        const token = localStorage.getItem('access_token');
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
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
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

export const api = {
  client,
  auth: {
    register: async (data: any) => {
      const r = await client.post('/auth/register', data);
      return r.data;
    },
    login: async (email: string, password: string) => {
      const r = await client.post('/auth/login', { email, password });
      return r.data;
    },
  },
  bonds: {
    list: async (params?: any) => {
      const q = params ? `?${new URLSearchParams(params).toString()}` : '';
      const r = await client.get(`/bonds${q}`);
      return r.data;
    },
    getById: async (id: string) => {
      const r = await client.get(`/bonds/${id}`);
      return r.data;
    },
  },
  portfolio: {
    get: async () => {
      const r = await client.get('/portfolio');
      return r.data;
    },
    performance: async () => {
      const r = await client.get('/portfolio/performance');
      return r.data;
    }
  },
  trading: {
    buy: async (data: any) => {
      const r = await client.post('/trading/buy', data);
      return r.data;
    },
  },
  payments: {
    deposit: async (data: { amount: number, method: string }) => {
      const r = await client.post('/payments/deposit', data);
      return r.data;
    },
    getBalance: async () => {
      const r = await client.get('/payments/balance');
      return r.data;
    }
  },
  ai: {
    analyze: async (bondId: string) => {
      const r = await client.get(`/ai/analyze/${bondId}`);
      return r.data;
    },
    chat: async (message: string) => {
      const r = await client.post('/ai/chat', { message });
      return r.data;
    }
  }
};
