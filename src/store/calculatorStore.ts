import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CalculatorState {
  accountBalance: string;
  accountCurrency: string;
  riskPercent: string;
  setAccountBalance: (balance: string) => void;
  setAccountCurrency: (currency: string) => void;
  setRiskPercent: (risk: string) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      accountBalance: '1000',
      accountCurrency: 'USD',
      riskPercent: '1',
      setAccountBalance: (balance) => set({ accountBalance: balance }),
      setAccountCurrency: (currency) => set({ accountCurrency: currency }),
      setRiskPercent: (risk) => set({ riskPercent: risk }),
    }),
    {
      name: 'forexhub-calculators', // unique name
    }
  )
);
