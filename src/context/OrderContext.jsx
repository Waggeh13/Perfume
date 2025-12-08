import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  // PLACEHOLDER: Initialize with sample orders for testing
  // Remove this when API is ready
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'NOULA-20250108001',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      status: 'delivered',
      paymentMethod: 'credit card',
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phoneNumber: '+1234567890'
      },
      items: [
        {
          id: 1,
          name: 'Velour Mist',
          quantity: 1,
          price: '$72.00',
          image: '/perfume-removebg-preview (1).png',
          size: '100ml'
        }
      ],
      subtotal: 72.00,
      deliveryFee: 59.99,
      tax: 5.00,
      total: 136.99
    },
    {
      id: '2',
      orderNumber: 'NOULA-20250105002',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      status: 'shipped',
      paymentMethod: 'paypal',
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phoneNumber: '+1234567890'
      },
      items: [
        {
          id: 2,
          name: 'Eclat d\'Aube',
          quantity: 1,
          price: '$83.00',
          image: '/perfume10-removebg-preview.png',
          size: '100ml'
        },
        {
          id: 101,
          name: 'Body Lotion',
          quantity: 2,
          price: '$45.00',
          image: '/body_product-removebg-preview.png',
          size: '250ml'
        }
      ],
      subtotal: 173.00,
      deliveryFee: 59.99,
      tax: 5.00,
      total: 237.99
    },
    {
      id: '3',
      orderNumber: 'NOULA-20250101003',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      status: 'processing',
      paymentMethod: 'credit card',
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phoneNumber: '+1234567890'
      },
      items: [
        {
          id: 3,
          name: 'Whispered Iris',
          quantity: 1,
          price: '$90.00',
          image: '/perfume4-removebg-preview.png',
          size: '100ml'
        }
      ],
      subtotal: 90.00,
      deliveryFee: 59.99,
      tax: 5.00,
      total: 154.99
    }
  ]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `NOULA-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing', // processing, shipped, delivered, cancelled
      paymentMethod: orderData.paymentMethod || 'Not specified',
      subtotal: orderData.subtotal || 0,
      deliveryFee: orderData.deliveryFee || 0,
      tax: orderData.tax || 0,
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getAllOrders = () => {
    return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getAllOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

