import { Component, Input, OnInit } from '@angular/core';
import { WordIconService } from '../../services/word-icon/word-icon.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: any;
  palette: any;

  constructor (
    private settingsService: SettingsService,
    private wordIconService: WordIconService
  ) { }

  ngOnInit() {
    this.palette = this.wordIconService.getPalette(this.project.title);
  }

  assetUrl (path) {
    return this.settingsService.assetUrl(path);
  }

}
