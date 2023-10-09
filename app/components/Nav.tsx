"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import DarkLight from "./DarkLight";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function Nav() {
  const cartStore = useCartStore();
  const { data: session, status } = useSession();
  const totalProductCount = useMemo(
    () =>
      cartStore.cart
        .map((product) => product?.quantity ?? 0) // [2, 3, 4]
        .reduce((a, b) => a + b, 0),
    [cartStore.cart]
  );

  return (
    <nav className="flex justify-between items-center py-12">
      <Link href="https://next-ecommerce-usererdem.vercel.app">
        <h1 className="font-lobster text-2xl hover:text-accent-focus transition-all">Techy</h1>
      </Link>
      <ul className="flex items-center md:gap-8 gap-4">
        <Link href={"https://ecommerce-store-usererdem.vercel.app"}>
          <h1 className="font-lobster text-xl hover:text-accent-focus transition-all pl-2">Clothy</h1>
        </Link>
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer hover:text-accent-focus transition-all"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
              >
                {totalProductCount}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* {Dark Mode} */}
        <DarkLight />
        {/* If the user is not signed in */}
        {!session?.user && (
          <li>
            <button
              className="bg-primary text-primary-content py-2 px-4 rounded-md hover:bg-accent-focus transition-all"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
        {session?.user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={session.user?.image as string}
                alt={session.user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul tabIndex={0} className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72">
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
