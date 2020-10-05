import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/api/api.service';
import { ApiResponse } from '@app/interfaces/api-response';
import { Cache } from '@app/models/cache';
import { Party } from '@app/interfaces/party';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * Cache data
   */
  readonly cacheParty: Cache<Party[]> = new Cache<Party[]>('parties');

  /**
   * Parties to explore
   */
  parties: Party[] = this.cacheParty.data;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getParties();
  }

  /**
   * Get parties for explore card.
   */
  getParties(): void {
    this.apiService.party.list().subscribe((data: ApiResponse<Party>): void => {
      this.parties = data.results;
      this.cacheParty.data = this.parties;
    });
  }
}
