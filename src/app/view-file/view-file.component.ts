import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../service/file.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit {
  jsonfile = {}
  fileName = null;

  constructor(private rout: ActivatedRoute, private file: FileService, private route: Router) { }

  ngOnInit(): void {
    this.fileName = this.rout.snapshot.params['nom'];

    this.file.GetOneJsonFile(this.fileName).subscribe(res => {
      this.jsonfile = JSON.stringify(res, null, 2);
      if(res.error){
        this.route.navigate(['home/not-found'])
      }
    },
      err => { this.route.navigate(['home/not-found']) }
    );
  }
  delete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons
      .fire({
        title: "Etes vous sûre?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer!",
        cancelButtonText: "No, annuler!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.file.DeleteJsnFile(this.fileName).subscribe(res => {
            swalWithBootstrapButtons.fire(
              "Supprimé!",
              "Le fichier a été supprimé.",
              "success"
            );
            this.route.navigate(['home'])
          },
            err => { console.log('erreur'); }
          );
        }
      });

  }
}
