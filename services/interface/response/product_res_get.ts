export interface ProductResGet {
    success: boolean;
    data:    Datum[];
}

export interface Datum {
    id:             number;
    title:          string;
    description:    string;
    price:          number;
    original_price: number | null;
    color:          string;
    images:         string[];
    created_at:     Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toProductResGet(json: string): ProductResGet {
        return JSON.parse(json);
    }

    public static productResGetToJson(value: ProductResGet): string {
        return JSON.stringify(value);
    }
}
