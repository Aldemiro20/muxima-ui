import { ButtonComponent } from '@muxima-ui/button';
import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { StepperComponent } from '@muxima-ui/stepper';
import { Component } from '@angular/core';

const steps: Array<string> = [
  'Detalhes do agente econômico',
  'Detalhes do proprietário',
  'Situação fiscal',
  'Informações da visita',
  'Resumo'
];

// Criamos um componente para controlar o estado do Stepper
@Component({
  selector: 'agt-steper',
  template: `
    <agt-stepper [steps]="steps" [(currentStep)]="currentStep"></agt-stepper>

    <div *ngIf="currentStep === 1">
      <p>Detalhes do agente econômico</p>
    </div>

    <div *ngIf="currentStep === 2">
      <p>Detalhes do proprietário</p>
    </div>

    <div *ngIf="currentStep === 3">
      <p>Situação fiscal</p>
    </div>

    <div *ngIf="currentStep === 4">
      <p>Informação da visita</p>
    </div>

    <div *ngIf="currentStep === 5">
      <p>Resumo</p>
    </div>

    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <agt-button (click)="handlePrevStep()" text="Anterior" [disabled]="currentStep === 1" />
      <agt-button (click)="handleNextStep()" text="Próximo" [disabled]="currentStep >= steps.length" />
    </div>
  `,
})
class StepperWrapperComponent {
  currentStep = 1;
  steps = steps;

  handleNextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  handlePrevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

const meta: Meta<StepperWrapperComponent> = {
  title: 'Menu/Stepper',
  component: StepperWrapperComponent,
  decorators: [
    moduleMetadata({
      declarations: [StepperWrapperComponent], // Registrando o componente no Storybook
      imports: [StepperComponent, ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
O **Stepper** é um componente de navegação para indicar e gerenciar passos de um processo.

#### Como instalar:

\`npm install @muxima-ui/stepper --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { StepperComponent } from '@muxima-ui/stepper'

@NgModule({
  declarations: [],
  imports: [
    StepperComponent,
  ],
  exports: [StepperComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`app.component.html\`
\`\`\`html
<agt-stepper [steps]="steps" [(currentStep)]="currentStep" />

<div *ngIf="currentStep === 1">
  <p>Detalhes do agente econômico</p>
</div>

<agt-button (click)="handlePrevStep()" text="Anterior" [disabled]="currentStep === 1" />
<agt-button (click)="handleNextStep()" text="Próximo" [disabled]="currentStep >= steps.length" />
\`\`\`

\`app.component.ts\`
\`\`\`typescript
export class AppComponent {
  currentStep = 1

  @ViewChild(StepperComponent) stepper!: StepperComponent;

  handleNextStep() {
    this.stepper.next()
  }

  handlePrevStep() {
    this.stepper.prev()
  }

 steps: Array<string> = [
     'Detalhes do agente econômico',
     'Detalhes do proprietário',
     'Situação fiscal',
     'Informações da visita',
     'Resumo'
   ];
}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição |
|----------------|---------|-----------|
| \`steps\`      | string[] | Define os rótulos dos passos |
| \`currentStep\` | number  | Define o passo atual |
        `
      },
      source: {
        code: null
      }
    }
  },
  argTypes: {},
  args: {},
};

export default meta;

const Template: StoryFn<StepperWrapperComponent> = () => ({
  props: {},
});

export const Default = Template.bind({});

