import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CheckoutData } from '../../data/checkout';
import { Settings } from './../../data/settings';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser/ngx";
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CardIO } from '@ionic-native/card-io/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  orderReview: any;
  results: any = {};
  disableButton: boolean = false;
  errorMessage: any;
  orderId: any;
  cardResponse: any = {};
  stripeForm: any = {};
  priceTotal: any;
  constructor(private oneSignal: OneSignal, public platform: Platform, private cardIO: CardIO, public api: ApiService, public checkoutData: CheckoutData, public settings: Settings, public router: Router, public iab: InAppBrowser, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute) { }
  ngOnInit() {
    this.updateOrder();
    this.route.queryParams.subscribe((res) => {
      this.priceTotal = res.total;
    });
    console.log(this.priceTotal);
  }
  async updateOrder() {
    this.checkoutData.form.security = this.checkoutData.form.nonce.update_order_review_nonce;
    await this.api.postItem('update_order_review', this.checkoutData.form).subscribe(res => {
      this.orderReview = res;
    }, err => {
      console.log(err);
    });
  }
  async updateOrderReview() {
    this.checkoutData.form.shipping_method = [];
    this.orderReview.shipping.forEach((item, index) => {
      this.checkoutData.form['shipping_method[' + index + ']'] = item.chosen_method;
    })
    this.checkoutData.form.security = this.checkoutData.form.nonce.update_order_review_nonce;
    await this.api.postItem('update_order_review', this.checkoutData.form).subscribe(res => {
      this.handleData(res);
    }, err => {
      console.log(err);
    });
  }
  handleData(results) {
    console.log(results);
    //
  }
  async placeOrder() {
    this.disableButton = true;
    this.errorMessage = undefined;
    if (this.platform.is('cordova'))
      this.oneSignal.getIds().then((data: any) => {
        this.checkoutData.form.onesignal_user_id = data.userId;
      });

    if (this.checkoutData.form.payment_method == 'stripe') {
      this.setStripeForm();
      await this.api.getExternalData('https://api.stripe.com/v1/tokens', this.stripeForm).subscribe(res => {
        this.handleStipeToken(res);
      }, err => { console.log(err) });
    } else {
      await this.api.ajaxCall('/checkout?wc-ajax=checkout', this.checkoutData.form).subscribe(res => {
        this.results = res;
        this.handleOrder();
      }, err => {
        this.disableButton = false;
        console.log(err);
      });
    }
  }

  handleCustomBilling() {
    if (this.results.result == 'success') {
      var str = this.results.redirect;
      console.log(this.results.redirect);
      var pos1 = str.lastIndexOf("order-received/");
      var pos2 = str.lastIndexOf("?key=wc_order");
      var pos3 = pos2 - (pos1 + 15);
      var order_id = str.substr(pos1 + 15, pos3);
      this.navCtrl.navigateRoot('/order-summary/' + order_id);
    }
    else if (this.results.result == "failure") {
      this.disableButton = false;
      this.errorMessage = this.results.messages;
      console.log(this.errorMessage);
    }
    this.disableButton = false;
  }

  handleOrder() {
    if (this.results.result == 'success') {
      if (this.checkoutData.form.payment_method == 'wallet' || this.checkoutData.form.payment_method == 'stripe' || this.checkoutData.form.payment_method == 'bacs' || this.checkoutData.form.payment_method == 'cheque' || this.checkoutData.form.payment_method == 'cod') {
        this.orderSummary(this.results.redirect);
      } else if (this.checkoutData.form.payment_method == 'payuindia') {
        this.handlePayUPayment();
      } else if (this.checkoutData.form.payment_method == 'paytm') {
        this.handlePaytmPayment();
      }
      else this.handlePayment();
    }
    else if (this.results.result == 'failure') {
      this.disableButton = false;
      this.errorMessage = this.results.messages;
    }
  }

  orderSummary(address) {
    var str = address;
    var pos1 = str.lastIndexOf("/order-received/");
    var pos2 = str.lastIndexOf("/?key=wc_order");
    var pos3 = pos2 - (pos1 + 16);
    var order_id = str.substr(pos1 + 16, pos3);
    this.router.navigate(['/order-summary/' + order_id]);
  }

  handlePayment() {
    //var options = "location=no,hidden=yes,toolbar=no,hidespinner=yes";
    const options: InAppBrowserOptions = {
      zoom: 'no',
      hidespinner: 'yes',
      hidden: 'yes'
    };
    let browser = this.iab.create(this.results.redirect, '_self', options);
    //browser.show();
    browser.on('loadstart').subscribe(data => {
      if (data.url.indexOf('/order-received/') != -1 && data.url.indexOf('key=wc_order_') != -1) {
        //browser.hide();
        this.orderSummary(data.url);
      } else if (data.url.indexOf('cancel_order=true') != -1 || data.url.indexOf('cancelled=1') != -1 || data.url.indexOf('cancelled') != -1) {
        browser.close();
        this.disableButton = false;
      }
    });
    browser.on('exit').subscribe(data => {
      this.disableButton = false;
    });
  }

  handlePayUPayment() {
    var options = "location=no,hidden=yes,toolbar=no,hidespinner=yes";
    let browser = this.iab.create(this.results.redirect, '_blank', options);
    let str = this.results.redirect;
    var pos1 = str.lastIndexOf("/order-pay/");
    var pos2 = str.lastIndexOf("/?key=wc_order");
    var pos3 = pos2 - (pos1 + 11);
    this.orderId = str.substr(pos1 + 11, pos3);
    browser.on('loadstart').subscribe(data => {
      var browserActive = false;
      if (data.url.indexOf('payumoney.com/transact') != -1 && !browserActive) {
        browserActive = true;
        browser.show();
      }
      else if (data.url.indexOf('/order-received/') != -1 && data.url.indexOf('key=wc_order_') != -1) {
        if (this.orderId)
          this.navCtrl.navigateRoot('/order-summary/' + this.orderId);
        browser.hide();
      } else if (data.url.indexOf('cancel_order=true') != -1 || data.url.indexOf('cancelled=1') != -1 || data.url.indexOf('cancelled') != -1) {
        browser.close();
        this.disableButton = false;
      }
    });
    browser.on('exit').subscribe(data => {
      this.disableButton = false;
    });
  }
  handlePaytmPayment() {
    var str = this.results.redirect;
    var pos1 = str.lastIndexOf("/order-pay/");
    var pos2 = str.lastIndexOf("/?key=wc_order");
    var pos3 = pos2 - (pos1 + 11);
    this.orderId = str.substr(pos1 + 11, pos3);
    if (this.results.result == 'success') {
      var options = "location=no,hidden=yes,toolbar=yes";
      let browser = this.iab.create(this.results.redirect, '_blank', options);
      browser.on('loadstart').subscribe(data => {
        var browserActive = false;
        if (data.url.indexOf('securegw-stage.paytm.in/theia') != -1 && !browserActive) {
          browserActive = true;
          browser.show();
        }
        else if (data.url.indexOf('type=success') != -1) {
          if (this.orderId)
            this.navCtrl.navigateRoot('/order-summary/' + this.orderId);
          browser.hide();
        }
        else if (data.url.indexOf('type=error') != -1 || data.url.indexOf('Failed') != -1 || data.url.indexOf('cancel_order=true') != -1 || data.url.indexOf('cancelled') != -1) {
          browser.close();
          this.disableButton = false;
        }
        else if (data.url.indexOf('Thank+you+for+your+order') != -1) {
          browser.close();
          this.disableButton = false;
        }
      });
      browser.on('exit').subscribe(data => {
        this.disableButton = false;
      });
    }
    else if (this.results.result == 'failure') {
      this.errorMessage = this.results.messages;
      this.disableButton = false;
    }
  }
  onChangePayment() {
    this.disableButton = false;
    console.log(this.checkoutData.form.payment_method);
    // if (this.checkoutData.form.payment_method == 'dear_eko_wmbp_eko' || this.checkoutData.form.payment_method == 'dear_paym_wmbp_paym' || this.checkoutData.form.payment_method == 'dear_pesa_wmbp_pesa') {
    //   this.handlePayment();
    // }
    if (this.checkoutData.form.payment_method == 'stripe' && this.platform.is('cordova')) {
      this.enterCard();
    }
  }
  enterCard() {
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            let options = {
              requireExpiry: true,
              requireCVV: true,
              scanInstructions: "Scan the front of your card",
              scanExpiry: true,
              hideCardIOLogo: true,
              noCamera: true,
            };
            this.cardIO.scan(options)
              .then((data) => {
                this.setCardData(data);
              }, err => {
                console.log(err);
              });
          }
        }
      );
  }
  setCardData(data) {
    this.cardResponse = data;
    this.checkoutData.form['moneris-card-number'] = this.cardResponse.cardNumber;
    this.cardResponse.expiryYear = this.cardResponse.expiryYear.slice(0, 2); //2030
    this.checkoutData.form['moneris-card-expiry'] = this.cardResponse.expiryMonth + ' / ' + this.cardResponse.expiryYear;//;'04 / 30'
    this.checkoutData.form['moneris-card-cvc'] = this.cardResponse.cvv;
  }
  setStripeForm() {
    this.stripeForm.key = this.orderReview.payment.stripe.publishable_key;
    this.stripeForm.payment_user_agent = 'stripe.js/6ea8d55';
    this.stripeForm['card[number]'] = this.cardResponse.cardNumber;//'4242424242424242';//this.cardResponse.cardNumber;
    this.stripeForm['card[exp_month]'] = this.cardResponse.expiryMonth;//'04';//this.cardResponse.expiryMonth;
    this.stripeForm['card[exp_year]'] = this.cardResponse.expiryYear;////this.cardResponse.expiryYear;
    this.stripeForm['card[cvc]'] = this.cardResponse.cvv;//this.cardResponse.cvc;
    this.stripeForm['card[name]'] = this.checkoutData.form.billing_first_name + this.checkoutData.form.billing_last_name;
    this.stripeForm['card[address_line1]'] = this.checkoutData.form.billing_address_1;
    this.stripeForm['card[address_line2]'] = this.checkoutData.form.billing_address_2;
    this.stripeForm['card[address_state]'] = this.checkoutData.form.billing_state;
    this.stripeForm['card[address_city]'] = this.checkoutData.form.billing_city;
    this.stripeForm['card[address_zip]'] = this.checkoutData.form.billing_postcode;
    this.stripeForm['card[address_country]'] = this.checkoutData.form.billing_country;
    return true;
  }
  handleStipeToken(token) {
    console.log(token);
    if (token && token.id) {
      var form = { type: 'card', token: '', key: '' };
      form.type = 'card';
      form.token = token.id;
      form.key = this.orderReview.payment.stripe.publishable_key;
      this.checkoutData.form['wc-stripe-payment-token'] = token.id; //For Existing Cards add api
      this.api.getExternalData('https://api.stripe.com/v1/sources', form).subscribe(res => {
        this.stripePlaceOrder(res);
      }, err => { console.log(err) });
    } else {
      this.disableButton = false;
      this.errorMessage = 'Cannot handle payment, Please check card details';
    }
  }
  stripePlaceOrder(src) {
    if (src && src.id) {
      this.checkoutData.form['stripe_source'] = src.id;
      this.api.ajaxCall('/checkout?wc-ajax=checkout', this.checkoutData.form).subscribe(res => {
        this.results = res;
        this.handleOrder();
      }, err => {
        this.disableButton = false;
        console.log(err);
      });
    } else {
      this.disableButton = false;
      this.errorMessage = 'Cannot handle payment, Please check card details';
    }
  }
}
