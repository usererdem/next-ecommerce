import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import { AddCartType } from "@/types/AddCartType";

export default function Product({ name, image, price }: AddCartType) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      <h2 className='text-sm'>{price !== null ? formatPrice(price) : "N/A"}</h2>
    </div>
  );
}
