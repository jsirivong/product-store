export default interface Product {
    readonly id: number;
    name: string;
    price: number;
    image: string;
    created_at?: string;
    updated_at?: string;
}