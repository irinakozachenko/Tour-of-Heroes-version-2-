import { HeroGenderEnum } from "./hero.const";

/*export interface Hero {
  id: number;
  firstName: string;
  lastName?: string;
  address?: {
    street: string,
    city: string,
  },
  age?: number,
  married?: boolean,
  gender?: HeroGenderEnum,
  email?: string
}*/

export interface Hero {
  id: number;
  firstName: string;
  lastName?: string;
  street?: string,
  city?: string,
  bithDate?: Date,
  gender?: HeroGenderEnum,
  email?: string,

  [index: string]: string | number | Date | undefined;
}
