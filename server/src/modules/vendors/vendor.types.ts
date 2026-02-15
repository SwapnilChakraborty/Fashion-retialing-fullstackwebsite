
// Basic type definitions for Vendor Module
import { z } from 'zod';

export const CreateVendorSchema = z.object({
    businessName: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().optional(),
    logo: z.string().optional(),
    banner: z.string().optional(),
});

export type CreateVendorDto = z.infer<typeof CreateVendorSchema>;
