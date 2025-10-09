import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [NgFor, NgIf],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  constructor (public messageService: MessageService) {}
}
