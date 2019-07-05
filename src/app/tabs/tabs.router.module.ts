import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                loadChildren: '../product/product.module#ProductPageModule'
              },
              {
                path: 'review/:id',
                loadChildren: '../review/review.module#ReviewPageModule'
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          },
          {
            path: 'post/:id',
            loadChildren: '../post/post.module#PostPageModule'
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: '../categories/categories.module#CategoriesPageModule'
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule'
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                loadChildren: '../product/product.module#ProductPageModule'
              },
              {
                path: 'review/:id',
                loadChildren: '../review/review.module#ReviewPageModule'
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: '../cart/cart.module#CartPageModule'
          },
          {
            path: 'address',
            loadChildren: '../checkout/address/address.module#CheckoutAddressPageModule'
          },
          {
            path: 'checkout',
            loadChildren: '../checkout/checkout/checkout.module#CheckoutPageModule'
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                loadChildren: '../product/product.module#ProductPageModule'
              },
              {
                path: 'review/:id',
                loadChildren: '../review/review.module#ReviewPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: '../account/account.module#AccountPageModule'
          },
          {
            path: 'address',
            children: [
              {
                path: '',
                loadChildren: '../account/address/address.module#AddressPageModule'
              },
              {
                path: 'edit-address',
                loadChildren: '../account/edit-address/edit-address.module#EditAddressPageModule'
              }
            ]
          },
          {
          path: 'register',
            loadChildren: '../account/register/register.module#RegisterPageModule'
          },
          {
          path: 'points',
            loadChildren: '../account/points/points.module#PointsPageModule'
          },
          {
            path: 'setting',
            loadChildren: '../account/setting/setting.module#SettingPageModule'
          },
          {
            path: 'wallet',
            children: [
              {
                path: '',
                loadChildren: '../account/wallet/wallet.module#WalletPageModule'
              },
              {
                path: 'cart',
                loadChildren: '../cart/cart.module#CartPageModule'
              }
            ]
          },
          {
            path: 'post/:id',
            loadChildren: '../post/post.module#PostPageModule'
          },
          {
            path: 'map',
            loadChildren: '../account/map/map.module#MapPageModule'
          },
          {
            path: 'orders',
            children: [
              {
                path: '',
                loadChildren: '../account/orders/orders.module#OrdersPageModule'
              },
              {
                path: 'order/:id',
                loadChildren: '../account/order/order.module#OrderPageModule'
              }
            ]
          },
          {
            path: 'login',
            children: [
              {
                path: '',
                loadChildren: '../account/login/login.module#LoginPageModule',
              },
              {
                path: 'forgotten',
                loadChildren: '../account/forgotten/forgotten.module#ForgottenPageModule'
              }
            ]
          },
          {
            path: 'wishlist',
            children: [
              {
                path: '',
                loadChildren: '../account/wishlist/wishlist.module#WishlistPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          },
          {
            path: 'blogs',
            children: [
              {
                path: '',
                loadChildren: '../account/blogs/blogs.module#BlogsPageModule',
              },
              {
                path: 'blog/:id',
                loadChildren: '../account/blog/blog.module#BlogPageModule'
              }
            ]
          },
          {
            path: 'vendor-orders',
            children: [
                {
                  path: '',
                  loadChildren: '../vendor/order-list/order-list.module#OrderListPageModule',
                },
                {
                  path: 'edit-order/:id',
                  loadChildren: '../vendor/edit-order/edit-order.module#EditOrderPageModule'
                },
                {
                  path: 'view-order/:id',
                  loadChildren: '../account/order/order.module#OrderPageModule'
                }
              ]
          },
          {
            path: 'vendor-products',
            children: [
                {
                  path: '',
                  loadChildren: '../vendor/product-list/product-list.module#ProductListPageModule',
                },
                {
                  path: 'edit-product/:id',
                  children: [
                    {
                      path: '',
                      loadChildren: '../vendor/edit-product/edit-product.module#EditProductPageModule'
                    },
                    {
                      path: 'edit-variation-product/:id',
                      loadChildren: '../vendor/edit-variation/edit-variation.module#EditVariationPageModule'
                    }
                  ]
                },
                {
                  path: 'view-product/:id',
                  loadChildren: '../product/product.module#ProductPageModule'
                }
              ]
          },

          {
            path: 'add-products',
            children: [
                {
                  path: '',
                  loadChildren: '../vendor/product-add/category/category.module#CategoryPageModule',
                },
                {
                  path: 'subcategory/:id',
                  loadChildren: '../vendor/product-add/subcategory/subcategory.module#SubcategoryPageModule',
                },
                {
                  path: 'details/:id',
                   children: [
                    {
                      path: '',
                      loadChildren: '../vendor/product-add/details/details.module#DetailsPageModule',
                    },
                    {
                      path: 'photos',
                      loadChildren: '../vendor/product-add/photos/photos.module#PhotosPageModule'
                    }
                  ]
                }
              ]
          },
        ]
      },


      {
        path: 'vendor',
        children: [
          {
            path: '',
            loadChildren: '../vendor/vendor-list/vendor-list.module#VendorListPageModule'
          },
          {
            path: 'vendor-info/:id',
            loadChildren: '../vendor/vendor-info/vendor-info.module#VendorInfoPageModule'
          },
          {
            path: 'products',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          },
          {
            path: 'vendor-products',
            children: [
              {
                path: '',
                loadChildren: '../products/products.module#ProductsPageModule'
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../product/product.module#ProductPageModule'
                  },
                  {
                    path: 'review/:id',
                    loadChildren: '../review/review.module#ReviewPageModule'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
