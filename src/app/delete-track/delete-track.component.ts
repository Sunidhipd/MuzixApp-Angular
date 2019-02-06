import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzixHttpService } from '../muzix-http.service';
@Component({
  selector: 'app-delete-track',
  templateUrl: './delete-track.component.html',
  styleUrls: ['./delete-track.component.css']
})
export class DeleteTrackComponent implements OnInit {

  public artist: string;
  public mbid1: string;
  public track: string;

  public trackinfo = {
    trackID : this.mbid1,
    trackName: this.track,
    trackComments : this.artist,
  };

  public tracks;
  constructor(private _route: ActivatedRoute, private router: Router, public muzixservice: MuzixHttpService) { }

  ngOnInit() {
    this.mbid1 = this._route.snapshot.paramMap.get('mbid');
      this.muzixservice.findtrack(this.mbid1).subscribe(
        (data) => {
          this.trackinfo.trackID = this.mbid1;
          this.muzixservice.deleteTrack(this.trackinfo.trackID).subscribe((data1) => {
            this.track = data1;
            this.router.navigate(['/myplaylist']);
          });
    });
  }
}
