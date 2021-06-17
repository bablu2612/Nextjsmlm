const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

const nextTranslate = require('next-translate');

let baseurl = 'https://commandconcept-qa.csdevhub.com/api/v1/';
module.exports = withCSS(withLess(withImages(withSass({
  env: {
    API_URL: 'https://commandconcept-qa.csdevhub.com/',
    sinUpApi: baseurl + 'signup/',
    loginApi: baseurl + 'login/',
    logoutApi: baseurl + 'logout/',

    getBanners: baseurl + 'store_banner/',
    getProductByCategories: baseurl + 'get_products_by_category/',
    getProductByproductid: baseurl + 'get_product_details/',
    getAllProduct: baseurl + 'get_all_products/',
    addToCart: baseurl + 'add_to_cart/',
    getAllCartProduct: baseurl + 'get_cart_details/',
    deleteProductFromAddToCart: baseurl + 'delete_cart_product/',
    updateProductQty: baseurl + 'update_product_qty/',
    getProfilePageData: baseurl + 'profile_details/',
    changeUserPassword: baseurl + 'change_password/',
    addToWishlist: baseurl + 'add_to_wishlist/',
    getAllWishListProduct: baseurl + 'get_wishlist_details/',
    deleteProductFromwishlist: baseurl + 'delete_wishlist_product/',
    manageAddress: baseurl + 'manage_address/',
    getProductByvariantid: baseurl + 'get_variant_details/',
    CreateOrder: baseurl + 'create_order/',
    varifyCopan: baseurl + 'apply_coupon/',
    getAllCategory: baseurl + 'get_all_categories/',
    getproductsbycategory: baseurl + 'get_products_by_category/',
    updateCart: baseurl + 'update_cart/',
    getUserOrder: baseurl + 'order_history/',
    getAddressDetails: baseurl + 'get_address_details/',
    GetOrderDetail: baseurl + 'get_order_details/',
    DeleteAddress: baseurl + 'delete_address/',
    Reorderproducts: baseurl + 're_order/',
    Getaddresslist: baseurl + 'get_addresses/',
    AutoshipOrderHistory: baseurl + 'autoship_order_history/',
    AutoshipOrderbyid: baseurl + 'get_autoship_order_details/',
    AutoshipUpdate: baseurl + 'autoship_update/',
    AutoshipDelete: baseurl + 'autoship_delete/',
    AutoshipSkip: baseurl + 'autoship_skip/',
    UpdateAddress: baseurl + 'update_address/',
    GetUserNotifications: baseurl + 'get_user_notifications/',
    AutoshipProductDelete: baseurl + 'autoship_product_delete/',
    AutoshipProductUpateproduct: baseurl + 'autoship_order_add_product/',
    AddressUpdate: baseurl + 'autoship_address_update/',
    Reset_password: baseurl + 'api/password_reset/',
    CancelOrder: baseurl + 'cancle_order/',
    RefundOrder: baseurl + 'refund_order/',
    getDownlineUsers: baseurl + 'get_downline_users/',
    GetRefundHistory: baseurl + 'get_refund_history',
    GetBundleProduct: baseurl + 'get_bundle_details/',
    RedeemKaireCash: baseurl + 'redeem_kaire_cash/',
    GetCommissionReport: baseurl + 'get_commissions_report/',
    GetCommissionsFilter: baseurl + 'get_commissions_filter/',

    GetRefundReport: baseurl + 'get_clawbacks/',
    GetRefundReportFilter: baseurl + 'get_clawbacks_filter/',

    GetMyProfileDetails: baseurl + 'get_my_profile_details/',
    GetDashboardCommissions: baseurl + 'get_dashboard_commissions/',
    GetCommissionsApproved: baseurl + 'get_commissions_approved/',

    LoginCheck: baseurl + 'login_check/',

    GetOrderDetailForRefund: baseurl + 'get_new_order_details/',
    ProfileUpdate: baseurl + 'profile_update/',

    
    JWT_KEY: 'gdfghfgh-fgfdgfdgfdhdsasafraeeyjyukktd-dfghdfhfgdhrdt',
    CSRF_SECRET: "screetenvvalue",
  },

  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
  // i18n: {
  //   locales: ['en-US', 'fr', 'nl-NL'],
  //   defaultLocale: 'en-US',
  // },


  // ...nextTranslate(),
  // exportTrailingSlash: true,

}))));


