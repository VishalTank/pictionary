import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameSettingsComponent } from './game-settings.component';
import { CopyService } from '../../../services/shared/copy.service';

@NgModule({
	declarations: [GameSettingsComponent],
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [
		CopyService
	],
	exports: [
		GameSettingsComponent
	]
})
export class GameSettingsModule { }
