export interface Subcategory {
    id: string;
    name: string;
    fields: any;
}

export interface Category {
    id: string;
    name: string;
    fields: any;
    subcategories: Subcategory[];
}
