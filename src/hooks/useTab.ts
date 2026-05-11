import { useCallback } from 'react';
import { useTabStore } from '../store/tabStore';

interface OpenTabOptions {
  label: string;
  icon?: string;
  module: string;
  params?: Record<string, any>;
  data?: any;
  findExisting?: boolean; // Abrir aba existente se encontrar
}

export function useTab() {
  const store = useTabStore();

  const openTab = useCallback(
    (options: OpenTabOptions) => {
      const { findExisting = true, ...tabOptions } = options;

      if (findExisting) {
        // Procura por uma aba existente com o mesmo módulo e parâmetros
        const existingTab = store.tabs.find(
          (t) =>
            t.module === options.module &&
            JSON.stringify(t.params) === JSON.stringify(options.params)
        );

        if (existingTab) {
          store.setActiveTab(existingTab.id);
          return existingTab.id;
        }
      }

      // Cria nova aba
      return store.openTab(tabOptions);
    },
    [store]
  );

  const openSalesTab = useCallback(
    (saleId?: string) => {
      return openTab({
        label: saleId ? `Venda #${saleId}` : 'Nova Venda',
        module: 'sales',
        params: { saleId },
      });
    },
    [openTab]
  );

  const openCustomerTab = useCallback(
    (customerId?: string) => {
      return openTab({
        label: customerId ? `Cliente #${customerId}` : 'Clientes',
        module: 'customers',
        params: { customerId },
      });
    },
    [openTab]
  );

  const openInventoryTab = useCallback(() => {
    return openTab({
      label: 'Estoque',
      module: 'products',
    });
  }, [openTab]);

  const openFinancialTab = useCallback(() => {
    return openTab({
      label: 'Financeiro',
      module: 'financial',
    });
  }, [openTab]);

  const openReportsTab = useCallback(() => {
    return openTab({
      label: 'Relatórios',
      module: 'reports',
    });
  }, [openTab]);

  const openCaixaTab = useCallback(() => {
    return openTab({
      label: 'Caixa Diário',
      module: 'caixa',
    });
  }, [openTab]);

  const closeCurrentTab = useCallback(() => {
    if (store.activeTabId) {
      store.closeTab(store.activeTabId);
    }
  }, [store]);

  const closeTab = useCallback(
    (tabId: string) => {
      store.closeTab(tabId);
    },
    [store]
  );

  return {
    // Generic
    openTab,
    closeTab,
    closeCurrentTab,

    // Specific module shortcuts
    openSalesTab,
    openCustomerTab,
    openInventoryTab,
    openFinancialTab,
    openReportsTab,
    openCaixaTab,

    // Store methods
    ...store,
  };
}
