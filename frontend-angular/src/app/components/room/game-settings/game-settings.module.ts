import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSettingsComponent } from './game-settings.component';



@NgModule({
	declarations: [GameSettingsComponent],
	imports: [
		CommonModule
	],
	exports: [
		GameSettingsComponent
	]
})
export class GameSettingsModule { }
