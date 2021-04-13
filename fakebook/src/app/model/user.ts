export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | undefined;
  profilePictureUrl: string | null;
  status: string | undefined;
  birthDate: Date;
  followers: User[];
  following: User[];
}
