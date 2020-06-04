import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { VgAPI } from 'videogular2/core';

export interface IMedia {
   title: string;
   src: string;
   type: string;
}
 
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: [ './app.component.scss']
   
})

export class AppComponent implements AfterViewInit{
  clips: Array<any> = [
    {
      clipnumber: 1,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      personnel: 'Offense',
      down: 1,
      distance: 10
    }, 
    {
      clipnumber: 2,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      personnel: 'Offense',
      down: 2,
      distance: 9
    }, 
    {
      clipnumber: 3,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      personnel: 'Offense',
      down: 3,
      distance: 2
    }, 
    {
      clipnumber: 4,
      url: 'https://d2htis0rx2m2xo.cloudfront.net/dev_uploads/10955/4.mp4',
      personnel: 'Offense',
      down: 4,
      distance: 4
    }, 
    {
      clipnumber: 5,
      url: 'https://d2htis0rx2m2xo.cloudfront.net/dev_uploads/10955/8.mp4',
      personnel: 'Defense',
      down: 1,
      distance: 10
    }, 
    {
      clipnumber: 6,
      url: 'https://d2htis0rx2m2xo.cloudfront.net/dev_uploads/10955/9.mp4',
      personnel: 'Defense',
      down: 1,
      distance: 9
    }, 
    {
      clipnumber: 7,
      url: 'https://d2htis0rx2m2xo.cloudfront.net/dev_uploads/10955/10.mp4',
      personnel: 'Defense',
      down: 2,
      distance: 4
    }, 
    {
      clipnumber: 8,
      url: 'https://d2htis0rx2m2xo.cloudfront.net/dev_uploads/10955/11.mp4',
      personnel: 'Defense',
      down: 3,
      distance: 9
    }
  ]

  //clips Array<any> -> playlist Array<IMedia>
  playlist: Array<IMedia> = this.clips.map(oldVid=>(
    {title: "Clip Number " + oldVid.clipnumber + ": " +  oldVid.personnel  + "| down " + oldVid.down  + 
     ", " + oldVid.distance + " yard gain", 
    src: oldVid.url, type: 'video/mp4'}
  )
  );
  currentItem: IMedia = this.playlist[ 0 ];
  nowPlaying = this.currentItem.title;
  currentIndex = 0;
  api: VgAPI;

  @ViewChild(PlayerComponent) childComponentRef: PlayerComponent;

  ngAfterViewInit(){
    //this.childComponentRef.nowPlaying = 'it works!';
  }

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
 
}
