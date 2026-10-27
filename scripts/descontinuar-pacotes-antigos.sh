#!/usr/bin/env bash
# Marca como descontinuados os pacotes @muxima-ui/* 1.0.x publicados antes da v2.
# Sem argumentos só mostra os comandos; com --run executa-os (precisa de npm login).
#
# Só descontinua um pacote antigo quando o substituto já está publicado. Quando sair
# uma versão nova com mais componentes, passa as linhas de PENDENTE para NOVO e
# volta a correr o script (descontinuar o mesmo pacote duas vezes não faz mal).
set -euo pipefail

MSG_BASE="Este pacote foi substituído por @muxima-ui/core (Angular 21+)."
REPO="https://github.com/Aldemiro20/muxima-ui"

# pacote antigo -> ponto de entrada novo, já publicado
declare -A NOVO=(
  [accordion]=accordion [alert]=alert [autocomplete]=combobox [avatar]=avatar [badge]=badge
  [breadcrumb]=breadcrumb [button]=button [card]=card [checkbox]=checkbox [command-palette]=command
  [confirmation-dialog]=dialog [datepicker]=date-picker [dialog]=dialog [drawer]=drawer
  [dropdown]=menu [input]=form-field [modal]=dialog [multi-select]=select [otp-input]=otp
  [pagination]=pagination [progress]=progress [loading]=progress [radio-button]=radio
  [search-box]=combobox [select]=select [slider]=slider [stepper]=stepper [table]=table
  [tabs]=tabs [toast]=toast [toggle]=switch [tooltip]=tooltip
  # 1.1
  [date-range-picker]=date-picker [slider-range]=slider [chip]=chips [file-upload]=file-upload
  [star-rating]=rating [copy-to-clipboard]=clipboard
  # 1.2
  [sidebar]=sidebar [timeline]=timeline [notification-center]=notification-center
  [carousel]=carousel [color-picker]=color-picker
)

# pacote antigo -> onde vai estar (ainda não publicado: não se descontinua já)
declare -A PENDENTE=(
  [kanban]="kanban (1.3)" [image-cropper]="image-cropper (1.3)" [quill-editor]="editor (1.3)"
  [hero]="bloco" [feature-card]="bloco" [pricing-card]="bloco" [product-card]="bloco" [navbar]="bloco"
  [shopping-cart]="bloco" [settings-item]="bloco" [comments]="bloco" [credit-card]="bloco"
)

# sem substituto: descontinua-se já
SEM_SUBSTITUTO=(video-player)

run() {
  if [[ "${RUN:-}" == "1" ]]; then
    echo "→ $2"
    "$@"
  else
    printf '%q ' "$@"; echo
  fi
}
[[ "${1:-}" == "--run" ]] && RUN=1

for antigo in $(printf '%s\n' "${!NOVO[@]}" | sort); do
  run npm deprecate "@muxima-ui/$antigo@<=1.0.2" "$MSG_BASE Usa @muxima-ui/core/${NOVO[$antigo]}. Guia: $REPO"
done
for antigo in "${SEM_SUBSTITUTO[@]}"; do
  run npm deprecate "@muxima-ui/$antigo@<=1.0.2" "Este pacote foi descontinuado e não tem substituto em @muxima-ui/core. Usa o elemento <video> nativo. Guia: $REPO"
done

echo
echo "# Ainda não descontinuados (substituto por publicar):"
for antigo in $(printf '%s\n' "${!PENDENTE[@]}" | sort); do
  echo "#   @muxima-ui/$antigo -> ${PENDENTE[$antigo]}"
done
