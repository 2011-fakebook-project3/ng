export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | undefined;
  profilePictureUrl: string | undefined;
  status: string | undefined;
  birthDate: Date | undefined;
}
