import { create } from 'zustand';

interface PaymentStore {
  amount: string;
  concept: string;
  selectedCurrency: { value: string; name: string; image: string } | null;
  setAmount: (amount: string) => void;
  setConcept: (concept: string) => void;
  setSelectedCurrency: (currency: { value: string; name: string; image: string }) => void;
}

export const useStore = create<PaymentStore>((set) => ({
  amount: '',
  concept: '',
  selectedCurrency: null,
  setAmount: (amount) => set({ amount }),
  setConcept: (concept) => set({ concept }),
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
}));
