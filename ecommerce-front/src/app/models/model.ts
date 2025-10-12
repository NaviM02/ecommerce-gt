export class AuthRequestDto {
  public username!: string;
  public password!: string
  public fingerprint!: string;
}

export class Token {
  public authc!: string;
}

