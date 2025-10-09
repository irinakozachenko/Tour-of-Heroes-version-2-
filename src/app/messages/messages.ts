import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [NgFor],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  messages!: string[]
  constructor (public messageService: MessageService) {
    this.messages = this.messageService.messages
  }
}
