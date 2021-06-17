import Head from "next/head";
import React, { useEffect } from "react";

import { PayPalButton } from "react-paypal-button-v2";

export default function PayPal() {
  const customData = {
    address_line_1: '2211 N First Street',
    address_line_2: 'Building 17',
    admin_area_2: 'San Jose',
    admin_area_1: 'CA',
    postal_code: '95131',
    country_code: 'US'
  }
  const createOrder = (data, actions) => {
    const order_data = actions.order.create({
      intent: 'CAPTURE',
      payer: {
        name: {
          given_name: "PayPal",
          surname: "Customer"
        },
        address: {
          address_line_1: '123 ABC Street',
          address_line_2: 'Apt 2',
          admin_area_2: 'San Jose',
          admin_area_1: 'CA',
          postal_code: '95121',
          country_code: 'US'
        },
        email_address: "customer@domain.com",
        phone: {
          phone_type: "MOBILE",
          phone_number: {
            national_number: "14082508100"
          }
        }
      },
      purchase_units: [
        {
          amount: {
            value: '15.00',
            currency_code: 'USD'
          },
          shipping: {
            address: customData
          },
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }

    });
  
    return order_data
  };

  const onApprove = (data, actions) => {
    fetch('/my-server/get-paypal-transaction', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        orderID: data.orderID
      })
    },

    ).then(function (res) {
      return res.json();
    })
  }

  return (
    <>
      <Head>

        <script src="https://www.paypal.com/sdk/js?client-id=AUn-JUye9uP8l2hV8JSZ-l9IXZQWDT_mY0irW99vF3XGcLyeawPqIrSwSGcsWLUrxpdDwksIJKtCzKwj"></script>

        {/* <script defer src="https://www.paypal.com/sdk/js?client-id=AUn-JUye9uP8l2hV8JSZ-l9IXZQWDT_mY0irW99vF3XGcLyeawPqIrSwSGcsWLUrxpdDwksIJKtCzKwj"></script> */}

      </Head>

      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        options={{
          clientId: "AUn-JUye9uP8l2hV8JSZ-l9IXZQWDT_mY0irW99vF3XGcLyeawPqIrSwSGcsWLUrxpdDwksIJKtCzKwj",
        }}
      />
    </>);
}