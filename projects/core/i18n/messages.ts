/**
 * Todos os textos que os componentes mostram ou anunciam ao leitor de ecrã.
 * Os textos com valores variáveis são funções; os números e as datas chegam já formatados.
 */
export interface MxMessages {
  /** Locale BCP 47 usado em Intl (números, datas, ordenação). Ex.: "pt-AO", "en-US". */
  intlLocale: string;
  /** Ordem do dia, mês e ano nos campos de data escritos à mão. */
  dateOrder: 'dmy' | 'mdy' | 'ymd';
  /** Primeiro dia da semana no calendário: 0 = domingo, 1 = segunda-feira. */
  firstDayOfWeek: number;

  alert: { close: string };
  breadcrumb: { label: string };
  calendar: {
    previousMonth: (month: string) => string;
    nextMonth: (month: string) => string;
    rangeStart: string;
    rangeEnd: string;
    rangeStartEnd: string;
    rangeHint: (start: string, end: string) => string;
    rangeStartHint: (start: string) => string;
  };
  carousel: {
    carousel: string;
    slide: string;
    previous: string;
    next: string;
    choose: string;
    goTo: (n: number) => string;
    position: (n: number, total: number) => string;
    play: string;
    pause: string;
  };
  chips: {
    remove: string;
    list: string;
    help: string;
    added: (tag: string) => string;
    removed: (tag: string) => string;
    max: (max: number) => string;
    duplicate: (tag: string) => string;
  };
  clipboard: { copy: string; copied: string; failed: string };
  colorPicker: {
    choose: string;
    change: (name: string, hex: string) => string;
    area: string;
    hue: string;
    alpha: string;
    swatches: string;
    eyeDropper: string;
    hex: string;
    areaValue: (saturation: number, brightness: number, name: string) => string;
    hueValue: (degrees: number, name: string) => string;
    names: MxColorNames;
  };
  combobox: { placeholder: string; empty: string; loading: string };
  command: { placeholder: string; label: string; empty: string; results: (n: number) => string };
  dataGrid: {
    label: string;
    empty: string;
    loading: string;
    columns: string;
    filter: string;
    all: string;
    selectAll: string;
    selectRow: string;
    selection: string;
    resizeHint: string;
    numberFilter: (filter: string, column: string) => string;
    rows: (n: string, count: number) => string;
    of: (total: string) => string;
    selected: (n: string, count: number) => string;
    sorted: (column: string, direction: 'asc' | 'desc') => string;
    unsorted: string;
    width: (column: string, px: number) => string;
  };
  datePicker: { placeholder: string; choose: string; change: (date: string) => string };
  dateRangePicker: {
    start: string;
    end: string;
    choose: string;
    change: (start: string, end: string) => string;
    presets: string;
    last7Days: string;
    last30Days: string;
    thisMonth: string;
    lastMonth: string;
  };
  editor: {
    toolbar: string;
    link: string;
    apply: string;
    remove: string;
    cancel: string;
    characters: string;
    tools: Record<
      | 'bold'
      | 'italic'
      | 'underline'
      | 'strike'
      | 'code'
      | 'heading2'
      | 'heading3'
      | 'paragraph'
      | 'bulletList'
      | 'orderedList'
      | 'blockquote'
      | 'link'
      | 'undo'
      | 'redo',
      string
    >;
  };
  fileUpload: {
    drop: string;
    browse: string;
    list: string;
    remove: string;
    done: string;
    uploading: (name: string) => string;
    rejectedType: (name: string) => string;
    rejectedSize: (name: string, size: string, max: string) => string;
    rejectedCount: (name: string, max: number) => string;
    addedOne: (name: string) => string;
    addedMany: (n: number) => string;
    removed: (name: string) => string;
  };
  imageCropper: {
    alt: string;
    help: string;
    zoom: string;
    rotateLeft: string;
    rotateRight: string;
    reset: string;
    area: string;
    size: (width: number, height: number) => string;
    position: (width: number, height: number, x: number, y: number) => string;
    rotated: (degrees: number) => string;
  };
  kanban: {
    label: string;
    empty: string;
    help: string;
    cards: (n: number, limit: number | null) => string;
    grabbed: (card: string) => string;
    position: (column: string, position: number, total: number) => string;
    pickedUp: (card: string, where: string) => string;
    dropped: (card: string, where: string) => string;
    cancelled: (card: string, where: string) => string;
    full: (column: string, limit: number) => string;
  };
  notifications: {
    title: string;
    markAll: string;
    empty: string;
    emptyUnread: string;
    filter: string;
    all: string;
    unread: string;
    unreadPrefix: string;
    unreadCount: (n: number) => string;
    markRead: (title: string) => string;
    remove: (title: string) => string;
    removed: (title: string) => string;
    newOne: (title: string) => string;
    newMany: (n: number) => string;
    now: string;
    bellCount: (label: string, n: number) => string;
  };
  pagination: {
    label: string;
    rowsPerPage: string;
    first: string;
    previous: string;
    previousShort: string;
    next: string;
    nextShort: string;
    last: string;
    page: (n: number) => string;
    pageOf: (current: number, total: number) => string;
    range: (from: string, to: string, total: string) => string;
    noResults: string;
  };
  progress: { label: string };
  rangeSlider: { low: string; high: string };
  rating: { label: string; star: (n: number) => string; summary: (value: string, max: number) => string };
  select: { placeholder: string; empty: string; loading: string };
  sidebar: { label: string; collapse: string; expand: string };
  stepper: { complete: string };
  timePicker: { placeholder: string; label: string };
  toast: { region: string; close: string; action: (label: string) => string };
  tour: {
    next: string;
    previous: string;
    done: string;
    skip: string;
    close: string;
    progress: (current: number, total: number) => string;
  };
}

/** Nomes aproximados das cores, para o leitor de ecrã. */
export interface MxColorNames {
  black: string;
  white: string;
  lightGray: string;
  gray: string;
  darkGray: string;
  brown: string;
  red: string;
  orange: string;
  yellow: string;
  lime: string;
  green: string;
  teal: string;
  blue: string;
  purple: string;
  magenta: string;
  /** Junta o tom ao nome: "azul escuro", "dark blue". */
  tone: (name: string, tone: 'dark' | 'light') => string;
}

/** Objecto com todas as chaves opcionais, a qualquer profundidade. */
export type MxDeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown ? T[K] : T[K] extends object ? MxDeepPartial<T[K]> : T[K];
};
