import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
import { MethodeService } from '../service/methode.service';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../service/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {

  form: FormGroup;

  tab_files = { mesfichiers: [] }

  listeMethodes = []
  listeAttributs = []
  exist = false;

  jsonfile = null
  fileName = null;
  constructor(private formbuild: FormBuilder, private rout: ActivatedRoute, private file: FileService, private build: MethodeService, private route: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.fileName = this.rout.snapshot.params['nom'];
    this.file.GetJsonFiles().subscribe(res => {
      this.tab_files = res;
    },
      err => { console.log('erreur'); }
    );
    this.initform()

    this.file.GetOneJsonFile(this.fileName).subscribe(res => {
      this.jsonfile = res;
      this.form.patchValue(res);
      this.remplirform()

    },
      err => { err => { this.route.navigate(['home/not-found']) } }
    );
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

      thematiqueArticle: this.formbuild.array([]),

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
      if (this.tab_files.mesfichiers[i] === this.file.valider(this.form.get('urldebasesiteweb').value)) {
        if(this.tab_files.mesfichiers[i]!==this.fileName){
          this.exist = true
          return
        }
      }
    }
    this.file.EditJSonFile(this.form.value, this.fileName, this.file.valider(this.form.get('urldebasesiteweb').value)).subscribe(res => {
      swalWithBootstrapButtons.fire(
        "modifié!",
        "Le fichier a été modifié.",
        "success"
      );
      this.route.navigate(['home/view-file', this.file.valider(this.form.get('urldebasesiteweb').value)])
    },
      err => {
        console.log('erreur');
      }
    );

  }

  remplirform() {

    if (this.jsonfile.videosArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.videosArticle.length; i++) {
        this.build.createform(this.jsonfile.videosArticle[i].methode, 'videosArticle', this.form)
      }
      this.getform('videosArticle').setValue(this.jsonfile.videosArticle);
    }

    if (this.jsonfile.contenuArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.contenuArticle.length; i++) {
        this.build.createform(this.jsonfile.contenuArticle[i].methode, 'contenuArticle', this.form)
      }
      this.getform('contenuArticle').setValue(this.jsonfile.contenuArticle);
    }

    if (this.jsonfile.imagesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.imagesArticle.length; i++) {
        this.build.createform(this.jsonfile.imagesArticle[i].methode, 'imagesArticle', this.form)
      }
      this.getform('imagesArticle').setValue(this.jsonfile.imagesArticle);
    }

    if (this.jsonfile.auteurArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.auteurArticle.length; i++) {
        this.build.createform(this.jsonfile.auteurArticle[i].methode, 'auteurArticle', this.form)
      }
      this.getform('auteurArticle').setValue(this.jsonfile.auteurArticle);
    }

    if (this.jsonfile.thematiqueArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.thematiqueArticle.length; i++) {
        this.build.createform(this.jsonfile.thematiqueArticle[i].methode, 'thematiqueArticle', this.form)
      }
      this.getform('thematiqueArticle').setValue(this.jsonfile.thematiqueArticle);
    }

    if (this.jsonfile.sousCategorieArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.sousCategorieArticle.length; i++) {
        this.build.createform(this.jsonfile.sousCategorieArticle[i].methode, 'sousCategorieArticle', this.form)
      }
      this.getform('sousCategorieArticle').setValue(this.jsonfile.sousCategorieArticle);
    }

    if (this.jsonfile.titreArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.titreArticle.length; i++) {
        this.build.createform(this.jsonfile.titreArticle[i].methode, 'titreArticle', this.form)
      }
      this.getform('titreArticle').setValue(this.jsonfile.titreArticle);
    }

    if (this.jsonfile.resumeArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.resumeArticle.length; i++) {
        this.build.createform(this.jsonfile.resumeArticle[i].methode, 'resumeArticle', this.form)
      }
      this.getform('resumeArticle').setValue(this.jsonfile.resumeArticle);
    }

    if (this.jsonfile.datePublicationArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.datePublicationArticle.length; i++) {
        this.build.createform(this.jsonfile.datePublicationArticle[i].methode, 'datePublicationArticle', this.form)
      }
      this.getform('datePublicationArticle').setValue(this.jsonfile.datePublicationArticle);
    }

    if (this.jsonfile.dateMiseJourArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.dateMiseJourArticle.length; i++) {
        this.build.createform(this.jsonfile.dateMiseJourArticle[i].methode, 'dateMiseJourArticle', this.form)
      }
      this.getform('dateMiseJourArticle').setValue(this.jsonfile.dateMiseJourArticle);
    }

    if (this.jsonfile.nombreLikesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.nombreLikesArticle.length; i++) {
        this.build.createform(this.jsonfile.nombreLikesArticle[i].methode, 'nombreLikesArticle', this.form)
      }
      this.getform('nombreLikesArticle').setValue(this.jsonfile.nombreLikesArticle);
    }

    if (this.jsonfile.nombreLecturesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.nombreLecturesArticle.length; i++) {
        this.build.createform(this.jsonfile.nombreLecturesArticle[i].methode, 'nombreLecturesArticle', this.form)
      }
      this.getform('nombreLecturesArticle').setValue(this.jsonfile.nombreLecturesArticle);
    }

    if (this.jsonfile.nombreCommentairesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.nombreCommentairesArticle.length; i++) {
        this.build.createform(this.jsonfile.nombreCommentairesArticle[i].methode, 'nombreCommentairesArticle', this.form)
      }
      this.getform('nombreCommentairesArticle').setValue(this.jsonfile.nombreCommentairesArticle);
    }

    if (this.jsonfile.nombrePartagesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.nombrePartagesArticle.length; i++) {
        this.build.createform(this.jsonfile.nombrePartagesArticle[i].methode, 'nombrePartagesArticle', this.form)
      }
      this.getform('nombrePartagesArticle').setValue(this.jsonfile.nombrePartagesArticle);
    }

    if (this.jsonfile.commentairesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.commentairesArticle.length; i++) {
        this.build.createform(this.jsonfile.commentairesArticle[i].methode, 'commentairesArticle', this.form)
      }
      this.getform('commentairesArticle').setValue(this.jsonfile.commentairesArticle);
    }

    if (this.jsonfile.motsClesArticle.length !== 0) {
      for (let i = 0; i < this.jsonfile.motsClesArticle.length; i++) {
        this.build.createform(this.jsonfile.motsClesArticle[i].methode, 'motsClesArticle', this.form)
      }
      this.getform('motsClesArticle').setValue(this.jsonfile.motsClesArticle);
    }
  }
}
