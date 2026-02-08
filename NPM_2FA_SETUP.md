# 🔐 Configuração de 2FA para Publicar no NPM

## ❌ Erro Encontrado
```
403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## 📋 Soluções (escolha UMA):

---

## **Opção 1: Criar Access Token (RECOMENDADO - mais fácil)** ⭐

### Passo a Passo:

1. **Acesse o NPM no navegador:**
   ```
   https://www.npmjs.com/settings/YourUsername/tokens
   ```

2. **Clique em "Generate New Token"**

3. **Escolha o tipo de token:**
   - Selecione: **"Automation"** (para publicação via CLI)
   - OU: **"Publish"** (se disponível)

4. **Configure as permissões:**
   - ✅ Marque: **"Bypasses 2FA"** (bypass two-factor authentication)
   - ✅ Marque: **"Read and Publish"**

5. **Copie o token gerado** (aparece apenas uma vez!)
   ```
   npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **Configure no seu computador:**

   **No PowerShell:**
   ```powershell
   npm config set //registry.npmjs.org/:_authToken SEU_TOKEN_AQUI
   ```

   **Exemplo:**
   ```powershell
   npm config set //registry.npmjs.org/:_authToken npm_A1B2C3D4E5F6G7H8I9J0
   ```

7. **Verifique se funcionou:**
   ```powershell
   npm whoami
   ```

8. **Publique novamente:**
   ```powershell
   cd packages\dist\libs\radio-button
   npm publish --access public
   ```

---

## **Opção 2: Habilitar 2FA no NPM** (mais seguro, mas requer app)

### Passo a Passo:

1. **Instale um app de autenticação no celular:**
   - Google Authenticator
   - Microsoft Authenticator
   - Authy

2. **Acesse suas configurações no NPM:**
   ```
   https://www.npmjs.com/settings/YourUsername/tfa
   ```

3. **Clique em "Enable Two-Factor Authentication"**

4. **Escolha o modo:**
   - **Authorization only** (recomendado) - 2FA apenas para login
   - **Authorization and publishing** - 2FA para login E publicação

5. **Escaneie o QR Code** com o app

6. **Digite o código de 6 dígitos** para confirmar

7. **Salve os códigos de recuperação** em local seguro

8. **Publique usando OTP:**
   ```powershell
   npm publish --access public --otp=123456
   ```
   *(substitua 123456 pelo código do app)*

---

## **Opção 3: Desabilitar 2FA** (NÃO recomendado - menos seguro)

### Passo a Passo:

1. **Acesse:**
   ```
   https://www.npmjs.com/settings/YourUsername/tfa
   ```

2. **Clique em "Disable Two-Factor Authentication"**

3. **Confirme com sua senha**

4. **Publique normalmente:**
   ```powershell
   npm publish --access public
   ```

---

## 🎯 Qual escolher?

| Opção | Segurança | Facilidade | Recomendado |
|-------|-----------|------------|-------------|
| **Access Token** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ SIM |
| **2FA** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ SIM |
| **Desabilitar 2FA** | ⭐ | ⭐⭐⭐⭐⭐ | ❌ NÃO |

---

## 📦 Depois de Configurar

### 1. Teste a publicação:
```powershell
cd packages\dist\libs\radio-button
npm publish --access public
```

### 2. Verifique no NPM:
```
https://www.npmjs.com/package/@agt-ui/radio-button
```

### 3. Instale em outro projeto:
```bash
npm install @agt-ui/radio-button
```

### 4. Use no seu app:
```typescript
import { RadioButtonComponent } from '@agt-ui/radio-button';

@Component({
  imports: [RadioButtonComponent],
  // ...
})
```

---

## 🔧 Comandos Úteis

### Ver tokens configurados:
```powershell
npm token list
```

### Remover token:
```powershell
npm config delete //registry.npmjs.org/:_authToken
```

### Ver configurações:
```powershell
npm config list
```

### Fazer logout:
```powershell
npm logout
```

---

## 📝 Notas Importantes

1. **Tokens são secretos!** Não compartilhe e não commite no Git
2. **Tokens podem expirar** - configure uma data de expiração razoável
3. **Use .npmrc local** para projetos pessoais (não compartilhado)
4. **Use variáveis de ambiente** para CI/CD (GitHub Actions, etc)

---

## 🚀 Próximos Passos

Após publicar com sucesso:

1. ✅ Radio Button publicado → `@agt-ui/radio-button`
2. 📝 Criar build config para Progress e Pagination
3. 📦 Publicar demais componentes
4. 📚 Atualizar documentação com exemplos de instalação
5. 🎉 Compartilhar sua biblioteca com a comunidade!

---

## ❓ Dúvidas Comuns

**P: Posso ter múltiplos tokens?**
R: Sim! Um para cada projeto ou ambiente (dev, CI/CD, etc)

**P: O token expira?**
R: Depende da configuração. Você pode definir a expiração ao criar.

**P: Perdi meu token, e agora?**
R: Revogue o token antigo e crie um novo no site do NPM.

**P: Posso usar o mesmo token em vários computadores?**
R: Pode, mas não é recomendado. Crie tokens específicos para cada máquina.

---

**Escolha a Opção 1 (Access Token) para começar rapidamente!** 🚀
