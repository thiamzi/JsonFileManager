import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { MethodeService } from '../service/methode.service';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../service/file.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {

  form: FormGroup;

  tab_files = { mesfichiers: [] }

  exist: boolean = false;

  listeMethodes = []
  listeAttributs = []
  fileName;


  constructor(private formbuild: FormBuilder, private file: FileService, private build: MethodeService, private route: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.file.GetJsonFiles().subscribe(res => {
      this.tab_files = res;
    },
      err => { console.log('erreur');}
    );
    this.initform();
    this.listeAttributs = this.build.listeattribut()
    this.listeMethodes = this.build.listesMehodes()
  }

  initform() {
    this.form = this.formbuild.group({

      urldebasesiteweb: ['', Validators.required],
      imagesBaseSite: ['', Validators.required],
      description: ['', Validators.required],
      thematiqueSite: ['', Validators.required],
      sousCategorieSite: ['', Validators.required],
      contatcSite: ['', Validators.required],
      dateDernierTourSpider: ['', Validators.required],
      dateDernierTourCrawler: ['', Validators.required],
      javascript: ['true'],

      contenuArticle: this.formbuild.array([]),

      videosArticle: this.formbuild.array([]),

      imagesArticle: this.formbuild.array([]),

      auteurArticle: this.formbuild.array([]),

      textHtmlElement: this.formbuild.array([]),

      thematiqueArticle: this.formbuild.array([]),

      valeurAttributNoeud: this.formbuild.array([]),

      sousCategorieArticle: this.formbuild.array([]),

      titreArticle: this.formbuild.array([]),

      resumeArticle: this.formbuild.array([]),

      datePublicationArticle: this.formbuild.array([]),

      dateMiseJourArticle: this.formbuild.array([]),

      nombreLikesArticle: this.formbuild.array([]),

      nombreLecturesArticle: this.formbuild.array([]),

      nombreCommentairesArticle: this.formbuild.array([]),

      nombrePartagesArticle: this.formbuild.array([]),

      commentairesArticle: this.formbuild.array([]),

      motsClesArticle: this.formbuild.array([]),

    });
  }


  addmethode(methode: string, formName: string, form: FormGroup) {
    this.build.createform(methode, formName, form);
  }
  getform(nom) {
    return this.form.get(nom) as FormArray;
  }

  delMethode(index: number, form: FormArray) {
    form.removeAt(index);
  }

  submit() {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    });
    for (let i = 0; i < this.tab_files.mesfichiers.length; i++) {
      if(this.tab_files.mesfichiers[i]===this.file.valider(this.form.get('urldebasesiteweb').value)){
        this.exist = true
        return
      }
    }
    this.file.CreerJSonFile(this.form.value, this.file.valider(this.form.get('urldebasesiteweb').value)).subscribe(res => {
      swalWithBootstrapButtons.fire(
        "creé!",
        "Le fichier a été creé.",
        "success"
      );
      this.route.navigate(['home'])
    },
      err => {
        console.log('erreur');
      }
    );
  }

  
}
