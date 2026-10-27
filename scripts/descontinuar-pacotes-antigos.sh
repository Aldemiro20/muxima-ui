#!/usr/bin/env bash
# Marca como descontinuados os pacotes @muxima-ui/* 1.0.x publicados antes da v2.
# Sem argumentos só mostra os comandos; com --run executa-os (precisa de npm login).
set -euo pipefail

MSG_BASE="Este pacote foi substituído por @muxima-ui/core (Angular 21+)."
REPO="https://github.com/Aldemiro20/muxima-ui"

# pacote antigo -> ponto de entrada novo (vazio = sem equivalente directo)
declare -A NOVO=(
  [accordion]=accordion [alert]=alert [autocomplete]=combobox [avatar]=avatar [badge]=badge
  [breadcrumb]=breadcrumb [button]=button [card]=card [checkbox]=checkbox [command-palette]=command
  [confirmation-dialog]=dialog [datepicker]=date-picker [date-range-picker]=date-picker [dialog]=dialog
  [drawer]=drawer [dropdown]=menu [input]=form-field [modal]=dialog [multi-select]=select
  [otp-input]=otp [pagination]=pagination [progress]=progress [loading]=progress [radio-button]=radio
  [search-box]=combobox [select]=select [slider]=slider [slider-range]=slider [stepper]=stepper
  [table]=table [tabs]=tabs [toast]=toast [notification-center]=toast [toggle]=switch [tooltip]=tooltip
  [carousel]= [chip]= [color-picker]= [comments]= [copy-to-clipboard]= [credit-card]= [feature-card]=
  [file-upload]= [hero]= [image-cropper]= [kanban]= [navbar]= [pricing-card]= [product-card]=
  [quill-editor]= [settings-item]= [shopping-cart]= [sidebar]= [star-rating]= [timeline]= [video-player]=
)

for antigo in $(printf '%s\n' "${!NOVO[@]}" | sort); do
  novo="${NOVO[$antigo]}"
  if [[ -n "$novo" ]]; then
    msg="$MSG_BASE Usa @muxima-ui/core/$novo. Guia: $REPO"
  else
    msg="$MSG_BASE Este componente não passou para a v2. Guia: $REPO"
  fi
  cmd=(npm deprecate "@muxima-ui/$antigo@<=1.0.2" "$msg")
  if [[ "${1:-}" == "--run" ]]; then
    echo "→ @muxima-ui/$antigo"
    "${cmd[@]}"
  else
    printf '%q ' "${cmd[@]}"; echo
  fi
done
