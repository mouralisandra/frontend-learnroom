import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ElementDetailsComponent} from './element-details/element-details.component';
import {EmptyListPlaceholderComponent} from "./empty-list-placeholder/empty-list-placeholder.component";
import {AvatarComponent} from "./avatar/avatar.component";
import {TextButtonComponent} from "@shared/text-button/text-button.component";

@NgModule({
  declarations: [ElementDetailsComponent,AvatarComponent,EmptyListPlaceholderComponent,TextButtonComponent,],
  exports: [ElementDetailsComponent,AvatarComponent,EmptyListPlaceholderComponent,TextButtonComponent,],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {}
