import { create } from 'zustand';

export const useTransactionsStore = create(set => ({
  transactions: {},
  updateTransactions: latestTransactions => set({ transactions: latestTransactions }),
}));
