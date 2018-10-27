import { Component, OnInit } from '@angular/core';
import { UploadManagementService} from '../upload-management.service';
import { Market } from '../../../shared/marketing.model';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-management',
  templateUrl: './upload-management.component.html',
  styleUrls: ['./upload-management.component.css']
})
export class UploadManagementComponent implements OnInit {

  constructor(private uploadManagementService: UploadManagementService, private router: Router) { }
  arrayBuffer: any;
  file: File;
  excelMarket: any = [{
    customerName: 'customerName1',
    mobileNumber: '9988776655',
    whatsAppNo: 'male/Female',
    landLine: '04651 865235',
    email: 'sample@email.com',
    location: 'bengalore'
  }];
  newMarketCustomer: Market [];
  ngOnInit() {
  }
  marketUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.newMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadManagementService.createMarketCustomer(this.newMarketCustomer)
        .subscribe(detail => {
          this.newMarketCustomer = detail;
          console.log(detail);
          this.router.navigate(['/navheader/crmmarket']);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  fileMarket(event) {
    this.file = event.target.files[0];
  }
  marketAsXLSX() {
    this.uploadManagementService.exportAsExcelFile(this.excelMarket, 'market');
  }
}