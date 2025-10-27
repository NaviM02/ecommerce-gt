export interface TopProductDTO {
  productId: number;
  productName: string;
  totalSold: number;
}

export interface TopCustomerBySpendingDTO {
  userId: number;
  fullName: string;
  totalSpent: number;
}

export interface TopSellerDTO {
  userId: number;
  fullName: string;
  totalEarned: number;
}

export interface TopCustomerByOrdersDTO {
  userId: number;
  fullName: string;
  totalOrders: number;
}

export interface TopSellerByProductCountDTO {
  userId: number;
  fullName: string;
  totalProducts: number;
}
