import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { FileUploadComponent } from '@agt-ui/file-upload'
import { ButtonComponent } from '@agt-ui/button'
import { InputComponent } from '@agt-ui/input'
import { StepperComponent } from '@agt-ui/stepper'
import { DialogComponent } from '@agt-ui/dialog'
import { SelectComponent } from '@agt-ui/select'
import { TableComponent } from '@agt-ui/table'
import { CheckboxComponent } from '@agt-ui/checkbox'
import { RadioButtonComponent } from '@agt-ui/radio-button'
import { AccordionComponent } from '@agt-ui/accordion'
import { ToastComponent } from '@agt-ui/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuximaAlertComponent } from "@muxima-ui/alert"
import { AvatarAvatarComponent } from '@muxima/avatar'
import { BadgeBadgeComponent } from '@muxima/badge'
import { CardCardComponent } from '@muxima/card'
import { TimelineTimelineComponent } from '@muxima/timeline'
import { ProgressProgressComponent } from '@muxima/progress'
import { ToggleToggleComponent } from '@muxima/toggle'
import { CommonModule } from '@angular/common'
import { DocLayoutComponent } from './shared/doc-layout.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    DocLayoutComponent,
    ButtonComponent,
    SelectComponent,
    InputComponent,
    StepperComponent,
    FileUploadComponent,
    DialogComponent,
    TableComponent,
    ReactiveFormsModule,
    FormsModule,
    CheckboxComponent,
    RadioButtonComponent,
    AccordionComponent,
    ToastComponent,
    MuximaAlertComponent,
    AvatarAvatarComponent,
    BadgeBadgeComponent,
    CardCardComponent,
    TimelineTimelineComponent,
    ProgressProgressComponent,
    ToggleToggleComponent
  ],
  exports: [StepperComponent, DialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
