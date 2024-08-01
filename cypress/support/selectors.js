export default {

  //SignInPage
  dialogSignIn: '.modal-dialog',
  chkStaySigned: '.checkmark',
  txtEmail: '#user-email',
  txtPassword: '#user-password',
  imgEyeIconPassword: ".material-icons > div > picture > img",
  alertErrorMessage: '.modal-body > form > .alert',
  imgAlertIcon:'.alert-icon > div > picture > img',
  txtAlertTitle: '.error-title',
  txtAlertBody: '[style="font-size: 14px; color: rgb(204, 0, 0);"]',
  imgAlertClose: '.alert > .error-close',
  btnSignInClose: '.close',

  //Home Xpaths
  //linkViewAccountHistory: '.nave-link',
  linkRegister: "//a[contains(text(),'Register')]",
  linkHeaderCart: '#header-mid-cart',
  btnCloseAddressIcon: ".close",
  cardFeaturedBrand: ".featured-brand-col div.row.no-gutters",
  boxFeaturedBrands: "div.home-featured-brand-item.product-item-variations-v.shadow-ong-gray",
  //featuredBrandVariations: "span.variations-count.var-count",
  scrollTop: "a[title='Top']",
  wurthLogo: "img[alt='Wurth Louis and Company']",
  footer: ".footer-top",
  footerStaticPageList: "//div[@class='d-flex justify-content-between flex-grow-1']",
  ulFooterComapnyInfo: "//div[@class='fot-col company-info']//ul",
  ulFooterMyAccount: "//div[@class='fot-col my-account']//ul",
  ulFooterHelpAndSup: "//div[@class='fot-col help-support']//ul",
  googleTranslator: "//div[@class='google-transalte']",
  googleTranslatorImg: "//span[@class='google_translate_element_icon']//img[@alt='WurthLac']",
  sliderMain: ".home_main_carousel .slider",
  sliderFeaturedProducts:".featured-carousel .slider",
  linkMainSliderNext:".carousel-control-next",
  linkGovernement: '[title="Government"]',
  linkCatalogs: '[title="Catalogs & Literature"]',
  linkMachinery: '[title="Machinery"]',
  linkBarCodeScan:'[title="Barcode Scan"]',
  salestaxdropdown: '#dropdown',
  salesMap: '.rsm-geography',
  closeBtn: '.close',
  option1: '.salesAndTax_arizonaOptions__2odat',
  option2: '.salesAndTax_arizonaOptions__2odat',
  okBtn: '.btn.red-btn-popup',

  //Country Popup
  dialogCountryPopup: '.onload-county-modal',
  txtCountry: '[placeholder="Country"]',
  txtStateCode: '[placeholder="State"]',
  txtCountyName: '[placeholder="County"]',
  chkAllRegions: '#all-regions',

  //lime navigation bar-shipping address
  linkShippingAddress: '#user-nav-shipping-address',

  //shipping popup
  chkRememberMySetting: '//label[contains(.,"Remember My Setting")]/input[@type="checkbox"]',

  //Product Xpaths
  txtQuantity: '#QtyP',
  btnViewItem: "//p[contains(text(),'Show my price", 
  btnAddToCart: 'ADD TO CART', 
  divShippingOptions: 'div[id*=ShippingDetails]',


  btnFavorites: "//span[contains(text(),'ADD TO FAVORITES')]", 
  lblProductName: '.single-product-name', 
  btnCloseInImage: "//span[@class='__react_modal_image__icon_menu']", 
  //chkAlternaiveLocation: "//input[@id='selectWillCallfalse-MA990-1/4']", 
  drpBackordered: "//span[contains(text(),'Brea, CA')]/../../div[1]/span[2]/select", 
  imgProduct: ".main-product-img   img", 
  btnViewCart: "button[title='View Cart']",
  //lblVariation:"//th[contains(text(),'Item # / MFR Part #')]/../../../tbody/tr[1]/td[1]/strong",
  rdoShipFromAlternative:'[id*="shipAlternativeBranch"]',
  rdoShipFromAlternativeVariation:'[id*="shipAlternativeBranch"]',
  drpItemNo: "select.itemSkuCod",
  //btnAddToCartAccesories:"#btnWR0893011201",
  rdoShipFromAlternativeAccessories:'[id*="shipAlternativeBranch"]',


  //My Favorite Xpaths
  btnCategory: "//a[@title='Brands']/../../../../li[2]", 
  //chkCategoryType: ".custom-checkbox [name='3M']",
  btnBrands: "//a[@title='Brands']/../../../../li[1]",
  btnSubCategory: "//a[@title='Brands']/../../../../li[3]", 
  btnRemove: "button[title='remove']", 
  lnkViewItemAttribute: "//p[contains(text(),'View item attributes')]", 
  lnkHideItemAttribute: "//p[contains(text(),'Hide item attributes')]", 
  //lnkShowMyPrice: "//p[contains(text(),'Show my price')]", 
  btnAddedToFav: "//span[contains(text(),'ADDED TO FAVORITES')]/..", 


  //Shopping Cart Xpaths
  Qty: '#Qty1',
  btnDeleteItem: "//a[@title='Delete item']",
  btnConfirmation:'[title="CONFIRM"]',
  btnClearCart:"[title='Clear cart']",
  btnClearCartCancle:"//button[contains(text(),'CANCEL')]",
  promocode:"//input[@id='promoCode']",
  btnClosePromoCode:".close-btn",
  poNo:"//input[@id='ponumber']",
  jobName:"//input[@id='jobname']",
  lblTotalValue: '//div[@class="summary-row total"]/span[@class="value bold-text"]/span',
  lblSubtotal: '.sub-total-field > span > span',

  //shipping & payment page (inventory-shipping) xpaths
  btnBack:'[title="Back"]',
  linkAddNewAddress:'[title="Add new address"]',
  linkSelectAnotherAddress:'[title="Select another address"]',
  divAddressBlock:'.address-block div',
  rdoAddress:'[type="radio"]',
  lblDisplayedAddress: '.address-blk',
  txtDefaultEmail:'#emailOrdCon',
  txtAttn:'#name',
  txtDriverNotes:'.cart-driver-notes textarea',
  linkAddNewCard: '.add-new-card',

  //Quick Order Xpaths
  quickOrderSku1: '//tbody/tr[1]/td[2]/div[1]/input[1]',
  quickOrderQty1: '//tbody/tr[1]/td[4]/input[1]',
  quickOrderSku2: '//tbody/tr[2]/td[2]/div[1]/input[1]',
  quickOrderQty2: '//tbody/tr[2]/td[4]/input[1]',
  checkbox2: '//div[h2[contains(.,"Quick Order")]]/following::tbody/tr[2]/td[1]/input[1]',
  checkbox2LargeOrderPad: '//tbody/tr[2]/td[1]/input[1]',
  validateButton: '//div[h2[contains(.,"Quick Order")]]/following::button[contains(text(),"Validate")]',
  validateTick: '//tbody/tr[1]/td[6]/div[1]/picture[1]/img[1]',
  InvalidSKUMsg: '//div[contains(text(),"Invalid SKU")]',
  AddToCartBtn: "//button[@title='Add to cart' and contains(@class, 'add-cart')]",
  btnDelete:"//div[h2[contains(.,'Quick Order')]]/following::button[contains(text(),'DELETE')]",

 //upload-order-form xpaths
  btnConfirm:"//div[3]/button[contains(@class,'red-btn') and contains(@title,'Confirm')]",



  //Search Xpaths
  searchBar: '#react-autosuggest__input1',
  searchBarSuggestion: '#react-autowhatever-1',
  searchImage: "//button[@title='Search']//img[@alt='WurthLac']",
  addToCartSearchBar: '#react-autosuggest__input2',
  searchBarSuggestionQuickOrder: '#react-autowhatever-1--item-0',


  //Breadcrumb Xpaths
  wrapperBreadcrumb: '.breadcrumb-wrapper',
  listProducts: "//div[@class='product-list clearfix']",
  imgBreadcrumbHome: "//a[@href='/']//div//picture//img[@alt='WurthLac']",
  breadcrumbHomeUrl: "breadcrumbWrapper",

  
  //Category Xpaths
  btnCloseShopByCategoryIcon:"button#category-menu",
  //ulNavBarAllCategories:"//div[@class='navbar-collapse shadow-on-white collapse show']",
  //ulAbrasivesSubNavBar:"(//ul[@class='navbar-nav mr-auto sub-navbar-nav'])[1]",
  //ulKitchenHardwareSubNavBar:"(//ul[@class='navbar-nav mr-auto sub-navbar-nav'])[11]",
  divNumOfProd: '.page-count',
  divSortBy: '.sortby-wraper',
  divPerPage: '.perpage-wraper',
  divPagination: '.pagination',
  //divBottomNumOfProd: ':nth-child(3) > :nth-child(1) > .page-count-sort-wpr > .page-count',
  //divBottomSortBy: ':nth-child(3) > :nth-child(1) > .page-count-sort-wpr > .sortby-wraper',
  //divBottomPerPage: ':nth-child(3) > :nth-child(1) > .perpage-wraper',
  //divBottomPagination: ':nth-child(3) > :nth-child(1) > .pagination',
  //imgMA99014Product: "//img[@alt='1/4\" Unitized Wheel Mandrel']",
  ulCategoriesBrand: "//ul[@class='side-filter-list collapse show']",
  //ulCategoriesProdType : "//ul[@class='side-filter-list collapse show']",
  elementCatBrandName: '#Brands',
  elementCatProductType: '#ProductType',
  //checkBoxBrandFESTOOL: "//div[@id='Brands']//li[2]//label[1]//span[1]",
  //checkBoxProdTypeBeltClnr: "//div[@id='ProductType']//li[1]//label[1]//span[1]",
  //titleCategory: "//h5[normalize-space()='Categories']",
  //btnActiveFilters: "//span[@id='100197']",
  //btnResetCategory: "//div[@class='tow-col-wrapper clearfix']//div[1]//button[1]",

  //My Purchased Items
  ddDuration: "#my_purchase_duration",
  btnDatePick: ".date-pick-btn",

  //My Orders
  imgSearchOrders: ".custom-search-input .input-group-btn",
  txtSearchOrders: '#searchBON',
  btnSearchOrders:'.btn-row [title="Search"]',
  ddDurationOrders:'#my_orders_duration',
  chkOrderType:'.custom-checkbox',
  btnReset:'[title="Reset"]',
  lblOrderTypes: '.link-order-detial p',
  txtQuantityOrders:'#Qty',

  //User management - Manage Users
  lblProfileEmail:"//div[h6[contains(.,'Update Your Profile')]]/following::div[3]/div[2]/div[1]",
  lblProfilePermission: "//div[h6[contains(.,'Update Your Profile')]]/following::div[3]/div[2]/div[2]",
  lblProfileStatus:'span.profile-status',
  btnProfileOpen:'button.profile-open-btn',
  lblFirstName:'label[for="f-name"]',
  lblLastName:'label[for="l-name"]',
  lblPermission:'label[for="permission"]',
  ddPermission: '[for="permission"] + select',
  ddStatus: '[for="status"] + select',
  tfLastName:'#lnameMy',
  tabPersonalNavigation: '.my-account-section [title="Personal Navigation"]',

  //User management - Personal Navigation
  lblAccountFeatures: '.setting-label',

  //User management - Company Profile
  imgEditShippingAddress:'div.add-new-address img',
  linkAddNewAddressUM:'[title="Add new shipping address"]',
  linkSetDefault:'[title="Set Default"]',
  lblDefault: '.default-lable-btn',
  imgDeleteAddress: 'img[alt="Delete"]',
  btnOk: '[title="OK"]',

  //Register Page
  formRegister: '.register-form-wrapper',
  txtFldAccountNum: '#fldAccountNum',
  ddSetRole: '#selRole',
  txtFldFname: '#fldFname',
  txtFldLname: '#fldLname',
  txtfldEmail: '#fldEmail',
  txtfldPhone: '#fldPhone',
  chkReCapture: '#recaptcha-anchor',
  btnRegister: '#btnRegister',

  //Laminate Finder Page

  listLaminates:'.product-list.laminate-finder-item-list',
  divLaminateTiles: '.product-image',
  imgLaminateTiles: '.product-image img',
  ddPerPage: '#perpage',
  imgColor: ".main-product-img   img", 
  btnCloseInColor: "//span[@class='__react_modal_image__icon_menu']", 
  listPagination: '.pagination',
  divPageCount: '.page-count',
  txtLaminateSearch: '#search',
  imgLaminateSearch: '#search + div',
  divColorPickerColor: '.color-pallet-wrapper div',
  imgFilteredColor:'.filter-heading .color-view',
  imgShowHide: '.filter-heading picture',
  listBrands: '.brand-filter',
  imgEditCountryIndicator: '.edit-icon',
  lblCountryEditor: '.c-value',
  divTileMsg: '.product-item .badge',

  //Laminate Finder Page - color price availbily popup
  divPriceAvailabilty: '.laminate-product-view',
  imgBrandLogo:'.brand-logo',
  lblColorCodeName:'.product-name',
  ddGrade:'#laminate_finder_grade',
  txtSizeQuantity: '.add-to-cart-col [placeholder="Qty"]',
  btnAddToCartSize: '.add-to-cart-col .red-btn',
  lblAmountSize: '.add-to-cart-col .unit-price span span',
  lblTotalPriceSize: '.add-to-cart-col .total-price p span',
  ddShippingOptionSize: '.method-option select',
  chkWillCallAnywhereSize: "[id^='selectWillCall']",
  ddWillCallLocationSize: '.store-select-wrapper select',

  //Laminate Finder Page - EdgeBanding
  divEdgeBandingView: '.matching-edgebanding-view',
  divEdgeBands: '.accordion-wrapper',
  lblEdgeBandTitleOpen: '.accordion-title.open',
  imgEdgeBand: '.item-mg',
  imgBrandLogoEdge: '.brand-logo-row',
  linkPriceBreakDownEdge: '.price-breakdown-link',

  //Sales and Tax Exemptions Page
  salestaxdropdown: '#dropdown',
  closeBtn: '.close',
  option1: '.salesAndTax_arizonaOptions__2odat',
  option2: '.salesAndTax_arizonaOptions__2odat',
  salesMap: '.rsm-geography',
















  

};


