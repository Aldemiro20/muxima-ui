# Color Picker Component

Seletor de cores avançado com suporte a múltiplos formatos, paletas predefinidas e criador de gradientes.

## 🎨 Recursos

- ✅ Sliders HSL interativos (Matiz, Saturação, Luminosidade)
- ✅ Formatos: HEX, RGB, HSL
- ✅ 3 paletas predefinidas (Material, Pastéis, Neutros)
- ✅ Criador de gradientes com ângulo ajustável
- ✅ Suporte a opacidade (alpha)
- ✅ Modo inline ou dropdown
- ✅ 3 tamanhos: small, medium, large
- ✅ Integração com Angular Forms (ngModel / FormControl)

## 📦 Instalação

```typescript
import { ColorPickerComponent } from '@muxima-ui/color-picker';

@Component({
  imports: [ColorPickerComponent]
})
```

## 🚀 Uso Básico

```html
<!-- Dropdown -->
<muxima-color-picker
  [(ngModel)]="selectedColor"
  (colorChange)="onColorChange($event)"
></muxima-color-picker>

<!-- Inline -->
<muxima-color-picker
  [inline]="true"
  [format]="'hex'"
  [(ngModel)]="color"
></muxima-color-picker>
```

## 📝 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|---------|-----------|
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Formato de exibição da cor |
| `showPalettes` | `boolean` | `true` | Mostrar paletas de cores |
| `showGradient` | `boolean` | `false` | Mostrar criador de gradientes |
| `showAlpha` | `boolean` | `false` | Mostrar controle de opacidade |
| `inline` | `boolean` | `false` | Exibir sempre aberto |
| `disabled` | `boolean` | `false` | Desabilitar o componente |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho do botão trigger |
| `customPalettes` | `ColorPalette[]` | `[]` | Paletas personalizadas |

## 🎯 Eventos

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `colorChange` | `ColorFormat` | Emitido quando a cor muda |
| `formatChange` | `'hex' \| 'rgb' \| 'hsl'` | Emitido quando o formato muda |

## 💡 Exemplos Avançados

### Com Gradientes

```html
<muxima-color-picker
  [showGradient]="true"
  [inline]="true"
></muxima-color-picker>
```

### Com Opacidade

```html
<muxima-color-picker
  [showAlpha]="true"
  [(ngModel)]="colorWithAlpha"
></muxima-color-picker>
```

### Paletas Personalizadas

```typescript
customPalettes: ColorPalette[] = [
  {
    name: 'Meu Tema',
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
  }
];
```

```html
<muxima-color-picker
  [customPalettes]="customPalettes"
></muxima-color-picker>
```

## 🎨 Interface ColorFormat

```typescript
interface ColorFormat {
  hex: string;           // '#667eea'
  rgb: {                 // { r: 102, g: 126, b: 234 }
    r: number;
    g: number;
    b: number;
  };
  hsl: {                 // { h: 240, s: 76, l: 72 }
    h: number;
    s: number;
    l: number;
  };
}
```

## 🎨 Tema Muxima UI

Usa o gradiente característico: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
