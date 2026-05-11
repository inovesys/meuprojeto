# 🚀 Comece Agora - InoveSys ERP Desktop v1.0.0

## 📥 Download Rápido

```bash
# Local
cd /tmp/cc-agent/66432254/project
ls -lh release/InoveSys-ERP-1.0.0-portable.zip
```

**Arquivo:** `InoveSys-ERP-1.0.0-portable.zip` (140 MB)  
**Local:** `/tmp/cc-agent/66432254/project/release/`

## ⚡ Instalação (30 segundos)

### Windows

1. Extrair o ZIP em uma pasta (ex: `C:\InoveSys\`)
2. Abrir `win-unpacked` folder
3. Double-click em `InoveSys ERP.exe`
4. Aguardar ~2s (splash screen)
5. App abre e sincroniza automático

### macOS/Linux

```bash
unzip InoveSys-ERP-1.0.0-portable.zip
cd win-unpacked
# (Não suportado ainda neste OS, mas estrutura pronta)
```

## ✅ Testar Offline

### Cenário 1: Abrir Caixa
```
1. Login (username@example.com / password)
2. Menu → Caixa Diário
3. Clique "Abrir Caixa" (mesmo offline funciona)
4. Vê caixa salvo em tempo real
5. Reconectar: sincroniza automaticamente
```

### Cenário 2: Vender Offline
```
1. Caixa aberto
2. Menu → Vendas → Nova Venda
3. Adicionar produtos
4. Finalizar (salva offline)
5. Reconectar: sync automático
```

### Cenário 3: Persistência
```
1. Fazer login
2. Fechar app (Ctrl+Q ou click X)
3. Reabrir app
4. ✅ Mantém login! (localStorage persistente)
```

## 🔄 Auto-Update

- App verifica updates automáticos
- Se houver novo: notifica usuário
- User clica "Baixar" (não bloqueia)
- Após download: pedido para reiniciar
- Próximo start: instala automático

## 📊 Status Dashboard

No app, verifique:
- **Sync Status** (botão no canto inferior)
- **Offline Indicator** (topo da tela)
- **Storage Info** (se abrir DevTools)

## 🛠️ Troubleshooting

| Problema | Solução |
|----------|---------|
| App não inicia | Execute como Admin; verifique antivírus |
| Offline não sincroniza | Verifique conexão; veja Sync Status |
| Perdeu login | Verificar localStorage (DevTools) |
| Update não funciona | Verificar URL em `electron-builder.json` |

## 📖 Documentação Completa

- **RELEASE_NOTES.md** - Release notes e changelog
- **DOWNLOAD.md** - Deploy e distribuição
- **.bolt/ELECTRON_FINAL.md** - Documentação técnica
- **CLAUDE.md** - Arquitectura do projeto (vem depois)

## 🔧 Desenvolvimento Local

```bash
# Dev mode (hot reload)
npm run dev

# Build para produção
npm run build

# Build Electron desktop
npm run electron:build:win

# Resultado em: release/InoveSys-ERP-1.0.0-portable.zip
```

## 🎯 Arquitetura Resumida

```
Electron (42.0.0)
├── Main Process (seguro)
├── Preload API (IPC segura)
└── Renderer (React + Tailwind)
    ├── Supabase JS (API)
    ├── IndexedDB (offline cache)
    └── Sync Queue (transacional)
```

## 📦 O Que Funciona Agora

✅ **Frontend Web**
- Todas features de web app
- UI completa português-BR
- Responsive design

✅ **Offline-First**
- IndexedDB com 50MB
- Sync automático priorizado
- Transações atômicas

✅ **Desktop Exclusive**
- Tray icon
- Auto-update
- Native menus
- Hybrid loading (web + local)

✅ **Auth**
- Login/logout
- Session persistence
- LocalStorage automático

## 🚀 Próximas Versões

- **1.0.1:** Code signing, delta updates
- **1.1:** NSIS installer, macOS/Linux
- **1.2:** Biometria, cloud backup

## 📞 Suporte

- Docs: `.bolt/ELECTRON_FINAL.md`
- Issues: [GitHub Issues]
- Email: support@inovesys.com

---

**Versão:** 1.0.0  
**Status:** ✅ Production-Ready  
**Updated:** 2026-05-11  

Aproveite! 🎉
