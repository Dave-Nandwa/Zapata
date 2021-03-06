import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    form: any;
    errors: any;
    status: any = {};
    disableSubmit: boolean = false;
    pushForm: any = {};
    constructor(public platform: Platform, private oneSignal: OneSignal, public api: ApiService, public settings: Settings, public loadingController: LoadingController, public router: Router, public navCtrl: NavController, private fb: FormBuilder) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
    }
    ngOnInit() {}
    async onSubmit() {
        this.disableSubmit = true;
        await this.api.postItem('login', this.form.value).subscribe(res => {
            this.status = res;
            if (this.status.errors) {
                this.errors = this.status.errors;
                for (var key in this.errors) {
                    console.log(key);
                    this.errors[key].forEach(item => item.replace('<strong>ERROR<\/strong>:', ''));
                }
            } else if (this.status.data) {
                this.settings.customer.id = this.status.ID;
                 if (this.platform.is('cordova')){
                    this.oneSignal.getIds().then((data: any) => {
                        this.form.onesignal_user_id = data.userId;
                        this.form.onesignal_push_token = data.pushToken;
                    });
                   this.api.postItem('update_user_notification', this.form).subscribe(res =>{});
                 }

                if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                    this.settings.vendor = true;
                }
                this.navCtrl.navigateBack('/tabs/account');
            }
            this.disableSubmit = false;
        }, err => {
            this.disableSubmit = false;
        });
    }
    forgotton() {
        this.navCtrl.navigateForward('/tabs/account/login/forgotten');
    }
}