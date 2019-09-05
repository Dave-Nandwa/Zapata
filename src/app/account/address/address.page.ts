import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { Settings } from './../../data/settings';
import { CheckoutData } from '../../data/checkout';

@Component({ 
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  errorMessage: any;
  loader: boolean = false;
  countries: any;
  areas:any;
  constructor(public api: ApiService, public checkoutData: CheckoutData, public settings: Settings, public router: Router, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute) { }
  ngOnInit() {
    this.areas = ["area1"];
    this.getCustomer();
    this.getCheckoutForm();
    this.getCountries();
    console.log("Hello.");
  } 
  async getCustomer() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    await this.api.getItem('customers/' + this.settings.customer.id).subscribe(res => {
      this.settings.customer = res;
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }
  editAddress() {
    this.navCtrl.navigateForward('/tabs/account/address/edit-address');
  }

  async getCheckoutForm() {
    this.loader = true;
    await this.api.postItem('get_checkout_form').subscribe(res => {
      this.checkoutData.form = res;
      this.checkoutData.form.sameForShipping = true;
      this.getBillingRegion();
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }

  getCountries() {
    this.api.getItem('settings/general/woocommerce_specific_allowed_countries').subscribe(res => {
      this.countries = res;
    }, err => {
      console.log(err);
    });
  }
  getBillingRegion() {
    console.log(this.checkoutData.form.state);
    console.log(this.checkoutData.form.billing_country);
    if ((this.checkoutData.form.state[this.checkoutData.form.billing_country] && 0 !== this.checkoutData.form.state[this.checkoutData.form.billing_country].length)) {
      this.checkoutData.billingStates = this.checkoutData.form.state[this.checkoutData.form.billing_country];
    }
    else this.checkoutData.billingStates = undefined;
    //this.updateOrderReview();
  }
  getShippingRegion() {
    if (this.checkoutData.form.state[this.checkoutData.form.shipping_country] && 0 !== this.checkoutData.form.state[this.checkoutData.form.shipping_country].length) this.checkoutData.shippingStates = this.checkoutData.form.state[this.checkoutData.form.shipping_country];
    else this.checkoutData.shippingStates = undefined;
    //this.updateOrderReview();
  }
  async updateOrderReview() {
    await this.api.postItem('update_order_review').subscribe(res => {
      this.checkoutData.orderReview = res;
    }, err => {
      console.log(err);
    });
  }

  continueCheckout() {

    this.errorMessage = '';

    if (this.validateForm()) {
      if (!this.checkoutData.form.ship_to_different_address)
        this.assgnShippingAddress();
      //this.navCtrl.navigateForward('/tabs/cart/checkout');
      this.router.navigate(['/tabs/cart/checkout'], { queryParamsHandling: "merge" });
    }
  }

  validateForm() {
    if (this.checkoutData.form.billing_first_name == '' || this.checkoutData.form.billing_first_name == undefined) {
      this.errorMessage = 'Billing first name is a required field';
      return false;
    }

    if (this.checkoutData.form.billing_last_name == '' || this.checkoutData.form.billing_last_name == undefined) {
      this.errorMessage = 'Billing last name is a required field';
      return false;
    }
 
    if (this.checkoutData.form.billing_phone == '' || this.checkoutData.form.billing_phone == undefined) {
      this.errorMessage = 'Billing phone is a required field';
      return false;
    }

    if (this.checkoutData.form.billing_address_1 == '' || this.checkoutData.form.billing_address_1 == undefined) {
      this.errorMessage = 'Billing Street address is a required field';
      return false;
    }

    if (this.checkoutData.form.billing_address_2 == '' || this.checkoutData.form.billing_address_2 == undefined) {
      this.errorMessage = 'Landmark is a required field';
      return false;
    }

    if (this.checkoutData.form.billing_city == '' || this.checkoutData.form.billing_city == undefined) {
      this.errorMessage = 'Billing city is a required field';
      return false;
    }

    // if(this.checkoutData.form.billing_postcode == '' || this.checkoutData.form.billing_postcode == undefined){
    //     this.errorMessage = 'Billing post code is a required field';
    //     return false;
    // }

    if (this.checkoutData.form.billing_country == '' || this.checkoutData.form.billing_country == undefined) {
      this.errorMessage = 'Billing country is a required field';
      return false;
    }

    if (this.checkoutData.form.billing_state == '' || this.checkoutData.form.billing_state == undefined) {
      this.errorMessage = 'Billing state is a required field';
      return false;
    }

    if (this.checkoutData.form.ship_to_different_address) {
      if (this.checkoutData.form.shipping_first_name == '' || this.checkoutData.form.shipping_first_name == undefined) {
        this.errorMessage = 'Shipping first name is a required field';
        return false;
      }

      if (this.checkoutData.form.shipping_last_name == '' || this.checkoutData.form.shipping_last_name == undefined) {
        this.errorMessage = 'Shipping last name is a required field';
        return false;
      }

      if (this.checkoutData.form.shipping_address_1 == '' || this.checkoutData.form.shipping_address_1 == undefined) {
        this.errorMessage = 'Shipping Street address is a required field';
        return false;
      }

      if (this.checkoutData.form.shipping_address_2 == '' || this.checkoutData.form.shipping_address_2 == undefined) {
        this.errorMessage = 'Landmark is a required field';
        return false;
      }

      if (this.checkoutData.form.shipping_city == '' || this.checkoutData.form.shipping_city == undefined) {
        this.errorMessage = 'Shipping city is a required field';
        return false;
      }

      // if(this.checkoutData.form.shipping_postcode == '' || this.checkoutData.form.shipping_postcode == undefined){
      //     this.errorMessage = 'Shipping post code is a required field';
      //     return false;
      // }

      if (this.checkoutData.form.shipping_country == '' || this.checkoutData.form.shipping_country == undefined) {
        this.errorMessage = 'Shipping country is a required field';
        return false;
      }

      if (this.checkoutData.form.shipping_state == '' || this.checkoutData.form.shipping_state == undefined) {
        this.errorMessage = 'Shipping state is a required field';
        return false;
      }
      return true;
    }

    else return true;
  }

  assgnShippingAddress() {
    this.checkoutData.form.shipping_first_name = this.checkoutData.form.billing_first_name;
    this.checkoutData.form.shipping_last_name = this.checkoutData.form.billing_last_name;
    // this.checkoutData.form.shipping_company = this.checkoutData.form.billing_company;
    this.checkoutData.form.shipping_address_1 = this.checkoutData.form.billing_address_1;
    this.checkoutData.form.shipping_address_2 = this.checkoutData.form.billing_address_2;
    this.checkoutData.form.shipping_city = this.checkoutData.form.billing_city;
    // this.checkoutData.form.shipping_postcode = this.checkoutData.form.billing_postcode;
    this.checkoutData.form.shipping_country = this.checkoutData.form.billing_country;
    this.checkoutData.form.shipping_state = this.checkoutData.form.billing_state;
    return true;
  }

}
