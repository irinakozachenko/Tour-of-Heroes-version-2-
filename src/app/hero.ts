import { HeroGenderEnum } from "./hero.const";

export interface Hero {
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
}