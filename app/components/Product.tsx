import Image from "next/image";

export default function Product({ name, image, price }) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      {price}
    </div>
  );
}
