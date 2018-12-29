import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { AdImageData } from './adImageData.model';
import { AdsModel } from './ads.model';
import {SettingsService} from '../settings.service';
import { DataAnalysisService } from '../../crm/data-analysis/data-analysis.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  fileToUpload: File = null;
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  adsModel: AdsModel;
  message;
  action;

  addModelForm: FormGroup;
  adImageData: AdImageData = new AdImageData();
  constructor(private fb: FormBuilder, private router: Router, private settingsService: SettingsService,
     private localStorageService: LocalStorageService, public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.findImage();
  }
  createForm() {
    this.addModelForm = this.fb.group({
      position: [''],
    });
  }

  handleFileInput(files: FileList, loadedImage) {
    this.fileToUpload = files.item(0);
    this.adImageData.adImage = this.fileToUpload = files[0];
    this.reader.readAsArrayBuffer(this.fileToUpload);
    this.reader.onload = () => {
      const fileResult = this.reader.result;
      this.portFolioImageBytes = new Uint8Array(fileResult);
      this.portFolioImageBlob = new Blob([this.portFolioImageBytes.buffer]);
      const reader1 = new FileReader();
      reader1.readAsDataURL(this.portFolioImageBlob);
      reader1.onload = (e: Event & { target: { result: string } }) => {
        loadedImage.src = reader1.result;
      };
    };
    console.log(this.adImageData);
  }
  uploadImage() {
    this.message = 'image added successfully';
    this.settingsService.uploadAdImage(this.adImageData, this.addModelForm.controls.position.value).subscribe(data => {
      this.adsModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  findImage() {
    this.settingsService.findAdsImage().subscribe(data => {
this.adsModel = data;
    }, error => {
console.log(error);
    });
  }
  deleteAdImage(data) {
    this.message = 'image deleted successfully';
    this.settingsService.deleteAds(data).subscribe(value => {
      this.adsModel = value;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
}
