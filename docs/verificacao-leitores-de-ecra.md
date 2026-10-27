# Verificação com leitores de ecrã

Os testes automáticos (axe e Playwright) apanham uma parte dos problemas de acessibilidade. O resto só se vê a usar o componente com um leitor de ecrã. Esta lista deve ser feita antes de cada versão principal, em pelo menos duas combinações.

## Combinações a testar

| Leitor de ecrã | Navegador | Sistema | Prioridade |
| --- | --- | --- | --- |
| NVDA (gratuito) | Chrome ou Firefox | Windows | Obrigatória |
| VoiceOver | Safari | macOS | Obrigatória se houver Mac |
| TalkBack | Chrome | Android | Recomendada (a maioria dos utilizadores em Angola usa Android) |
| VoiceOver | Safari | iOS | Opcional |

## Preparação

1. `npm run build:docs` e `node scripts/serve-docs.mjs 4300`; abrir `http://localhost:4300`.
2. NVDA: instalar em nvaccess.org. Tecla NVDA = Insert. `NVDA + Espaço` alterna entre modo de navegação e modo de foco. `NVDA + F7` lista ligações, cabeçalhos e regiões.
3. VoiceOver no Mac: `Cmd + F5`. Tecla VO = `Ctrl + Option`. `VO + U` abre o rotor.
4. TalkBack: Definições > Acessibilidade > TalkBack. Deslizar para a direita avança; toque duplo activa.
5. Usar só o teclado (ou só gestos no telemóvel). Não usar o rato.

## Como registar

Para cada linha, marcar OK ou escrever o que foi ouvido. Um problema é qualquer coisa que obrigue a adivinhar: nome em falta, estado não anunciado, foco perdido ou anúncio repetido.

## Componentes

### Select (`/componentes/select`)

- [ ] Ao chegar ao botão ouve-se: label, "caixa de combinação", valor actual e "recolhido".
- [ ] `Seta abaixo` abre; ouve-se "expandido" e a primeira opção ou a escolhida.
- [ ] As setas anunciam cada opção e "seleccionado" na actual.
- [ ] Uma opção desactivada é anunciada como indisponível.
- [ ] `Enter` escolhe, fecha e anuncia o novo valor; o foco fica no botão.
- [ ] Com erro: ouve-se "inválido" e a mensagem de erro.
- [ ] Multi-select: ouve-se "selecção múltipla" e cada opção diz se está marcada.
- [ ] A carregar: ouve-se "ocupado" ou o texto "A carregar...".

### Combobox (`/componentes/combobox`)

- [ ] Ao escrever, a lista é anunciada (número de resultados ou primeira opção) sem perder o texto escrito.
- [ ] As setas anunciam a opção activa enquanto o foco fica no campo.
- [ ] `Enter` escolhe e o valor é lido.
- [ ] `Escape` fecha; um segundo `Escape` limpa e isso é perceptível.
- [ ] Sem resultados: "Sem resultados" é anunciado.

### Date picker (`/componentes/date-picker`)

- [ ] O botão diz "Escolher data" ou "Mudar data, sexta-feira, 13 de novembro de 2026".
- [ ] Ao abrir, o foco vai para um dia e ouve-se a data completa.
- [ ] As setas anunciam cada dia com dia da semana, mês e ano.
- [ ] `Page Down` muda de mês e o novo mês é anunciado.
- [ ] Dias bloqueados são anunciados como indisponíveis.
- [ ] Hoje é identificado ("data actual").
- [ ] `Escape` fecha e o foco volta ao botão.
- [ ] Escrever "31/02/2026" deixa o campo como inválido.

### Dialog e Drawer (`/componentes/dialog`, `/componentes/drawer`)

- [ ] Ao abrir ouve-se "diálogo" (ou "diálogo de alerta"), o título e a descrição.
- [ ] `Tab` nunca sai do diálogo.
- [ ] O conteúdo atrás não é lido em modo de navegação (NVDA) nem com o rotor (VoiceOver).
- [ ] `Escape` fecha (excepto com disableClose) e o foco volta ao botão que abriu.
- [ ] Drawer com alterações: o diálogo "Descartar alterações?" é anunciado por cima.

### Dropdown menu (`/componentes/dropdown-menu`)

- [ ] O botão anuncia "menu" e "recolhido".
- [ ] Ao abrir, o foco vai para a primeira opção; as setas percorrem as opções.
- [ ] Opções com visto anunciam "marcado" ou "não marcado".
- [ ] Submenu: "submenu" é anunciado; seta para a direita entra e para a esquerda sai.
- [ ] `Escape` fecha e o foco volta ao botão.

### Popover e Tooltip (`/componentes/popover`, `/componentes/tooltip`)

- [ ] O botão do popover diz "expandido"/"recolhido"; ao abrir, o foco entra no painel e o nome é lido.
- [ ] `Escape` fecha o popover e devolve o foco.
- [ ] Tooltip: ao focar o botão, ouve-se o nome e depois a descrição do tooltip.
- [ ] No telemóvel, a informação do tooltip existe também noutro lado (nome do botão).

### Tabs (`/componentes/tabs`)

- [ ] Ouve-se "separador, 1 de 3, seleccionado".
- [ ] As setas mudam de separador e o novo conteúdo fica disponível com `Tab`.
- [ ] Separador desactivado é anunciado como indisponível e saltado.

### Toast e Alert (`/componentes/toast`, `/componentes/alert`)

- [ ] Toast de sucesso é lido sem interromper o que está a ser lido.
- [ ] Toast de erro é lido de imediato.
- [ ] A acção do toast ("Anular") é alcançável com `Tab` antes de desaparecer, e o tempo pára enquanto tem foco.
- [ ] Alert estático é lido na ordem da página; o alert com `announce` é lido quando aparece.

### Table (`/componentes/table`)

- [ ] Ao entrar na tabela ouve-se o número de linhas e colunas, e a legenda.
- [ ] Ao navegar por células (`Ctrl + Alt + setas` no NVDA) os cabeçalhos são lidos.
- [ ] Os botões de ordenação dizem a coluna e o sentido ("ascendente").
- [ ] Selecção: cada caixa diz "Seleccionar FT 2026/0143"; a do cabeçalho diz "parcialmente marcado".
- [ ] Paginação: "Página 2" e a página actual é identificada; o resumo "6–10 de 23" é anunciado ao mudar.

### Campos simples

- [ ] Input, Textarea: label, "obrigatório", ajuda e erro lidos ao chegar ao campo.
- [ ] Checkbox: "caixa de verificação, marcada/não marcada/parcialmente marcada".
- [ ] Radio: "botão de opção, 2 de 3"; o título do grupo (legend) é lido ao entrar.
- [ ] Switch: "interruptor, ligado/desligado".
- [ ] Slider: o valor com a unidade ("120 mil kwanzas").
- [ ] OTP: um único campo, "texto editável", e o código colado aparece inteiro.

### Navegação geral do site

- [ ] "Saltar para o conteúdo" é o primeiro elemento e funciona.
- [ ] Regiões: banner, navegação, principal e rodapé aparecem na lista de regiões.
- [ ] Cada página tem um único h1 e os cabeçalhos seguem a ordem.
- [ ] Ctrl+K abre a pesquisa e o número de resultados é anunciado ao escrever.

## Depois da verificação

Abrir uma issue por problema, com: componente, leitor de ecrã e navegador, o que foi feito, o que se ouviu e o que se esperava ouvir.
