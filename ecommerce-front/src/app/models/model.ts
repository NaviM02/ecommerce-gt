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
