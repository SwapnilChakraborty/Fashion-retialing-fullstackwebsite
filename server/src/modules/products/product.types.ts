import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10),
    price: z.number().positive(),
    stock: z.number().int().nonnegative().default(0),
    categoryId: z.string().uuid(),
    images: z.array(z.string().url()).min(1),
    tags: z.array(z.string()).optional(),

    // Optional for drafts
    isActive: z.boolean().default(true),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
