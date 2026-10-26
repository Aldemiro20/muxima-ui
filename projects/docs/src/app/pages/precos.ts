import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Icon } from '../ui/icon';

@Component({
  selector: 'doc-precos',
  imports: [RouterLink, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide narrow-center">
      <header class="center-head">
        <p class="eyebrow">Preços / Licenças</p>
        <h1 class="display">Começa gratuitamente.<br /><span class="accent">Cresce sem limites.</span></h1>
        <p class="page-lead">A biblioteca Core é gratuita. Os templates e serviços opcionais ajudam a acelerar projectos e equipas.</p>
      </header>

      <div class="plans">
        <section class="card plan" aria-labelledby="p-free">
          <h2 id="p-free" class="plan-name">Open Source</h2>
          <p class="plan-price">Grátis</p>
          <p class="muted small">Para quem deseja criar sem barreiras.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Todos os componentes Core</li>
            <li><doc-icon name="check" /> Licença MIT</li>
            <li><doc-icon name="check" /> Documentação em português</li>
            <li><doc-icon name="check" /> Utilização comercial</li>
            <li><doc-icon name="check" /> Comunidade aberta</li>
          </ul>
          <a mxButton routerLink="/componentes" class="plan-cta">Explorar componentes <doc-icon name="arrowRight" /></a>
        </section>

        <section class="card plan featured" aria-labelledby="p-pro">
          <div class="plan-head"><h2 id="p-pro" class="plan-name">Pro</h2><span class="tag accent">Mais flexível</span></div>
          <p class="plan-price accent">$49–$199</p>
          <p class="muted small">Templates e ferramentas para acelerar entregas.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Tudo do Core</li>
            <li><doc-icon name="check" /> Templates empresariais</li>
            <li><doc-icon name="check" /> Componentes avançados</li>
            <li><doc-icon name="check" /> Código-fonte dos templates</li>
            <li><doc-icon name="check" /> Actualizações durante um ano</li>
          </ul>
          <a mxButton routerLink="/templates" class="plan-cta accent-button">Explorar templates <doc-icon name="arrowRight" /></a>
        </section>

        <section class="card plan" aria-labelledby="p-ent">
          <h2 id="p-ent" class="plan-name">Enterprise</h2>
          <p class="plan-price">Sob proposta</p>
          <p class="muted small">Apoio à medida para equipas e organizações.</p>
          <ul class="checks">
            <li><doc-icon name="check" /> Tudo do Pro</li>
            <li><doc-icon name="check" /> Integração em projectos existentes</li>
            <li><doc-icon name="check" /> Personalização visual</li>
            <li><doc-icon name="check" /> Formação e capacitação</li>
            <li><doc-icon name="check" /> Suporte contratado</li>
          </ul>
          <a mxButton variant="outline" [href]="links.contact" target="_blank" rel="noopener" class="plan-cta">Pedir proposta <doc-icon name="arrowRight" /></a>
        </section>
      </div>

      <section class="card row-card">
        <div>
          <h2 class="card-title">Precisas de um plano personalizado?</h2>
          <p class="muted small">Fala com a equipa sobre integração, consultoria ou licenciamento.</p>
        </div>
        <a mxButton variant="outline" routerLink="/consultoria">Contactar a equipa <doc-icon name="arrowRight" /></a>
      </section>

      <p class="fineprint">Valores ilustrativos para validação comercial. As condições definitivas serão publicadas antes das vendas.</p>
    </main>
  `,
})
export class PrecosPage {
  protected readonly links = LINKS;
}
