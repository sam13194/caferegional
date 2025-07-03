"use client";

import { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

// Define the type for the Wompi checkout object
declare global {
  interface Window {
    ePayco: any;
  }
}

const WompiPaymentButton = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!user) {
      alert('Por favor, inicia sesión para realizar el pago.');
      return;
    }

    const checkout = new window.ePayco({
      key: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      test: true, 
    });

    checkout.open({
      // Wompi's checkout configuration
      external: 'false',
      autoclick: 'false',
      // Amount information
      amount: totalAmount.toString(),
      tax: '0',
      tax_base: '0',
      currency: 'COP',

      // Invoice information
      invoice: `INV-${Date.now()}`,
      name_billing: `${user.firstName} ${user.lastName}`,
      address_billing: user.address || 'N/A',
      type_doc_billing: 'CC',
      mobilephone_billing: user.phone || 'N/A',
      number_doc_billing: user.document || 'N/A',
      email_billing: user.email,

      // Confirmation and response pages
      confirmation: `${window.location.origin}/checkout/success`,
      response: `${window.location.origin}/checkout/success`,

      // Pre-filled customer data
      name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    });
  };

  return (
    <Button onClick={handlePayment} className="w-full">
      Pagar con Wompi
    </Button>
  );
};

export default WompiPaymentButton;
