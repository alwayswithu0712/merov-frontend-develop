export interface ProductFilters {
    minPrice?: number;
    maxPrice?: number;
    categoryIds?: string | string[];
    subcategoryIds?: string | string[];
    brands?: string[];
    models?: string[];
    conditions?: string;
    currencies?: string;
    hasStock?: boolean;
    sellerId?: string;
}
