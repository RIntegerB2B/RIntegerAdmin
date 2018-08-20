import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { PushNotification } from './push-notification.model';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {
  pushNotificationForm: FormGroup;
  pushNotificationModel: PushNotification;
  constructor(private fb: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.pushNotificationForm = this.fb.group({
      mobileNumbers: ['', Validators.required],
      title: ['', Validators.required],
      isAdmin: [false, Validators.required],
      notificationBody: ['', Validators.required],
      imageUrl: ['https://rinteger.com/assets/images/logo.jpg', Validators.required]
    });
  }

  pushNotification(pushNotificationForm: FormGroup) {
    this.pushNotificationModel = new PushNotification(
      pushNotificationForm.controls.mobileNumbers.value,
      pushNotificationForm.controls.title.value,
      pushNotificationForm.controls.isAdmin.value,
      pushNotificationForm.controls.notificationBody.value,
      pushNotificationForm.controls.imageUrl.value
    );
    this.notificationService.pushNotification(this.pushNotificationModel).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
