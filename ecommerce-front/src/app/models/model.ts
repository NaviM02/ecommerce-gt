export class AuthRequestDto {
  public username!: string;
  public password!: string
  public fingerprint!: string;
}

export class Token {
  public token!: string;
}

export interface DecodedToken {
  sub: string;
  exp: number;
  userId: number;
  role: number;
}

export class Role {
  public roleId!: number;
  public roleName!: string;
}

export class User {
  public userId!: number;
  public fullName!: string;
  public username!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public role!: Role;
  public active!: boolean;
  public registrationDate!: string;
}

export class Category {
  categoryId!: number;
  name!: string;
  description!: string;
}

export class Product {
  productId!: number;
  seller!: User;
  sellerId!: number;
  sellerName!: string;
  name!: string;
  description!: string;
  imageUrl!: string;
  price!: number;
  stock!: number;
  categories!: Category[];
  condition!: number;
  status!: number;
  averageRating?: number;
  createdAt!: string;
  ratings!: Rating[];

}

export class Rating {
  ratingId!: number;
  productId!: number;
  userId!: number;
  username!: string;
  stars!: number;
  comment!: string;
  createdAt!: string;
}

export class CreditCard {
  creditCardId!: number;
  userId!: number;
  cardNumber!: string;
  cardholderName!: string;
  expirationDate!: string;
  isActive!: boolean;
}

export class Order {
  orderId!: number;
  userId!: number;
  orderDate!: string;
  status!: number;
  deliveryDate!: string;
  username!: string;
  details!: OrderDetail[];
  items!: OrderDetail[];
  totalPrice!: number;
}

export class OrderDetail {
  productId!: number;
  quantity!: number;
  productName!: string;
  price!: number;
}

export class Notification {
  notificationId!: number;
  userId!: number;
  username!: string;
  message!: string;
  type!: string;
  createdAt!: string;
  wasSent!: boolean;
}

export class Sanction {
  sanctionId!: number;
  userId!: number;
  moderatorId!: number;
  username!: string;
  moderatorUsername!: string;
  startDate!: string;
  endDate!: string;
  reason!: string;
  status!: string;
}
