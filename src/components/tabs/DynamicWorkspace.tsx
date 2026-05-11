import { lazy, Suspense } from 'react';
import { useTabStore } from '../../store/tabStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

// Lazy load module components
const moduleComponents: Record<string, any> = {
  sales: lazy(() => import('../sales/Sales')),
  customers: lazy(() => import('../customers/Customers')),
  products: lazy(() => import('../inventory/Inventory')),
  suppliers: lazy(() => import('../inventory/Inventory')),
  financial: lazy(() => import('../financial/Financial')),
  reports: lazy(() => import('../reports/Reports')),
  users: lazy(() => import('../users/Users')),
  crediario: lazy(() => import('../crediario/Crediario')),
  orcamentos: lazy(() => import('../orcamentos/Orcamentos')),
  caixa: lazy(() => import('../caixa/CaixaDiario')),
  // Adicionar mais conforme necessário
};

export function DynamicWorkspace() {
  const { tabs, activeTabId } = useTabStore();

  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Nenhuma aba aberta</h2>
          <p className="text-slate-600">Clique em um menu para abrir uma nova aba</p>
        </div>
      </div>
    );
  }

  const Component = moduleComponents[activeTab.module];

  if (!Component) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Módulo não encontrado</h2>
          <p className="text-slate-600">O módulo "{activeTab.module}" não está disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <LoadingSpinner message={`Carregando ${activeTab.label}...`} />
          </div>
        }
      >
        <div className="flex-1 overflow-hidden">
          <Component params={activeTab.params} tabData={activeTab.data} />
        </div>
      </Suspense>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
