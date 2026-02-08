# 🏢 Como Criar a Organização @muxima-ui no NPM

## 📋 Passo a Passo

### Opção 1: Via Website (RECOMENDADO) ⭐

1. **Acesse o NPM:**
   ```
   https://www.npmjs.com/org/create
   ```

2. **Faça login** se necessário com sua conta `jokerscript`

3. **Preencha os dados:**
   - **Organization Name:** `muxima-ui`
   - **Organization Email:** seu-email@example.com
   - **Choose a plan:**
     - ✅ **Free** - Para pacotes públicos (RECOMENDADO)
     - 💰 **Paid** - Se quiser pacotes privados

4. **Clique em "Create"**

5. **Pronto!** Agora você pode publicar pacotes como `@muxima-ui/*`

---

### Opção 2: Via CLI

```powershell
npm org create muxima-ui
```

**Siga as instruções interativas:**
- Escolha o plano (Free para pacotes públicos)
- Confirme o email

---

## 🎯 Depois de Criar

### 1. Adicione membros (opcional)
```
https://www.npmjs.com/settings/muxima-ui/members
```

### 2. Configure permissões
- **Owner** - Você (jokerscript)
- **Members** - Outros desenvolvedores (se houver)

### 3. Republique os pacotes
Depois de criar a organização, vou:
1. Atualizar todos os `package.json` para `@muxima-ui/*`
2. Adicionar links da documentação Vercel
3. Rebuildar os componentes
4. Republicar no NPM

---

## 📝 Planos do NPM

| Plano | Custo | Pacotes Públicos | Pacotes Privados |
|-------|-------|------------------|------------------|
| **Free** | $0/mês | ✅ Ilimitados | ❌ Não |
| **Pro** | $7/mês | ✅ Ilimitados | ✅ Ilimitados |
| **Teams** | $7/usuário/mês | ✅ Ilimitados | ✅ Ilimitados |

**Para Muxima UI:** Use o plano **Free** (pacotes públicos são suficientes)

---

## 🔗 Links Úteis

- **Criar Organização:** https://www.npmjs.com/org/create
- **Documentação NPM Orgs:** https://docs.npmjs.com/orgs
- **Gerenciar Organização:** https://www.npmjs.com/settings/muxima-ui/packages

---

## ⚠️ Importante

1. **Não delete os pacotes @jokerscript** ainda - vamos deprecá-los depois
2. **Nome da organização** deve ser único no NPM
3. **Email de verificação** pode ser necessário

---

## ✅ Checklist

- [ ] Acessar https://www.npmjs.com/org/create
- [ ] Criar organização `muxima-ui`
- [ ] Escolher plano Free
- [ ] Confirmar email se solicitado
- [ ] Avisar quando estiver pronto

**Depois que criar, me avise que eu atualizo tudo e republico! 🚀**
