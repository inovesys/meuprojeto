# 📥 Download InoveSys ERP Desktop

## ✅ Versão Pronta: 1.0.0

### Arquivo
- **InoveSys-ERP-1.0.0-portable.zip** (140 MB)
- Localização: `/tmp/cc-agent/66432254/project/release/`

### Como Usar

#### Opção 1: Download Direto
```bash
# Copiar arquivo do release
cp /tmp/cc-agent/66432254/project/release/InoveSys-ERP-1.0.0-portable.zip ~/Downloads/
```

#### Opção 2: Extrair e Executar
```bash
# Extrair
unzip InoveSys-ERP-1.0.0-portable.zip

# Executar (no Windows)
cd win-unpacked
"InoveSys ERP.exe"
```

#### Opção 3: via Netlify (Produção)
```
Copiar para: https://inovesys-erp.netlify.app/releases/
- InoveSys-ERP-1.0.0-portable.zip
- latest.yml
```

### Características

✅ **Offline-First**
- Funciona completamente offline
- Sincroniza quando conectado
- Mantém login entre restarts

✅ **Auto-Update**
- Verifica atualizações automaticamente
- Download manual sem bloquear app
- Instala ao reiniciar

✅ **Portável**
- Sem instalação necessária
- Extrair e usar
- Sem registro no Windows

✅ **Integrado**
- Suporta Caixa Diário offline
- Vendas com sync transacional
- Cash register com prioridade

## 📊 Especificações

| Item | Valor |
|------|-------|
| Versão | 1.0.0 |
| Electron | 42.0.0 |
| Tamanho | 140 MB |
| Arch | Windows x64 |
| SHA512 | e6fe4f42b6e68d4b0a50949b83f30c4bec3c60ad9f1bbaae367481e1398e686aa23f708d95b23f30e02d1c760d4667c4ddc331f6cfb1d2f5699dac491353142f |

## 🚀 Deploy para Produção

```bash
# 1. Copiar arquivos para releases endpoint
scp release/InoveSys-ERP-1.0.0-portable.zip user@server:/releases/
scp release/latest.yml user@server:/releases/

# 2. Usuários receberão notificação de update automaticamente
# 3. Próxima versão: atualizar version no package.json e rebuildar
```

## 🔧 Build Local

```bash
npm install
npm run build
npm run electron:build:win
# Resultado: release/InoveSys-ERP-1.0.0-portable.zip
```

## ❓ Suporte

- **Offline não sincroniza?** Verifique conectividade e Sync Status
- **App não inicia?** Execute: `InoveSys ERP.exe` diretamente
- **Relatório de erro?** Verifique DevTools (Ctrl+Shift+I em dev mode)

---

**Status:** ✅ Produção-Ready  
**Data:** 2026-05-11
