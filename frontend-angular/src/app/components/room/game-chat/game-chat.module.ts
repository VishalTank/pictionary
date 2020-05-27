import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameChatComponent } from './game-chat.component';



@NgModule({
	declarations: [GameChatComponent],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		GameChatComponent
	]
})
export class GameChatModule { }
