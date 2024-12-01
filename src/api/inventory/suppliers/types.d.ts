interface Supplier {  
  id: string;
  supplierId: number;
  supplierName: string;
  supplierAddress: string;
  supplierMobile: string;
}

type CreateSupplierPayload = Omit<Supplier, 'supplierId' | 'id'>;