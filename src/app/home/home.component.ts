import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  veriffile = false;
  tab_files = { mesfichiers: [] }
  tabordre = []
  constructor(private file: FileService) {

  }
  ngOnInit() {
    this.file.GetJsonFiles().subscribe(res => {
      this.tab_files = res;
      this.tab_files.mesfichiers.reverse()
      if (this.tab_files.mesfichiers.length === 0) {
        this.veriffile = true
      }
    },
      err => { console.log('erreur'); this.veriffile = true }
    );
  }

  delete(nom, index) {
    this.file.DeleteJsnFile(nom).subscribe(res => {
      this.tab_files.mesfichiers.splice(index, 1)
    },
      err => { console.log('erreur'); }
    );
  }
}
