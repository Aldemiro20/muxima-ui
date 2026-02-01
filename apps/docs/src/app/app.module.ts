import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { FileUploadComponent } from '@muxima-ui/file-upload'
import { ButtonComponent } from '@muxima-ui/button'
import { InputComponent } from '@muxima-ui/input'
import { StepperComponent } from '@muxima-ui/stepper'
import { DialogComponent } from '@muxima-ui/dialog'
import { SelectComponent } from '@muxima-ui/select'
import { TableComponent } from '@muxima-ui/table'
import { CheckboxComponent } from '@muxima-ui/checkbox'
import { RadioButtonComponent } from '@muxima-ui/radio-button'
import { AccordionComponent } from '@muxima-ui/accordion'
import { ToastComponent } from '@muxima-ui/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuximaAlertComponent } from "@muxima-ui/alert"
import { AvatarAvatarComponent } from '@muxima-ui/avatar'
import { BadgeBadgeComponent } from '@muxima-ui/badge'
import { CardCardComponent } from '@muxima-ui/card'
import { TimelineTimelineComponent } from '@muxima-ui/timeline'
import { ProgressProgressComponent } from '@muxima-ui/progress'
import { ToggleToggleComponent } from '@muxima-ui/toggle'
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

