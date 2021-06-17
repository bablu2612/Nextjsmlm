import axios from "axios";
import cookieCutter from 'cookie-cutter'

//register api that use when user register path where it used /page/[page]/signup.js
function signUp(PostData = {}) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  return axios.post(process.env.sinUpApi, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}
//api for login user.  path where it used /page/[page]/login.js
function LoginUser(PostData = {}) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  return axios.post(process.env.loginApi, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}
//api for logout user  path where it used /page/_app.js
function logoutApi(PostData) {
  const headers = {
    'Authorization': PostData,

  };
  const data = '';
  return axios.post(process.env.logoutApi, data, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// api for add product to cart  path where it used /page/product/[name]/[id].js
function addToCart(PostData = {}) {
  const headers = {
    'Authorization': `${PostData.token}`
  };

  // const PostDataa = {"products":[{ "product_id": +(PostData.product_id),"variant_id": PostData?.variant_id ? +(PostData.variant_id):null, "quantity": +(PostData.quantity) }]}
  // cookie_id:cookieCutter.get('sessionkey')

  const PostDataa = { "cookie_id": cookieCutter.get('sessionkey'), "product_id": +(PostData.product_id), "variant_id": PostData?.variant_id ? +(PostData.variant_id) : null, "quantity": +(PostData.quantity), "is_autoship": PostData?.is_autoship }
  // const PostDataa = {"product_id": +(PostData.product_id),"variant_id": PostData?.variant_id ? +(PostData.variant_id):null, "quantity": +(PostData.quantity) }


  return axios.post(process.env.addToCart, PostData?.datas ? PostData.datas : PostDataa, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


//api for get banner details and categoried listing according to store , path where it used /page/index.js
function getBanners(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return axios.get(`${process.env.getBanners}?slug=${PostData}`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

//api for display cart data  path where it used /page/cart/viewcart.js
function getAllCartProduct(PostData) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(`${process.env.getAllCartProduct}/?cookie_id=${cookieCutter.get('sessionkey')}`, { headers }).then(function (response) {
    // return axios.get(process.env.getAllCartProduct, { headers }).then(function (response) {

    return response;
  }).catch((error) => {

    return error.response;
  });
}


// api for update qty in cart  path where it used /page/cart/viewcart.js
function updateProductQty(PostData = {}) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(process.env.getAllCartProduct, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}


//api for delete product from cart, path where it used /page/cart/viewcart.js
function deleteProductFromAddToCart(PostData = {}) {
  const headers = {

    'Authorization': PostData.token,
  };
  const PostDataa = { "cookie_id": cookieCutter.get('sessionkey'), "product_id": PostData.product_id, variant_id: PostData?.variant_id ? PostData.variant_id : null }

  return axios.post(process.env.deleteProductFromAddToCart, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for get list of address of login user , path where it used /page/checkout/addressList.js
function manageAddress(PostData) {
  const headers = {
    'Authorization': PostData
  };

  return axios.get(process.env.manageAddress, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for save user address path where it used /page/checkout/address.js
function saveAddress(PostData = {}) {
  const headers = {
    'Authorization': PostData.token
  };
  const PostDataa = { "data": PostData.data, "operation": PostData.address_type }

  return axios.post(process.env.manageAddress, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for delete address ,path where it used /page/checkout/addressList.js
function deleteAddress(PostData = {}) {
  const headers = {
    'Authorization': PostData.token
  };
  const PostDataa = { "data": { "address_id": PostData.address_id }, "operation": 'delete' }

  return axios.post(process.env.manageAddress, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for get profile related data like persional,address list,order list, path where it used /page/user/profile.js
function getProfilePageData(PostData) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(process.env.getProfilePageData, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}
// api for change user login password path where it used /page/user/profile.js
function changeUserPassword(PostData = {}) {
  const headers = {
    'Authorization': PostData.token
  };
  const PostDataa = { "old_password": PostData.old_password, "new_password": PostData.new_password }

  return axios.post(process.env.changeUserPassword, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for add product to wishlist path where it used /page/product/[name]/[id].js

function addToWishlist(PostData = {}) {
  const headers = {
    'Authorization': `${PostData.token}`
  };
  // const PostDataa = { "product_id": PostData.product_id}
  const PostDataa = { "product_id": +(PostData.product_id), "variant_id": PostData?.variant_id ? +(PostData.variant_id) : null, "quantity": +(PostData.quantity) }

  // const PostDataa = {"products":[{ "product_id": +(PostData.product_id),"variant_id": PostData?.variant_id ? +(PostData.variant_id):null, "quantity": +(PostData.quantity) }]}
  return axios.post(process.env.addToWishlist, PostDataa, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// api for show product listing in wishlist path where it used /page/wishlist/wishlist.js
function getAllWishListProduct(PostData) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(process.env.getAllWishListProduct, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// api for delete product from wish list path where it used /page/wishlist/wishlist.js
function deleteProductFromwishlist(PostData = {}) {
  const headers = {

    'Authorization': PostData.token
  };
  const PostDataa = { "product_id": +(PostData.product_id), "variant_id": +(PostData?.variant_id) ? +(PostData?.variant_id) : null }

  return axios.post(process.env.deleteProductFromwishlist, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}


//api for get banner details and categoried listing according to store , path where it used /page/index.js
function getAllProduct(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('Token')

  };

  return axios.get(`${process.env.getAllProduct}?slug=${PostData}`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

//api for get banner details and categoried listing according to store , path where it used /page/index.js
function getProductByCategories(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return axios.get(`${process.env.getProductByCategories}?category_id=${PostData}&search=`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

//api for get banner details and categoried listing according to store , path where it used /page/index.js
function getProductByproductid(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('Token')

  };

  return axios.get(`${process.env.getProductByproductid}?product_id=${PostData}`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

function getProductByvariantid(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('Token')

  };

  return axios.get(`${process.env.getProductByvariantid}?variant_id=${PostData}`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

// Create order

function CreateOrder(PostData = {}, token) {
  const headers = {

    'Authorization': token
  };

  return axios.post(process.env.CreateOrder, PostData, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// varify copan
function varifyCopan(PostData = {}, token) {
  const headers = {

    'Authorization': token
  };

  return axios.post(process.env.varifyCopan, PostData, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}
// get all category
function getAllCategory(PostData) {
  const headers = {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('Token')
  };

  return axios.get(`${process.env.getAllCategory}?slug=${PostData}`, { headers }).then(function (response) {
    return response;

  }).catch((error) => {

    return error.response;
  });
}

// update cart quantity

function updateCart(PostData = {}) {
  const headers = {
    'Authorization': `${PostData.token}`
  };

  const PostDataa = { "product_id": +(PostData.product_id), "variant_id": PostData?.variant_id ? +(PostData.variant_id) : null, "quantity": +(PostData.quantity) }
  return axios.post(process.env.updateCart, PostData?.datas ? PostData.datas : PostDataa, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// api for get user getUserOrder list

function getUserOrder(PostData) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(process.env.getUserOrder, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}
// api for get user address details

function getAddressDetails(PostData = {}) {
  const headers = {

    'Authorization': `${PostData.token}`
  };

  return axios.get(`${process.env.getAddressDetails}?address_id=${PostData.address_id}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// get specific oder details
function GetOrderDetail(PostData = {}) {
  const headers = {

    'Authorization': `${PostData.token}`
  };

  return axios.get(`${process.env.GetOrderDetail}?order_id=${PostData.order_id}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// delete address

function DeleteAddress(PostData, token) {
  const headers = {
    'Authorization': token
  };


  return axios.post(process.env.DeleteAddress, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// re-pace same order that show in orderlist 

function Reorderproducts(PostData = {}) {
  const headers = {
    'Authorization': `${PostData.token}`
  };

  const PostDataa = { "order_id": +(PostData?.order_id), "cookie_id": cookieCutter.get('sessionkey') }
  return axios.post(process.env.Reorderproducts, PostDataa, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

//get addresslist

function Getaddresslist(token) {
  const headers = {

    'Authorization': `${token}`
  };

  return axios.get(`${process.env.Getaddresslist}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}


// api for get user getUserAutoShipOrder list

function AutoshipOrderHistory(PostData) {
  const headers = {

    'Authorization': PostData
  };

  return axios.get(process.env.AutoshipOrderHistory, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}



// get specific autoshipoder details
function AutoshipOrderbyid(PostData = {}) {
  const headers = {

    'Authorization': `${PostData.token}`
  };

  return axios.get(`${process.env.AutoshipOrderbyid}?order_id=${PostData.order_id}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}


// update Autoship

function AutoshipUpdate(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  // const PostDataa = { "product_id": +(PostData.product_id),"variant_id": PostData?.variant_id ? +(PostData.variant_id):null, "quantity": +(PostData.quantity) }
  return axios.post(process.env.AutoshipUpdate, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// delete Autoship
function AutoshipDelete(PostData, token) {
  const headers = {
    'Authorization': token
  };


  return axios.post(process.env.AutoshipDelete, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// delete AutoshipSkip
function AutoshipSkip(PostData, token) {
  const headers = {
    'Authorization': token
  };


  return axios.post(process.env.AutoshipSkip, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// api for Update user address path where it used /page/checkout/address.js
function UpdateAddress(PostData = {}) {
  const headers = {
    'Authorization': PostData.token
  };
  const PostDataa = { "data": PostData.data }

  return axios.post(process.env.UpdateAddress, PostDataa, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}




// get notification details

function GetUserNotifications(PostData) {
  const headers = {

    'Authorization': `${PostData}`
  };

  return axios.get(`${process.env.GetUserNotifications}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}

// delete autoship order product

function AutoshipProductDelete(PostData = {}, token) {
  const headers = {

    'Authorization': `${token}`
  };

  return axios.post(`${process.env.AutoshipProductDelete}`, PostData, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}




// update Autoship

function AutoshipProductUpateproduct(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  // const PostDataa = { "product_id": +(PostData.product_id),"variant_id": PostData?.variant_id ? +(PostData.variant_id):null, "quantity": +(PostData.quantity) }
  return axios.post(process.env.AutoshipProductUpateproduct, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// update Autoship address

function AddressUpdate(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.post(process.env.AddressUpdate, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// reset password
function Reset_password(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.post(process.env.Reset_password, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// Cancel Order
function CancelOrder(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.post(process.env.CancelOrder, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// Refund Order
function RefundOrder(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.post(process.env.RefundOrder, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// Api for get Bundle product and use in order refund section
function GetBundleProduct(PostData, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetBundleProduct}/?product_id=${PostData}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}
// Api for get downline user an d used in Dashboard

function getDownlineUsers(token) {
  const headers = {

    'Authorization': `${token}`
  };

  return axios.get(`${process.env.getDownlineUsers}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}


// RedeemKaireCash Order
function RedeemKaireCash(PostData, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetBundleProduct}/?order_total=${PostData}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// GetRefundHistory Order
function GetRefundHistory(PostData, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetRefundHistory}/?order_id=${PostData}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// GetCommissionReport 
function GetCommissionReport(token,range) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetCommissionReport}?value=${range}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}



// GetRefundHistory Order
function GetCommissionsFilter(PostData ={}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetCommissionsFilter}?value=${PostData?.filter_by_date}&from_date=${PostData?.from_date ? PostData.from_date:''}&till_date=${PostData?.til_date ? PostData.til_date:''}&search_on=order_id&search_value=${PostData?.order_id}&status_filter=${PostData?.status?PostData?.status:''}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// GetRefundHistory Order
function GetRefundReport(token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetRefundReport}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}




// GetRefundReportFilter Order
function GetRefundReportFilter(PostData ={}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetRefundReportFilter}?date_filter=${PostData?.filter_by_date}&from_date=${PostData?.from_date ? PostData.from_date:''}&till_date=${PostData?.til_date ? PostData.til_date:''}&search_on=order_id&order_id=${PostData?.order_id}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}



// GetRefundHistory Order
function GetMyProfileDetails(token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetMyProfileDetails}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// GetDashboardCommissions Order
function GetDashboardCommissions(range, token,PostData ={}) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetDashboardCommissions}?value=${range}&from_date=${PostData?.from_date ? PostData.from_date:''}&till_date=${PostData?.til_date ? PostData.til_date:''}&search_on=order_id&order_id=${PostData?.order_id}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

// GetCommissionsApproved Order
function GetCommissionsApproved(token,range,PostData ={}) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.GetCommissionsApproved}?value=${range}&from_date=${PostData?.from_date ? PostData.from_date:''}&till_date=${PostData?.til_date ? PostData.til_date:''}&search_value=${PostData?.order_id? PostData?.order_id: ''}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}



// LoginCheck Order
function LoginCheck(token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.get(`${process.env.LoginCheck}`, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}


// get specific oder details
function GetOrderDetailForRefund(PostData = {}) {
  const headers = {

    'Authorization': `${PostData.token}`
  };

  return axios.get(`${process.env.GetOrderDetailForRefund}?order_id=${PostData.order_id}`, { headers }).then(function (response) {
    return response;
  }).catch((error) => {

    return error.response;
  });
}



// update ProfileUpdate

function ProfileUpdate(PostData = {}, token) {
  const headers = {
    'Authorization': `${token}`
  };

  return axios.post(process.env.ProfileUpdate, PostData, { headers }).then(function (response) {
    return response;
  })
    .catch((error) => {

      return error.response;
    });
}

const api = {
  signUp,
  getBanners,
  LoginUser,
  addToCart,
  logoutApi,
  getAllCartProduct,
  updateProductQty,
  deleteProductFromAddToCart,
  manageAddress,
  saveAddress,
  deleteAddress,
  getProfilePageData,
  changeUserPassword,
  addToWishlist,
  getAllWishListProduct,
  deleteProductFromwishlist,
  getAllProduct,
  getProductByCategories,
  getProductByproductid,
  getProductByvariantid,
  CreateOrder,
  varifyCopan,
  getAllCategory,
  updateCart,
  getUserOrder,
  getAddressDetails,
  GetOrderDetail,
  DeleteAddress,
  Reorderproducts,
  Getaddresslist,
  AutoshipOrderHistory,
  AutoshipOrderbyid,
  AutoshipUpdate,
  AutoshipDelete,
  AutoshipSkip,
  UpdateAddress,
  GetUserNotifications,
  AutoshipProductDelete,
  AutoshipProductUpateproduct,
  AddressUpdate,
  Reset_password,
  RefundOrder,
  CancelOrder,
  GetBundleProduct,
  getDownlineUsers,
  RedeemKaireCash,
  GetRefundHistory,
  GetCommissionReport,
  GetCommissionsFilter,
  GetRefundReport,
  GetRefundReportFilter,
  GetMyProfileDetails,
  GetDashboardCommissions,
  GetCommissionsApproved,
  LoginCheck,
  GetOrderDetailForRefund,
  ProfileUpdate

}
export default api