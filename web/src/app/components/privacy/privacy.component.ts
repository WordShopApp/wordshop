import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { StoreActions as Actions } from '../../services/store/store.actions';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.dispatch(Actions.UI.UpdateShowHomeIcon, true);
  }

}
