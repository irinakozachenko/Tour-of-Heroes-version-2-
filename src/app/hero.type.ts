import { HeroGenderEnum } from "./hero.const";

export interface Hero {
  id: number;
  firstName: string;
  lastName?: string;
  street?: string,
  city?: string,
  bithDate?: Date,
  gender?: HeroGenderEnum,
  email?: string,
  checked?: boolean,

  [index: string]: any;
}

export interface PopupModel {
  title?: string,
  content?: string,
  submitButton?: string
}
