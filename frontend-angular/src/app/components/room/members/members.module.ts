import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';



@NgModule({
	declarations: [MembersComponent],
	imports: [
		CommonModule
	],
	exports: [
		MembersComponent
	]
})
export class MembersModule { }
