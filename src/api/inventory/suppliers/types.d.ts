interface Supplier {  
  id: string;
  supplierId: number;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
}

type CreateSupplierPayload = Omit<Supplier, 'supplierId' | 'id'>;