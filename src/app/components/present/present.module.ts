import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentComponent } from './present.component';
import { PresentNewComponent } from './present-new/present-new.component';
import { PresentRoutes } from './present.routing';

import { RouterModule } from '@angular/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PresentRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    LMarkdownEditorModule
  ],
  declarations: [PresentComponent, PresentNewComponent]
})
export class PresentModule { }
