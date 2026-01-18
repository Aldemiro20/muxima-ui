# Stats Card Component

Componente elegante para exibir métricas, KPIs e estatísticas com ícones, tendências e sparklines.

## Características

- 📊 **Métricas Visuais**: Exibe valores com ícones e formatação clara
- 📈 **Tendências**: Indicadores de variação com cores semânticas (verde/vermelho)
- ✨ **Sparklines**: Mini-gráficos para visualizar evolução de dados
- 🎨 **5 Variantes de Cor**: Primary, Success, Warning, Danger, Info
- 📏 **3 Tamanhos**: Small, Medium, Large
- ⏳ **Estado de Loading**: Skeleton screen durante carregamento
- 🎯 **Tema Roxo**: Gradiente #667eea → #764ba2
- 📱 **Responsivo**: Adaptação automática para mobile

## Instalação

```typescript
import { StatsCardComponent } from '@muxima-ui/stats-card';

@Component({
  standalone: true,
  imports: [StatsCardComponent],
  // ...
})
```

## Uso Básico

```html
<muxima-stats-card
  label="Total Revenue"
  value="$45,231"
  icon="💰"
  [trend]="12.5"
  trendLabel="vs last month"
  color="primary">
</muxima-stats-card>
```

## Com Sparkline

```html
<muxima-stats-card
  label="Active Users"
  value="2,543"
  icon="👥"
  [trend]="8.2"
  trendLabel="this week"
  [sparklineData]="[120, 132, 125, 145, 150, 165, 170, 180, 185, 195, 200, 210]"
  color="success">
</muxima-stats-card>
```

## Props

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `label` | string | '' | Rótulo descritivo da métrica |
| `value` | string \| number | '' | Valor principal da métrica |
| `icon` | string | '' | Emoji ou ícone para identificação visual |
| `trend` | number | 0 | Percentual de variação (positivo ou negativo) |
| `trendLabel` | string | '' | Descrição do período de comparação |
| `color` | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'primary' | Cor do tema do card |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | Tamanho do card |
| `loading` | boolean | false | Exibe estado de carregamento |
| `sparklineData` | number[] | [] | Array de valores para o gráfico sparkline |

## Variantes de Cor

- **Primary**: Roxo (#667eea → #764ba2)
- **Success**: Verde (#10b981)
- **Warning**: Laranja (#f59e0b)
- **Danger**: Vermelho (#ef4444)
- **Info**: Azul (#3b82f6)

## Dashboard Example

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
  <muxima-stats-card
    label="Total Revenue"
    value="$45,231"
    icon="💰"
    [trend]="12.5"
    [sparklineData]="revenueData"
    color="primary">
  </muxima-stats-card>

  <muxima-stats-card
    label="Active Users"
    value="2,543"
    icon="👥"
    [trend]="8.2"
    [sparklineData]="usersData"
    color="success">
  </muxima-stats-card>

  <muxima-stats-card
    label="Total Orders"
    value="1,234"
    icon="📦"
    [trend]="-3.1"
    [sparklineData]="ordersData"
    color="info">
  </muxima-stats-card>

  <muxima-stats-card
    label="Bounce Rate"
    value="35.2%"
    icon="📊"
    [trend]="-4.8"
    [sparklineData]="bounceData"
    color="warning">
  </muxima-stats-card>
</div>
```

## Casos de Uso

- **Dashboards Analíticos**: KPIs de receita, usuários, conversões
- **Painéis Administrativos**: Vendas, pedidos, estoque
- **Relatórios Executivos**: Métricas de negócio com tendências
- **Performance Tracking**: Metas e objetivos com indicadores visuais
