# Search Bar Component

Barra de pesquisa moderna com autocomplete, sugestões inteligentes, atalhos de teclado e navegação por teclado.

## Características

- 🔍 **Autocomplete**: Sugestões em tempo real conforme o usuário digita
- ⌨️ **Atalhos de Teclado**: Ctrl+K (Cmd+K no Mac) para focar, ↑↓ para navegar, Enter para selecionar
- 🎯 **Sugestões Categorizadas**: Organize por categorias com ícones
- ⚡ **Debounce Inteligente**: Evita requisições excessivas (configurável)
- ⏳ **Loading State**: Indica busca em andamento
- 📏 **3 Tamanhos**: Small, Medium, Large
- 🎨 **Tema Roxo**: Gradiente #667eea → #764ba2
- 📱 **Responsivo**: Adaptação automática para mobile

## Instalação

```typescript
import { SearchBarComponent, SearchSuggestion } from '@muxima-ui/search-bar';

@Component({
  standalone: true,
  imports: [SearchBarComponent],
  // ...
})
```

## Uso Básico

```html
<muxima-search-bar
  placeholder="Search..."
  (search)="onSearch($event)">
</muxima-search-bar>
```

## Com Sugestões

```typescript
// Component
suggestions: SearchSuggestion[] = [
  { id: '1', text: 'Dashboard', icon: '📊', category: 'Pages', route: '/dashboard' },
  { id: '2', text: 'Users', icon: '👥', category: 'Pages', route: '/users' },
  { id: '3', text: 'Settings', icon: '⚙️', category: 'Pages', route: '/settings' }
];

onSearch(query: string) {
  // Fetch suggestions from API
  this.apiService.search(query).subscribe(results => {
    this.suggestions = results;
  });
}

onSuggestionSelected(suggestion: SearchSuggestion) {
  // Navigate or perform action
  this.router.navigate([suggestion.route]);
}
```

```html
<muxima-search-bar
  placeholder="Search pages..."
  [suggestions]="suggestions"
  (search)="onSearch($event)"
  (suggestionSelected)="onSuggestionSelected($event)">
</muxima-search-bar>
```

## Props

### @Input

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `placeholder` | string | 'Search...' | Texto do placeholder |
| `suggestions` | SearchSuggestion[] | [] | Array de sugestões para autocomplete |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | Tamanho da barra de busca |
| `showIcon` | boolean | true | Exibe ícone de lupa |
| `clearable` | boolean | true | Exibe botão de limpar |
| `loading` | boolean | false | Exibe spinner de carregamento |
| `debounceTime` | number | 300 | Tempo de debounce em ms |
| `keyboardShortcut` | string | 'Ctrl+K' | Atalho de teclado para focar |

### @Output

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `search` | EventEmitter<string> | Emitido quando o usuário digita (com debounce) |
| `suggestionSelected` | EventEmitter<SearchSuggestion> | Emitido quando uma sugestão é selecionada |
| `clear` | EventEmitter<void> | Emitido quando o botão limpar é clicado |

## Interface SearchSuggestion

```typescript
export interface SearchSuggestion {
  id: string;           // Unique identifier
  text: string;         // Display text
  icon?: string;        // Emoji or icon
  category?: string;    // Optional category label
  route?: string;       // Optional navigation route
}
```

## Atalhos de Teclado

- **Ctrl+K** (Cmd+K no Mac): Focar na busca
- **↑↓**: Navegar entre sugestões
- **Enter**: Selecionar sugestão atual
- **Esc**: Fechar dropdown de sugestões

## Loading State

```html
<muxima-search-bar
  [loading]="isLoading"
  [suggestions]="suggestions"
  (search)="onSearch($event)">
</muxima-search-bar>
```

```typescript
onSearch(query: string) {
  this.isLoading = true;
  this.apiService.search(query).subscribe({
    next: (results) => {
      this.suggestions = results;
      this.isLoading = false;
    }
  });
}
```

## Casos de Uso

- **Busca Global**: Navegação rápida entre páginas da aplicação
- **E-commerce**: Busca de produtos com autocomplete
- **Base de Conhecimento**: Pesquisa em documentos e artigos
- **CRM**: Busca de clientes, leads e contatos
- **Admin Panels**: Navegação rápida em dashboards

## Boas Práticas

- ✅ Use `debounceTime` adequado (300-500ms) para evitar sobrecarga
- ✅ Limite sugestões a 10-15 itens para melhor UX
- ✅ Categorize sugestões quando houver múltiplos tipos
- ✅ Use ícones para identificação visual rápida
- ✅ Implemente loading state durante buscas assíncronas
- ✅ Considere cache para buscas frequentes
- ✅ Adicione analytics para entender padrões de busca
