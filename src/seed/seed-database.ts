import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
	//* Limpieza de DB
	// await Promise.all([
	await prisma.producImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	// ]);

	const { categories, products } = initialData;

	//* Categorias
	const categoriesData = categories.map((name) => ({ name }));
	await prisma.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany();
	const categoriesMap = categoriesDB.reduce((map, category) => {
		map[category.name.toLowerCase()] = category.id;
		return map;
	}, {} as Record<string, string>);
	//? <string=shirt, string=categoryID>

	//* Productos
	products.forEach(async (product) => {
		const { type, images, ...rest } = product;
		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});

		//* Images
		const imagesData = images.map((img) => ({
			url: img,
			productId: dbProduct.id,
		}));

		await prisma.producImage.createMany({
			data: imagesData,
		});
	});

	console.log("Seed ejecutado correctamente");
}

(() => {
	if (process.env.NODE_ENV === "production") {
		return;
	}

	main();
})();
