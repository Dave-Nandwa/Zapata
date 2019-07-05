import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Data } from '../data';
import { Settings } from '../data/settings';
import { Product } from '../data/product';
import { md5 } from './md5';
import { ReviewPage } from '../review/review.page';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Vendor } from '../data/vendor';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss']
})
export class ProductPage {
    product: any;
    filter: any = {};
    usedVariationAttributes: any = [];
    options: any = {};
    id: any;
    variations: any = [];
    relatedProducts: any = [];
    upsellProducts: any = [];
    crossSellProducts: any = [];
    reviews: any = [];
    cart: any = {};
    status: any;
    disableButton: boolean = false;
    quantity: any;
    addons: any;//ADDONS
    addonsList: any = [];//ADDONS
    lan: any = {};
    constructor(public translate: TranslateService, public toastController: ToastController, private socialSharing: SocialSharing, public modalCtrl: ModalController, public api: ApiService, public data: Data, public productData: Product, public settings: Settings, public router: Router, public loadingController: LoadingController, public navCtrl: NavController, public alertController: AlertController, public route: ActivatedRoute, public vendor: Vendor) {
        this.filter.page = 1;
        this.quantity = "1";
    }
    async getReviewsPage() {
        this.navCtrl.navigateForward(this.router.url + '/review/' + this.product.id);
    }
    async getProduct() {
        await this.api.getItem('products/' + this.id).subscribe(res => {
            this.product = res;
            this.handleProduct();
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        this.translate.get(['Oops!', 'Please Select', 'Please wait', 'Options', 'Option', 'Select', 'Item added to cart' ]).subscribe(translations => {
            this.lan.oops = translations['Oops!'];
            this.lan.PleaseSelect = translations['Please Select'];
            this.lan.Pleasewait = translations['Please wait'];
            this.lan.options = translations['Options'];
            this.lan.option = translations['Option'];
            this.lan.select = translations['Select'];
            this.lan.addToCart = translations['Item added to cart'];
        });
        this.product = this.productData.product;
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.product.id) this.handleProduct();
        else this.getProduct();
    }
    handleProduct() {

        /* Reward Points */
        if(this.settings.settings.switchRewardPoints)
        this.product.meta_data.forEach(item => {
            if(item.key == '_wc_points_earned'){
                this.product.showPoints = item.value;
            }
        });

        /* Product Addons */
        if(this.settings.settings.switchAddons)
        this.getAddons();

        this.usedVariationAttributes = this.product.attributes.filter(function(attribute) {
            return attribute.variation == true
        });
        if ((this.product.type == 'variable') && this.product.variations.length) this.getVariationProducts();
        this.getRelatedProducts();
        this.getUpsellProducts();
        this.getCrossSellProducts();
        this.getReviews();
    }
    async getVariationProducts() {
        await this.api.getItem('products/' + this.product.id + '/variations').subscribe(res => {
            this.variations = res;
        }, err => {});
    }
    async getRelatedProducts() {
        if (this.product.related_ids != 0) {
            var filter = [];
            for (let item in this.product.related_ids) filter['include[' + item + ']'] = this.product.related_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.relatedProducts = res;
            }, err => {});
        }
    }
    async getUpsellProducts() {
        if (this.product.upsell_ids != 0) {
            var filter = [];
            for (let item in this.product.upsell_ids) filter['include[' + item + ']'] = this.product.upsell_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.upsellProducts = res;
            }, err => {});
        }
    }
    async getCrossSellProducts() {
        if (this.product.cross_sell_ids != 0) {
            var filter = [];
            for (let item in this.product.cross_sell_ids) filter['include[' + item + ']'] = this.product.cross_sell_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.crossSellProducts = res;
            }, err => {});
        }
    }
    async getReviews() {
        await this.api.getReviews('products/'+this.product.id+'/reviews').subscribe(res => {
            this.reviews = res;
            for (let item in this.reviews) {
                this.reviews[item].avatar = md5(this.reviews[item].email);
            }
        }, err => {});
    }
    goToProduct(product) {
        this.productData.product = product;
        var endIndex = this.router.url.lastIndexOf('/');
        var path = this.router.url.substring(0, endIndex);
        this.navCtrl.navigateForward(path + '/' + product.id);
    }
    async addToCart() {

        /* This is for Adons */
        this.selectAdons();

        this.options.product_id = this.product.id;
        if (this.setVariations()) {
            this.disableButton = true;
            await this.api.postItem('add_to_cart', this.options).subscribe(res => {
                this.cart = res;
                this.presentToast(this.lan.addToCart);
                this.data.updateCart(this.cart.cart);
                this.disableButton = false;
            }, err => {
                console.log(err);
                this.disableButton = false;
            });
        }
    }
    async presentToast(message) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
    }
    setVariations() {
        this.product.attributes.forEach(item => {
            if (item.selected) {
                this.options['variation[attribute_pa_' + item.name + ']'] = item.selected;
            }
        })
        for (var i = 0; i < this.product.attributes.length; i++) {
            if (this.product.attributes[i].variation && this.product.attributes[i].selected == undefined) {
                this.presentAlert(this.lan.options, this.lan.select + this.product.attributes[i].name + this.lan.option);
                return false;
            }
        }
        return true;
    }
    chooseVariation(att, value) {
        this.product.attributes.forEach(item => {
            if (item.name == att.name) {
                item.selected = value;
            }
        })
        if (this.usedVariationAttributes.every(a => a.selected !== undefined))
        this.variations.forEach(variation => {
            var test = new Array(this.usedVariationAttributes.length);
            test.fill(false);
            this.usedVariationAttributes.forEach(attribute => {
                if (variation.attributes.length == 0) {
                    this.options.variation_id = variation.id;
                    this.product.stock_status = variation.stock_status;
                    this.product.price = variation.price;
                    this.product.sale_price = variation.sale_price;
                    this.product.regular_price = variation.regular_price;
                    //this.product.images[0] = variation.image; /* Uncomment this if you want to use variation images */
                } else {
                    variation.attributes.forEach((item, index) => {
                        if (item.name == attribute.name && item.option == attribute.selected) {
                            test[index] = true;
                        }
                    })
                    if (test.every(v => v == true)) {
                        this.options.variation_id = variation.id;
                        this.product.stock_status = variation.stock_status;
                        this.product.price = variation.price;
                        this.product.sale_price = variation.sale_price;
                        this.product.regular_price = variation.regular_price;
                        //this.product.images[0] = variation.image;  /* Uncomment this if you want to use variation images */
                        test.fill(false);
                    } else if (test.some(v => v == false)) {
                        this.product.stock_status = 'outofstock';
                    }
                }
            })
        })
    }
    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }
    OnDestroy() {
        this.productData.product = {};
    }
    share(){
        var options = {
            message: "Check this out!",
            subject: this.product.name,
            files: ['', ''],
            url: this.product.permalink,
            chooserTitle: 'Choose an App'
        }
        
        this.socialSharing.shareWithOptions(options);
    }
    getDetail(id) {
        this.vendor.vendor.id = id;
        var pages = this.router.url.split('/');
        this.navCtrl.navigateForward('/tabs/' + pages[2] + '/vendor-products');
    }

    /* PRODUCT ADDONS */
    getAddons(){
        if(this.product.meta_data){
            for(let item in this.product.meta_data){
                if(this.product.meta_data[item].key == '_product_addons' && this.product.meta_data[item].value.length){
                    this.addonsList.push(...this.product.meta_data[item].value)           
                }
            }
        }
        this.getGlobalAddons()
    }
    getGlobalAddons(){
        this.api.getAddonsList('product-add-ons').subscribe(res => {
            this.handleAddonResults(res);
        });
    }
    handleAddonResults(results){
        results.forEach(item => {
            this.addonsList.push(...item.fields)
        });
    }
    selectAdons() {
        this.options = {};
        if(this.validateform()) {
            this.addonsList.forEach((value, i) => {
                value.selectedName = value.name.toLowerCase();
                value.selectedName = value.selectedName.split(' ').join('-');
                value.selectedName = value.selectedName.split('.').join('');
                    value.options.forEach((option, j) => {
                        option.selectedLabel = option.label.toLowerCase();
                        option.selectedLabel = option.selectedLabel.split(' ').join('-');
                        option.selectedLabel = option.selectedLabel.split('.').join('');
                        if (value.selected instanceof Array) {
                            if (value.selected.includes(option.label)) {
                                this.options['addon-' + this.product.id + '-' + value.selectedName + '-' + i + '[' + j + ']' ] = option.selectedLabel;
                            }
                        }
                        else if (option.label == value.selected && value.type == 'select') {
                            this.options['addon-' + this.product.id + '-' + value.selectedName + '-' + i ] = option.selectedLabel + '-' + (j + 1);
                        }
                        else if (option.label == value.selected && value.type == 'radiobutton') {
                            this.options['addon-' + this.product.id + '-' + value.selectedName + '-' + i + '[' + j + ']' ] = option.selectedLabel;
                        }
                        else if (value.type === 'custom_textarea' && option.input && option.input !== '') {
                            this.options['addon-' + this.product.id + '-' + value.selectedName + '-' + i + '[' + option.selectedLabel + ']' ] = option.input;
                        }
                    });
            });
        }
    }
    validateform(){
        if(this.addonsList){
             for(let addon in this.addonsList){
                for(let item in this.addonsList[addon].fields){
                    if(this.addonsList[addon].fields[item].required == '1' && this.addonsList[addon].fields[item].selected == ''){
                        this.presentAlert(this.lan.oops, this.lan.PleaseSelect + this.addonsList[addon].fields[item].name);
                        return false;
                    }
                }
            }

            return true;
        }
        return true;
    }
    /* PRODUCT ADDONS */
}