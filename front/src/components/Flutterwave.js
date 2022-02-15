import React, { useEffect, useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';

async function id(input) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACK_END_URL}/api/users/${input}`,
  );
  return data;
}

export default function Flutterwave(props) {
  const [user, setUser] = useState('');
  useEffect(() => {
    id(props.info.user).then((data) => setUser(data));
  }, [props.info]);

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE,
    tx_ref: Date.now(),
    amount: props.info.totalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      name: user.name,
    },
    customizations: {
      title: 'E-Commerce',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Click here to pay with Flutterwave!',
    callback: (response) => {
      props.onSuccess(response);

      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="">
      <FlutterWaveButton {...fwConfig} className="flutter" />
    </div>
  );
}
