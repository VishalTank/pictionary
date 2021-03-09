import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { MembersModule } from './../../components/room/members/members.module';
import { GameSettingsModule } from './../../components/room/game-settings/game-settings.module';
import { GameChatModule } from './../../components/room/game-chat/game-chat.module';
import { DrawAreaModule } from './../../components/room/draw-area/draw-area.module';
import { NameInputModalComponent } from '../../components/common/name-input-modal/name-input-modal/name-input-modal.component';


@NgModule({
	declarations: [
		RoomComponent,
		NameInputModalComponent
	],
	imports: [
		CommonModule,
		NgbModalModule,
		FormsModule,
		ReactiveFormsModule,
		RoomRoutingModule,
		DrawAreaModule,
		GameChatModule,
		GameSettingsModule,
		MembersModule
	]
})
export class RoomModule { }
