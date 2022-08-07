export class User {

  //Since I don't wanna change my constructor I will return a new instance from my user

  //it will receive a user as it is stored in firebase
  static fromFirebase({ uid, name, email }: any) {
    return new User(uid, name, email);
  }
  constructor(
    public uid: string | undefined,
    public name: string,
    public email: string | null | undefined
  ) {}
}
