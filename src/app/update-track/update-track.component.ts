import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzixHttpService } from '../muzix-http.service';

@Component({
  selector: 'app-update-track',
  templateUrl: './update-track.component.html',
  styleUrls: ['./update-track.component.css']
})
export class UpdateTrackComponent implements OnInit {

  public artist: string;
  public mbid1: string;
  public track: string;

  public trackinfo = {
    trackID : this.mbid1,
    trackName: this.track,
    trackComments : this.artist,
  };

  public tracks;
  constructor(private _route: ActivatedRoute, private router: Router, public muzixservice: MuzixHttpService) {

  }
 ngOnInit() {
   console.log("Update Track");
   this.mbid1 = this._route.snapshot.paramMap.get('mbid');
   this.artist = this._route.snapshot.paramMap.get('comment');
   console.log(this.mbid1 + ' ' + this.artist);

   this.muzixservice.findtrack(this.mbid1).subscribe(
    data => {
      console.log(data)
      this.trackinfo.trackName=data.track.name;
      this.trackinfo.trackComments=this.artist;
      this.trackinfo.trackID=this.mbid1;

      console.log(this.trackinfo);

      this.tracks = this.muzixservice.updateTrack(this.trackinfo).subscribe(
        (data1) => {
        },
        error => {
          console.log('some error occured in Update Track');
          console.log(error.errorMessage);
        }
      );


    }
   );
   
 }

}