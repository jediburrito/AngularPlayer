import { Component, OnInit, Input } from '@angular/core';
import { IMedia } from '../app.component';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() {
   }
   @Input() public playlist: Array<IMedia>;
   @Input() public currentItem: IMedia;
   @Input() public nowPlaying: String;
   currentIndex = 0;
   api: VgAPI;
   
      onClickPlaylistItem(item: IMedia, index: number) {
         this.currentIndex = index;
          this.currentItem = item;
      }
      
      onPlayerReady(api: VgAPI) {
       this.api = api;
       this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
           this.playVideo.bind(this)
       );
       this.api.getDefaultMedia().subscriptions.ended.subscribe(
         this.nextVideo.bind(this)
      );
   }
   
   nextVideo() {
     this.currentIndex++;
     if (this.currentIndex === this.playlist.length) {
         this.currentIndex = 0;
     }
   
     this.currentItem = this.playlist[ this.currentIndex ];
   }
   
   playVideo() {
     this.nowPlaying = this.currentItem.title;
      this.api.play();
   }

  ngOnInit() {
  }

}
