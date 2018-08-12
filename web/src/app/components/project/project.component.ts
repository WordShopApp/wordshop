import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { AccountService } from '../../services/account/account.service';
import { AuthService } from '../../services/auth/auth.service';
import { AlertTypes } from '../alert/alert.component';
import { LoggerService } from '../../services/logger/logger.service';
import { MessengerService } from '../../services/messenger/messenger.service';
import { NavService } from '../../services/nav/nav.service';
import { ProjectService } from '../../services/project/project.service';
import { StoreService } from '../../services/store/store.service';
import { StoreProps as Props } from '../../services/store/store.props';
import { StoreActions as Actions } from '../../services/store/store.actions';
import { WordIconService } from '../../services/word-icon/word-icon.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  param$: Subscription;
  projectId: any;
  project: any;

  constructor (
    private route: ActivatedRoute,
    private loggerService: LoggerService,
    private projectService: ProjectService
   ) { }

  ngOnInit () {
    this.param$ = this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.projectService.get(this.projectId).then(proj => {
        this.project = proj;
      }).catch(err => {
        this.loggerService.error(err);
      });
    });
  }

  ngOnDestroy () {
    this.param$.unsubscribe();
  }

}
