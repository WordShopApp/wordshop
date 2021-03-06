import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class RosieService {

  constructor(private storeService: StoreService) { }

  cleanup () {
    this.cleanupRegistrationCredentials();
  }

  cleanupRegistrationCredentials () {
    this.storeService.local.remove('email');
    this.storeService.local.remove('password');
    this.storeService.local.remove('subscription');
    this.storeService.local.remove('join_mailing_list');
  }
}
