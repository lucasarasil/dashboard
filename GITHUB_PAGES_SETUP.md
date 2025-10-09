# Configuração do GitHub Pages

## Passos para ativar o GitHub Pages

1. Vá até o repositório no GitHub: `https://github.com/lucasarasil/dashboard`

2. Clique em **Settings** (Configurações)

3. No menu lateral, clique em **Pages**

4. Em **Build and deployment**:

   - **Source**: Selecione "GitHub Actions"

5. Faça commit e push deste código para a branch `main`

6. O workflow será executado automaticamente e o site estará disponível em:
   ```
   https://lucasarasil.github.io/dashboard
   ```

## Como funciona

- O workflow `.github/workflows/deploy.yml` é executado automaticamente a cada push na branch `main`
- O projeto é buildado com `npm run build`
- O conteúdo da pasta `build` é publicado no GitHub Pages

## Deploy manual (alternativo)

Se preferir fazer deploy manual via comando:

```bash
npm run deploy
```

Este comando usa o pacote `gh-pages` que já está configurado no `package.json`.

## Verificar status do deploy

Você pode verificar o status do deploy em:

- **Actions** tab no GitHub: `https://github.com/lucasarasil/dashboard/actions`

## Problemas comuns

### Página em branco

- Verifique se o `homepage` no `package.json` está correto
- Certifique-se de que está usando rotas relativas (BrowserRouter com basename)

### Erro 404 em rotas

- GitHub Pages não suporta SPA routing nativamente
- Considere adicionar um arquivo `404.html` ou usar Hash Router
