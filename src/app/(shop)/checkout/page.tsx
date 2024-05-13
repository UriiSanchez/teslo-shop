import Image from "next/image";
import Link from "next/link";
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function () {
	return (
		<div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px] '>
				<Title title='Verificar orden' />
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					{/* Carrito */}
					<div className='flex flex-col mt-5'>
						<span className='text-xl'>Ajustar elementos</span>
						<Link href='/cart' className='underline mb-5'>
							Editar carrito
						</Link>
						{/* Items */}
						{productsInCart.map((prod) => (
							<div className='flex mb-5' key={prod.slug}>
								<Image
									src={`/products/${prod.images[0]}`}
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
									<p>{prod.title}</p>
									<p>${prod.price} x 3</p>
									<p className='font-bold'>Subtotal: ${prod.price * 3}</p>
								</div>
							</div>
						))}
					</div>
					{/* Checkout - Resumen de orden*/}
					<div className=' bg-white rounded-xl shadow-xl p-7'>
						<h2 className='text-2xl mb-2'>Dirección de entrega</h2>
						<div className='mb-10'>
							<p className='text-xl'>Antonio Sánchez</p>
							<p>Av. Siempre viva 123</p>
							<p>Col. Centro</p>
							<p>Alcadía Cuauhtémoc</p>
							<p>Ciudad de México</p>
							<p>CP 31230</p>
							<p>556-518-2369</p>
						</div>
						{/* Divider */}
						<div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
						<h2 className='text-2xl mb-2'>Resumen de orden</h2>
						<div className='grid grid-cols-2'>
							<span>No. Productos</span>
							<span className='text-right'>3 artículos</span>
							<span>Subtotal</span>
							<span className='text-right'>$ 100</span>
							<span>Impuestos (15%)</span>
							<span className='text-right'>$ 100</span>
							<span className='mt-5 text-2xl'>Total:</span>
							<span className='mt-5 text-2xl text-right'>$ 100</span>
						</div>
						<div className='mt-5 mb-2 w-full'>
							<p className='mb-5'>
								<span className='text-xs'>
									Al hacer clic en "Colocar orden", aceptas nuestros
									<a href='#' className='underline'>
										términos y condiciones
									</a>
									&nbps;y
									<a href='#' className='underline'>
										política de privacidad
									</a>
									.
								</span>
							</p>
							<Link
								href='/orders/123'
								className='flex btn-primary justify-center'
							>
								Colocar orden
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
