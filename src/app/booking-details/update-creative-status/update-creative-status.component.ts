import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { BookingDetailsService } from '../booking-details.service';
import { CreativeStatus } from './status.model';
import { Notification } from './notification.model';
import {NavheaderService} from '../../nav-header/nav-header.service';

@Component({
  selector: 'app-update-creative-status',
  templateUrl: './update-creative-status.component.html',
  styleUrls: ['./update-creative-status.component.css']
})
export class UpdateCreativeStatusComponent implements OnInit {
  no;
  value;
  Status: CreativeStatus;
  updateCreativeStatusForm: FormGroup;
  displayStatus: Boolean;
  progress: boolean;
  completed: boolean;
  materialPickedUp: boolean;
  materialPickedUpTrue: boolean;
  materialPickedUpProgress: boolean;
  shootPlanning: boolean;
  shootPlanningTrue: boolean;
  shootPlanningProgress: boolean;
  shoot: boolean;
  shootTrue: boolean;
  shootProgress: boolean;
  postProductionWork: boolean;
  postProductionWorkTrue: boolean;
  postProductionWorkProgress: boolean;
  payment: boolean;
  paymentTrue: boolean;
  paymentProgress: boolean;
  materialReturn: boolean;
  materialReturnTrue: boolean;
  materialReturnProgress: boolean;
  updateGridView: boolean;
  notificationModel: Notification;
  title: string;
  notificationBody: string;
  titleToSent: string;
  confirmed: boolean;
  cancelled: boolean;
  hide: boolean;
  orderconfirmed: boolean;
  readonly VAPID_PUBLIC_KEY = 'BIvwBoUek8ZLiE2HRr_srixb0Qi-Ql6CVBhhhvIuuZ5PMFYrfP0zSkNRrHD-uvIBhJ3_BDmzSFedMzu5ZuaVVRM';
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private bookingService: BookingDetailsService, private navheaderService: NavheaderService,
    private swUpdate: SwUpdate, private swPush: SwPush) {
    this.no = this.activatedRoute.snapshot.paramMap.get('no');
  }

  ngOnInit() {
    this.navheaderService.makeMenuTransparent();
    this.createForm();
    this.getStatus(this.no);
  }
  createForm() {
    this.updateCreativeStatusForm = this.fb.group({
      mobileNo: [''],
      id: ['']
    });
  }
  getStatus(id) {
    this.bookingService.getCreativeStatus(id).subscribe(data => {
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningProgress = false;
          this.shootPlanningTrue = true;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningProgress = true;
          this.shootPlanningTrue = false;
          break;
        }
      }
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shootTrue = true;
          this.shoot = false;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shootTrue = false;
          this.shoot = false;
          this.shootProgress = true;
          break;
        }
      }
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentProgress = false;
          this.paymentTrue = true;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentProgress = true;
          this.paymentTrue = false;
          break;
        }
      }
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnProgress = false;
          this.materialReturnTrue = true;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnProgress = true;
          this.materialReturnTrue = false;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompMaterialPickedUp(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.materialPickedUp(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressMaterialPickedUp(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.materialPickedUp(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompShootPlanning(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.shootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressShootPlanning(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.shootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompShoot(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.shooting(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressShoot(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.shooting(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompPostProductionWork(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.postProductionWork(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressPostProductionWork(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.postProductionWork(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.creativePayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressPayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.creativePayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  notCompMaterialReturn(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 0;
    this.bookingService.creativeMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  progressMaterialReturn(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 2;
    this.bookingService.creativeMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  updateMaterialPickedUp(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedMaterialPickedUp(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].materialPickedUp) {
        case 0: {
          this.materialPickedUp = true;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = false;
          break;
        }
        case 1: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = true;
          this.materialPickedUpProgress = false;
          break;
        }
        case 2: {
          this.materialPickedUp = false;
          this.materialPickedUpTrue = false;
          this.materialPickedUpProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material PickedUp Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateShootPlanning(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedShootPlanning(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootPlanning) {
        case 0: {
          this.shootPlanning = true;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = false;
          break;
        }
        case 1: {
          this.shootPlanning = false;
          this.shootPlanningTrue = true;
          this.shootPlanningProgress = false;
          break;
        }
        case 2: {
          this.shootPlanning = false;
          this.shootPlanningTrue = false;
          this.shootPlanningProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Shoot Planning Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateShoot(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedShooting(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].shootCompleted) {
        case 0: {
          this.shoot = true;
          this.shootTrue = false;
          this.shootProgress = false;
          break;
        }
        case 1: {
          this.shoot = false;
          this.shootTrue = true;
          this.shootProgress = false;
          break;
        }
        case 2: {
          this.shoot = false;
          this.shootTrue = false;
          this.shootProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Shooting Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updatePostProductionWork(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedPostProductionWork(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].postProductionWork) {
        case 0: {
          this.postProductionWork = true;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = false;
          break;
        }
        case 1: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = true;
          this.postProductionWorkProgress = false;
          break;
        }
        case 2: {
          this.postProductionWork = false;
          this.postProductionWorkTrue = false;
          this.postProductionWorkProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Post Production Work Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updatePayment(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedCreativePayment(mobileNumber, orderId, this.value).subscribe(data => {
      console.log(data);
      this.Status = data;
      switch (data[0].payment) {
        case 0: {
          this.payment = true;
          this.paymentTrue = false;
          this.paymentProgress = false;
          break;
        }
        case 1: {
          this.payment = false;
          this.paymentTrue = true;
          this.paymentProgress = false;
          break;
        }
        case 2: {
          this.payment = false;
          this.paymentTrue = false;
          this.paymentProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Payment Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  updateMaterialReturn(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedCreativeMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
  }
  completeMaterialReturn(updateEditingStatusForm: FormGroup, mobileNumber: any, orderId: any) {
    this.value = 1;
    this.bookingService.completedCreativeMaterialReturn(mobileNumber, orderId, this.value).subscribe(data => {
      this.Status = data;
      switch (data[0].materialReturn) {
        case 0: {
          this.materialReturn = true;
          this.materialReturnTrue = false;
          this.materialReturnProgress = false;
          break;
        }
        case 1: {
          this.materialReturn = false;
          this.materialReturnTrue = true;
          this.materialReturnProgress = false;
          break;
        }
        case 2: {
          this.materialReturn = false;
          this.materialReturnTrue = false;
          this.materialReturnProgress = true;
          break;
        }
      }
    }, error => {
      console.log(error);
    });
    this.titleToSent =  'Material Return Completed';
    this.sendNotification(mobileNumber, orderId , this.titleToSent);
  }
  sendNotification(mobileNumber, orderId , title) {
    this.title = title;
    this.notificationBody = 'Booking Id ' + orderId + 'completed';
    this.notificationModel = new Notification(
      mobileNumber,
      this.title,
    this.notificationBody
    );
    this.bookingService.pushNotification(this.notificationModel).subscribe(data => {
      console.log(data);
    });
  }
}
