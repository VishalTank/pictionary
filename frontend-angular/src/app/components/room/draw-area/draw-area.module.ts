import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawAreaComponent } from './draw-area.component';



@NgModule({
	declarations: [DrawAreaComponent],
	imports: [
		CommonModule
	],
	exports: [
		DrawAreaComponent
	]
})
export class DrawAreaModule { }
