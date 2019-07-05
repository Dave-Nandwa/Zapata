import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { Data } from '../../data';
import { Settings } from './../../data/settings';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    form: any;
    errors: any;
    status: any = {};
    disableSubmit: boolean = false;
    pushForm: any;
    constructor(public platform: Platform, private oneSignal: OneSignal, public api: ApiService, public data: Data, public loadingController: LoadingController, public settings: Settings, public navCtrl: NavController, private fb: FormBuilder) {
        this.form = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.required],
            password: ['', Validators.required],
          });
    }
    ngOnInit() {}
    async onSubmit() {
        this.disableSubmit = true;
        await this.api.postItem('create-user', this.form.value).subscribe(res => {
            this.status = res;
            if (this.status.errors) {
                this.errors = this.status.errors;
                this.disableSubmit = false;
                for (var key in this.errors) {
                    console.log(key);
                    this.errors[key].forEach(item => item.replace('<strong>ERROR<\/strong>:', ''));
                }
            }
            else if (this.status.data != undefined) {
                this.settings.customer.id = this.status.ID;
                 if (this.platform.is('cordova'))
                    this.oneSignal.getIds().then((data: any) => {
                        this.pushForm.onesignal_user_id = data.userId;
                        this.pushForm.onesignal_push_token = data.pushToken;
                    });
                   this.api.postItem('update_user_notification', this.pushForm).subscribe(res =>{})
                this.navCtrl.navigateBack('/tabs/account');
                this.disableSubmit = false;
            }
            else this.disableSubmit = false;
        }, err => {
            this.disableSubmit = false;
        });
    }
}