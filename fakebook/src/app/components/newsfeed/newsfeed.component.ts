import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../../services/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
