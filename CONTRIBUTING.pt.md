# Contribuir para a Muxima UI

[English](CONTRIBUTING.md) · **Português**

Obrigado pela ajuda. A Muxima UI é mantida por [Aldemiro Valentim](https://www.linkedin.com/in/aldemiro-valentim/).
Documentação: [muxima-ui.pages.dev/pt](https://muxima-ui.pages.dev/pt).

## Antes de começar

- **Erros:** abre uma issue com os passos para o reproduzir, o que esperavas e o que aconteceu,
  e as versões do Angular e da `@muxima-ui/core`.
- **Componentes novos ou mudanças na API:** abre primeiro uma issue e espera pela resposta antes
  de escrever código. Um pull request com um componente novo ou uma mudança incompatível que
  não foi discutida pode ser fechado.
- **Correcções pequenas** (erros de escrita, documentação, um erro com correcção óbvia): envia
  o pull request directamente.
- **Problemas de segurança:** não abras uma issue pública. Escreve para
  [muximaui@gmail.com](mailto:muximaui@gmail.com).

## Regras para pull requests

1. **Uma mudança por pull request.** Não mistures uma correcção com uma refactorização ou
   formatação sem relação.
2. **Parte da `main`** e abre o pull request para a `main`. Ninguém envia directamente para a
   `main`; todas as mudanças passam por um pull request e uma revisão.
3. **Segue o padrão de qualidade** ([/pt/docs/padrao-de-qualidade](https://muxima-ui.pages.dev/pt/docs/padrao-de-qualidade)):
   Angular 21+, HTML nativo primeiro, WAI-ARIA e teclado, formulários, estados completos, só
   tokens (sem cores fixas), API pequena (`variant`, `size`, `disabled`; no máximo 6 variantes e
   3 tamanhos) e testes com axe.
4. **Testes.** Cada correcção traz um teste que falha sem ela. Cada comportamento novo tem
   testes, incluindo teclado e axe.
5. **Documentação nos dois idiomas.** Se a mudança se vê, actualiza as páginas em inglês e em
   português e os exemplos.
6. **Sem mudanças incompatíveis sem discussão.** Se for acordada, descreve-a no pull request e
   no `CHANGELOG.md`.
7. **Sem dependências novas** na `@muxima-ui/core` sem as discutir antes.
8. **O CI tem de passar** (testes, builds, exemplos, axe em todas as páginas, testes end-to-end).
9. **Mensagens de commit** na forma `tipo: resumo`, por exemplo `fix: dialog keeps focus on close`
   ou `feat: add size to the slider`. Tipos: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`.
10. **Sem segredos nem dados privados.** Nunca envies tokens, ficheiros `.env`, endereços
    internos nem dados pessoais reais, nem em exemplos nem em testes. Usa dados inventados.

## Verificar localmente

```bash
npm ci
npm test                 # testes da biblioteca (comportamento, teclado e axe)
npm run build:core       # build da biblioteca
npm run build:docs       # build do site
npm run test:a11y        # axe em todas as páginas, claro e escuro (depois de build:docs)
npm run test:e2e         # testes end-to-end (depois de build:docs)
```

## Revisão

O mantenedor revê todos os pull requests. Pode demorar alguns dias. Podem ser pedidas mudanças
antes de juntar; os pull requests são juntados com "Squash and merge".

## Licença

Ao enviar um pull request aceitas que a tua contribuição é publicada com a
[licença MIT](LICENSE) do projecto.
