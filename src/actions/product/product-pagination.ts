"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
	page?: number;
	take?: number;
}

export const getPaginatedProductsWithImages = async ({
	page = 1,
	take = 12,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		//* Obtener productos
		const products = await prisma.product.findMany({
			take: take,
			skip: (page - 1) * take,
			include: {
				ProducImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
		});

		//* Obtener total de páginas
		const totalCount = await prisma.product.count({});
		const totalPages = Math.ceil(totalCount / take);

		return {
			currentPage: page,
			totalPages: totalPages,
			products: products.map((prod) => ({
				...prod,
				images: prod.ProducImage.map((img) => img.url),
			})),
		};
	} catch (error) {
		throw new Error("No se pudo cargar los productos");
	}
};
