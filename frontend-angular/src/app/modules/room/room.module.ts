import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { MembersModule } from './../../components/room/members/members.module';
import { GameSettingsModule } from './../../components/room/game-settings/game-settings.module';
import { GameChatModule } from './../../components/room/game-chat/game-chat.module';
import { DrawAreaModule } from './../../components/room/draw-area/draw-area.module';


@NgModule({
	declarations: [RoomComponent],
	imports: [
		CommonModule,
		RoomRoutingModule,
		DrawAreaModule,
		GameChatModule,
		GameSettingsModule,
		MembersModule
	]
})
export class RoomModule { }
