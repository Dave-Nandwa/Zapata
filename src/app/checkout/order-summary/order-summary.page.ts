import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { Data } from '../../data';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.page.html',
    styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
    id: any;
    order: any;
    constructor(public data: Data, public alertController: AlertController,  public api: ApiService, public settings: Settings, public router: Router, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute) {}

    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }

    async getOrder() {
        const loading = await this.loadingController.create({
            message: 'Loading...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        }); 
        await loading.present();
        await this.api.getItem('orders/' + this.id).subscribe(res => {
            this.order = res;
            loading.dismiss()
            this.presentAlert("ORDER" + this.order.id, "Your order is being processed.");
        }, err => {
            console.log(err);
            loading.dismiss();
        }); 
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getOrder();
    }
    continue () {
        //Clear Cart
        this.data.count = 0;
        this.router.navigate(['/tabs/home']);
    }
}
 