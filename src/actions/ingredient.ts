'use server';

import { ingredientSchema } from '@/schema/zod';
import prisma from '@/utils/prisma';
import { success, ZodError } from 'zod';

export async function createIngredient(formData: FormData) {
    try {
        console.log('formData:', formData);
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            unit: formData.get('unit') as string,
            pricePerUnit: formData.get('pricePerUnit')
                ? parseFloat(formData.get('pricePerUnit') as string)
                : null,
            description: formData.get('description') as string,
        };
        const validateData = ingredientSchema.parse(data);

        const ingredient = await prisma.ingredient.create({
            data: {
                name: validateData.name,
                category: validateData.category,
                unit: validateData.unit,
                pricePerUnit: validateData.pricePerUnit,
                description: validateData.description,
            },
        });
        return { success: true, ingredient };
    } catch (error) {
        if (error instanceof ZodError) {
            return { error: error.issues.map((e) => e.message).join(', ') };
        }
        console.error('Ошибка создания ингридикнта');
        return { error: 'Ошибка при создании ингридикнта' };
    }
}

export async function getIngredients() {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return { success: true, ingredients };
    } catch (error) {
        console.error('Ошибка получения ингридикнтов');
        return { error: 'Ошибка при получении ингридикнтов' };
    }
}

export async function deleteIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: {id}
        });
        return { success: true, ingredient };
    } catch (error) {
        console.error('Ошибка удаления ингридикнта');
        return { error: 'Ошибка при удалении ингридикнта' };
    }
}
