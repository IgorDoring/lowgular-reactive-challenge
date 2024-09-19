export interface UserModel {
  readonly id: number;
  readonly email: string;
  readonly name: {
    readonly firstname: string;
    readonly lastname: string;
  };
}
