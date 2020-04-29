import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MethodeService {

  constructor(private formbuild: FormBuilder) { }

  buildform(methode) {

    if (methode === "extraireContenuArticle") {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        contenurtxt: ['', Validators.required],
        methode: ['extraireContenuArticle', Validators.required]
      })
    }

    if (methode === 'extraireVideosArticleGeneral') {
      return this.formbuild.group({
        attribVideo: ['', Validators.required],
        metaparam: ['', Validators.required],
        methode: ['extraireVideosArticleGeneral', Validators.required],
      })
    }

    if (methode === 'extraireVideosArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        attribVideo: ['', Validators.required],
        methode: ['extraireVideosArticle', Validators.required],
      })
    }

    if (methode === 'extrairesImagesArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        attribImg: ['', Validators.required],
        methode: ['extrairesImagesArticle', Validators.required],
      })
    }

    if (methode === 'extrairesImagesArticleGeneral') {
      return this.formbuild.group({
        metaparam: ['', Validators.required],
        attribImg: ['', Validators.required],
        methode: ['extrairesImagesArticleGeneral', Validators.required],
      })
    }

    if (methode === 'extraireTextHtmlElement') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        niveau: ['', Validators.required],
        methode: ['extraireTextHtmlElement', Validators.required],
      })
    }

    if (methode === 'extraireAuteurArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        niveau: ['', Validators.required],
        methode: ['extraireAuteurArticle', Validators.required],
      })
    }

    if (methode === 'extraireValeurAttributNoeud') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        niveau: ['', Validators.required],
        niveauAttribut: ['', Validators.required],
        methode: ['extraireValeurAttributNoeud', Validators.required],
      })
    }

    if (methode === 'extraireCommentairesArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        methode: ['extraireCommentairesArticle', Validators.required],
      })
    }

    if (methode === 'extraireMotsclesArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        methode: ['extraireMotsclesArticle', Validators.required],
      })
    }

    if (methode === 'extraireMotsclesParTagsMetas') {
      return this.formbuild.group({
        tagProperty: ['', Validators.required],
        methode: ['extraireMotsclesParTagsMetas', Validators.required],
      })
    }

    if (methode === 'extraireThematiquesArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        methode: ['extraireThematiquesArticle', Validators.required],
      })
    }

    if (methode === 'extraireThematiquesParTagsMetas') {
      return this.formbuild.group({
        tagProperty: ['', Validators.required],
        methode: ['extraireThematiquesParTagsMetas', Validators.required],
      })
    }

    if (methode === 'extraireDateMiseJourArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        niveauNoeud: ['', Validators.required],
        niveauAttribut: ['', Validators.required],
        methode: ['extraireDateMiseJourArticle', Validators.required],
      })
    }

    if (methode === 'extraireDatePublicationArticle') {
      return this.formbuild.group({
        noeudpere: ['', Validators.required],
        proprietenoeudpere: ['', Validators.required],
        valeurproprietenoeudpere: ['', Validators.required],
        noeudfils: ['', Validators.required],
        niveauNoeud: ['', Validators.required],
        niveauAttribut: ['', Validators.required],
        methode: ['extraireDatePublicationArticle', Validators.required],
      })
    }
  }
  listesMehodes() {

    let tab = ['extraireAuteurArticle', 'extraireThematiquesParTagsMetas', 'extraireThematiquesArticle',
      'extraireContenuArticle', 'extraireVideosArticleGeneral', 'extraireVideosArticle',
      'extrairesImagesArticleGeneral', 'extrairesImagesArticle', 'extraireCommentairesArticle',
      'extraireMotsclesParTagsMetas', 'extraireMotsclesArticle', 'extraireDatePublicationArticle', 'extraireDateMiseJourArticle',
      'extraireValeurAttributNoeud', 'extraireTextHtmlElement']

    return tab
  }
  formarray(nom: string, form: any) {
    return form.get(nom) as FormArray;
  }

  createform(methode: string, formName: string, form: any) {
    let FormArray = this.formarray(formName, form);
    for (let i = 0; i < this.listesMehodes().length; i++) {
      if (methode === this.listesMehodes()[i]) {
        FormArray.push(this.buildform(methode))
      }
    }
  }
  listeattribut() {
    let tabatt = ['contenuArticle', 'videosArticle', 'imagesArticle', 'auteurArticle',
      'thematiqueArticle', 'sousCategorieArticle', 'titreArticle', 'resumeArticle', 'datePublicationArticle',
      'dateMiseJourArticle', 'nombreLikesArticle', 'nombreLecturesArticle', 'nombreCommentairesArticle',
      'nombrePartagesArticle', 'commentairesArticle', 'motsClesArticle']

      return tabatt;
  }

getattribut(){
  
}

}
