"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
	const [loaded, setLoaded] = useState(false);
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity
	);
	const productsInCart = useCartStore((state) => state.cart);
	const removeProduct = useCartStore((state) => state.removeProduct);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>Espere...</p>;
	}

	return (
		<>
			{productsInCart.map((prod) => (
				<div className='flex mb-5' key={prod.slug + "-" + prod.size}>
					<Image
						src={`/products/${prod.image}`}
						width={100}
						height={100}
						style={{
							width: "100px",
							height: "100px",
						}}
						alt={prod.title}
						className='mr-5 rounded'
					/>
					<div className=''>
						<Link
							className='hover:underline cursor-pointer'
							href={`/product/${prod.slug}`}
						>
							{prod.size}-{prod.title}
						</Link>
						<p>${prod.price}</p>
						<QuantitySelector
							quantity={prod.quantity}
							onQuantityChanged={(quantity) =>
								updateProductQuantity(prod, quantity)
							}
						/>
						<button
							onClick={() => removeProduct(prod)}
							className='underline mt-3'
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
