import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembersComponent } from './members.component';

@NgModule({
	declarations: [MembersComponent],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		MembersComponent
	]
})
export class MembersModule { }
