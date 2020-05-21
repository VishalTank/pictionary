import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameChatComponent } from './game-chat.component';



@NgModule({
	declarations: [GameChatComponent],
	imports: [
		CommonModule
	],
	exports: [
		GameChatComponent
	]
})
export class GameChatModule { }
