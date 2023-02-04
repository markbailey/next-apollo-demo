declare type Gender = 'Male' | 'Female';

declare interface Contact {
  full_name: string;
  forename: string;
  surname: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
  bio: string;
}

declare interface ContactsArgs {
  skip: number;
  first: number;
}
