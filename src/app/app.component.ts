import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public counter=0;
    constructor(private nativeStorage: NativeStorage, private toastCtrl: ToastController, public translateService: TranslateService, public platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private appMinimize: AppMinimize) {
        this.initializeApp();
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();

            /* Add your translation file in src/assets/i18n/ and set your default language here */
            this.translateService.setDefaultLang('en');
            //document.documentElement.setAttribute('dir', 'rtl');

            this.minimize();
            this.statusBar.backgroundColorByHexString('#d33939');
            this.statusBar.styleBlackTranslucent();
            this.statusBar.styleLightContent();
            //this.statusBar.backgroundColorByHexString('#cccccc');
            //this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }
    minimize() {
        this.platform.backButton.subscribeWithPriority(0, () => {
            // code that is executed when the user pressed the back button
            // and ionic doesn't already know what to do (close modals etc...)
            this.appMinimize.minimize();
            if (this.counter == 0) {
                this.counter++;
                this.presentToast("Press the back button again to exit.");
                setTimeout(() => { this.counter = 0 }, 3000)
              } else {
                // console.log("exitapp");
                this.appMinimize.minimize();
              }
          });
    }

    async presentToast(message) {
        let toast = await this.toastCtrl.create({
          message: message,
          duration: 2500,
          position: 'bottom',
          animated:true,
        });
        await toast.present();
    }


}
