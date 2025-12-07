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
  const [orders, setOrders] = useState([]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `NOULA-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing', // processing, shipped, delivered, cancelled
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

