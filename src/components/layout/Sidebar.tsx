import { useState } from 'react';
import {
  Menu, X, Home, ShoppingCart, Users, Package, DollarSign, BarChart3,
  Settings, FileText, Briefcase, Calendar, ClipboardList, TrendingUp
} from 'lucide-react';
import { useTab } from '../../hooks/useTab';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { openTab, openSalesTab, openCustomerTab, openInventoryTab, openFinancialTab, openReportsTab, openCaixaTab } = useTab();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      action: () => openTab({ label: 'Dashboard', module: 'dashboard' }),
    },
    {
      id: 'vendas',
      label: 'Vendas',
      icon: ShoppingCart,
      submenu: [
        { label: 'Nova Venda', action: openSalesTab },
        { label: 'Caixa Diário', action: openCaixaTab },
        { label: 'Orçamentos', action: () => openTab({ label: 'Orçamentos', module: 'orcamentos' }) },
      ],
    },
    {
      id: 'cadastros',
      label: 'Cadastros',
      icon: Users,
      submenu: [
        { label: 'Clientes', action: openCustomerTab },
        { label: 'Fornecedores', action: () => openTab({ label: 'Fornecedores', module: 'suppliers' }) },
        { label: 'Produtos', action: openInventoryTab },
        { label: 'Funcionários', action: () => openTab({ label: 'Funcionários', module: 'users' }) },
      ],
    },
    {
      id: 'estoque',
      label: 'Estoque',
      icon: Package,
      action: openInventoryTab,
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: DollarSign,
      submenu: [
        { label: 'Contas a Receber', action: () => openTab({ label: 'Contas a Receber', module: 'financial' }) },
        { label: 'Contas a Pagar', action: () => openTab({ label: 'Contas a Pagar', module: 'financial' }) },
        { label: 'Fluxo de Caixa', action: () => openTab({ label: 'Fluxo de Caixa', module: 'financial' }) },
      ],
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: BarChart3,
      action: openReportsTab,
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: Settings,
      submenu: [
        { label: 'Usuários', action: () => openTab({ label: 'Usuários', module: 'users' }) },
        { label: 'Empresa', action: () => openTab({ label: 'Configuração', module: 'settings' }) },
      ],
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-50
          ${open ? 'w-64' : 'w-0'}
          overflow-hidden flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            {open && <span className="font-bold text-lg">InoveSys</span>}
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isExpanded={expandedMenu === item.id}
              onToggle={() => setExpandedMenu(expandedMenu === item.id ? null : item.id)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="h-16 border-t border-slate-800 flex items-center px-4 text-sm text-slate-400">
          <span>v1.0.0</span>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}

interface MenuItemProps {
  item: any;
  isExpanded: boolean;
  onToggle: () => void;
}

function MenuItem({ item, isExpanded, onToggle }: MenuItemProps) {
  const Icon = item.icon;

  if (item.submenu) {
    return (
      <div>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span>{item.label}</span>
          </div>
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ›
          </span>
        </button>

        {isExpanded && (
          <div className="mt-1 ml-3 space-y-1 border-l border-slate-700 pl-3">
            {item.submenu.map((subitem: any, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  subitem.action();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm text-slate-300 hover:text-white"
              >
                {subitem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={item.action}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </button>
  );
}
