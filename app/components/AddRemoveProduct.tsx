"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import formatPrice from "@/util/PriceFormat";

export default function AddRemoveProduct({ name, id, image, unit_amount, quantity }: AddCartType) {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    if (item.id === id) {
      return acc + item.unit_amount! * item.quantity!;
    }
    return acc;
  }, 0);
  return (
    <div>
      {cartStore.cart.map((item) => (
        <div key={item.id} className="flex bg-base-100 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                if (id === item.id) {
                  cartStore.removeProduct({
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    unit_amount: item.unit_amount,
                    quantity: item.quantity,
                  });
                }
              }}
            >
              {id === item.id && (
                <IoRemoveCircle className="rounded-full bg-slate-300 border-0 text-primary hover:text-primary-focus" size={32} />
              )}
            </button>

            {id === item.id && (
              <h2 className="flex items-center justify-center w-10 text-slate-100 bg-primary p-2 rounded-full ">
                {item.quantity}
              </h2>
            )}

            <button
              onClick={() => {
                if (id === item.id) {
                  cartStore.addProduct({
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    unit_amount: item.unit_amount,
                    quantity: item.quantity,
                  });
                }
              }}
            >
              {id === item.id && (
                <IoAddCircle className="rounded-full bg-slate-300 border-0 text-primary hover:text-primary-focus" size={32} />
              )}
            </button>

            {id === item.id && (
              <h2 className="flex items-center justify-center text-slate-100 bg-primary p-2 rounded-full ">
                Product Total: {formatPrice(totalPrice)}
              </h2>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
