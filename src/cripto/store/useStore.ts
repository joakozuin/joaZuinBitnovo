import { create } from 'zustand';

interface PaymentStore {
  amountG: string;
  conceptG: string;
  selectedCurrencyG: {  name: string; image: string } | null;
  setAmountG: (amount: string) => void;
  setConceptG: (concept: string) => void;
  setSelectedCurrencyG: (currency: {  name: string; image: string }) => void;
}

export const useStore = create<PaymentStore>((set) => ({
  amountG: '',
  conceptG: '',
  selectedCurrencyG: null,
  setAmountG: (amount) => set({ amountG: amount }),
  setConceptG: (concept) => set({ conceptG: concept }),
  setSelectedCurrencyG: (currency) => set({ selectedCurrencyG: currency }),
}));
