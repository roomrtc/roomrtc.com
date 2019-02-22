export class User {
  id: String | Number;
  username: String;
  password: String;
  firstName: string;
  lastName?: string;

  public get fullName() {
    return `${this.firstName}${this.lastName ? ' ' + this.lastName : '' }`;
  }
}
