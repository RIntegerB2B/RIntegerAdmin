import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../settings.service';
import { Banner } from '../../shared/bannerModel.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  fileToUpload;
  fileToLoad;
  fileLength;
  bannerData;
  byteArrayConverted: any;
  check;
  showImage: any;
  banner: Banner;
  bannerAll: Banner;
  BASE64_MARKER: any = ';base64,';
  constructor(
    private settingsService: SettingsService
  ) { }
  ngOnInit() {
    this.banner = new Banner(
      '',
      ''
    );
    this.getAllBanner();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.check = reader.result;
      this.byteArrayConverted = this.convertDataURIToBinary(this.check);
      this.banner.bannerName = this.fileToUpload.name;
      this.banner.bannerImage = this.check;
      this.showImage = this.check;
    };
    this.banner = this.banner;
    
  }
  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
  uploadBanner() {
    this.settingsService.uploadBannerImage(this.banner).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
  getAllBanner() {
    this.settingsService.findBanner().subscribe(data => {
      this.bannerAll = data;
      console.log(this.banner);
    }, error => {
      console.log(error);
    });
  }
  deleteSingleBanner(deleteData) {
    console.log(deleteData);
    this.settingsService.deleteBanner(deleteData).subscribe(data => {
      this.bannerAll = data;
    }, error => {
      console.log(error);
    });
  }
}
