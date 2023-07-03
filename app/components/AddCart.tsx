"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, unit_amount, quantity, image });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <div className='flex'>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className='my-4 btn btn-primary w-full'>
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😄</span>}
      </button>

      {cartStore.cart.map((item) => (
        <div key={item.id} className='flex bg-base-100 rounded-lg '>
          <div className='flex'>
            <button
              onClick={() =>
                cartStore.removeProduct({
                  id: item.id,
                  image: item.image,
                  name: item.name,
                  unit_amount: item.unit_amount,
                  quantity: item.quantity,
                })
              }>
              <IoRemoveCircle
                className='mx-4 bg-slate-300 rounded-full border-0 text-primary hover:text-primary-focus'
                size={32}
              />
            </button>

            <button onClick={handleAddToCart} disabled={added}>
              <IoAddCircle
                className=' bg-slate-300 rounded-full border-0 text-primary hover:text-primary-focus'
                size={32}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
