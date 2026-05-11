export function Sales({ params }: any) {
  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Vendas</h1>
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <p className="text-slate-600">Módulo de Vendas - Em desenvolvimento</p>
        {params?.saleId && <p className="text-sm text-slate-500 mt-2">Sale ID: {params.saleId}</p>}
      </div>
    </div>
  );
}
