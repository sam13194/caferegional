"use client";

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

// Define the type for the Wompi checkout object
declare global {
  interface Window {
    ePayco: any;
  }
}

const WompiPaymentButton = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [isWompiReady, setIsWompiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.onload = () => {
      setIsWompiReady(true);
      setIsLoading(false);
    };
    script.onerror = () => {
      console.error('Error al cargar el script de Wompi.');
      setIsLoading(false);
    };
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

    if (!isWompiReady || !window.ePayco) {
      alert('El servicio de pago no está disponible en este momento. Por favor, intenta de nuevo más tarde.');
      return;
    }

    const checkout = new window.ePayco({
      key: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      test: true, 
    });

    checkout.open({
      external: 'false',
      autoclick: 'false',
      amount: totalAmount.toString(),
      tax: '0',
      tax_base: '0',
      currency: 'COP',
      invoice: `INV-${Date.now()}`,
      name_billing: `${user.firstName} ${user.lastName}`,
      address_billing: user.address || 'N/A',
      type_doc_billing: 'CC',
      mobilephone_billing: user.phone || 'N/A',
      number_doc_billing: user.document || 'N/A',
      email_billing: user.email,
      confirmation: `${window.location.origin}/checkout/success`,
      response: `${window.location.origin}/checkout/success`,
      name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    });
  };

  return (
    <Button onClick={handlePayment} className="w-full" disabled={!isWompiReady || isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        'Pagar con Wompi'
      )}
    </Button>
  );
};

export default WompiPaymentButton;
