# Stepper

## Como instalar

```bash
npm install @agt-ui/stepper --registry http://massinga.minfin.gov.ao:4873/
```

### Imports

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

+ import { StepsComponent } from '@agt-ui/steps'

@NgModule({
  declarations: [AppComponent],
  + imports: [BrowserModule, StepsComponent],
  + exports: [StepsComponent],
})
export class AppModule {}
```

### Como funciona

O exemplo abaixo mostra a lógica para implementação padrão do componente

```
+ import { StepsComponent } from '@agt-ui/steps'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
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

```

#### Explicação
- **steps**: Um array de strings responsável por fornecer os passos para o step

- **currentPage**: recebe o numero do passo atual [começa com 1]

- **handleNextStep**: função para avançar para o próximo passo

- **handlePrevStep**: função para voltar para o passo anterior


#### A seguir a utilização do componente no arquivo .html

```
<agt-stepper [steps]="steps" [(currentStep)]="currentStep" />


<div *ngIf="currentPage === 1">
  <p>Detalhes de agente economico</p>
</div>

<div *ngIf="currentPage === 2">
  <p>Detalhes do proprietário</p>
</div>

<div *ngIf="currentPage === 3">
  <p>Situação fiscal</p>
</div>
```


## Storybook

Consulte o Storybook para visualizar o componente

- [@Storybook](http://camuine06.minfin.gov.ao:86/)


