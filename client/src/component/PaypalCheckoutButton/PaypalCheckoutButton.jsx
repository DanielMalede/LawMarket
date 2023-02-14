import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";

export default function PaypalCheckoutButton(props) {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaidFor(true);
    setError(
      "Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at  for assistance."
    );
  };

  if (error) {
    alert(error);
  }

  if (paidFor) {
    alert("Thank you for your purchase!");
  }
  return (
    <PayPalButtons
      style={{
        color: "white",
        layout: "vertical",
        height: 55,
        tagline: false,
        shape: "pill",
        label: "pay",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        alert("You have not finished your purchase");
      }}
      onClick={(data, actions) => {
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
    />
  );
}
