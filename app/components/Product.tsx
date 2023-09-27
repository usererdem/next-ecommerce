import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

export default function Product({ name, image, unit_amount, id, description, metadata }: ProductType) {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="w-80">
        <div className="h-80 aspect-square relative border-gray-300 border shadow-sm rounded-md bg-white">
          <Image src={image} alt={name} fill className="object-contain rounded-lg p-2" priority={true} />
        </div>
        <div className="font-medium py-2">
          <h1 className="line-clamp-1" >{name}</h1>
          <h2 className="text-sm text-teal-700">{unit_amount !== null ? formatPrice(unit_amount) : "N/A"}</h2>
        </div>
      </div>
    </Link>
  );
}
