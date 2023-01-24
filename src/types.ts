export interface AnswersInterface {
  [id: number]: string;
}

export interface DataInterface {
  id: number;
  question: string;
  type?: string;
  optional?: boolean;
  options?: OptionInterface[];
}

export interface OptionInterface {
  label: string;
  value: string;
}

export interface BasePropsInterface {
  answers: AnswersInterface;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface FieldPropsInterface extends BasePropsInterface {
  id: number;
  options?: OptionInterface[];
}

export interface CardPropsInterface extends BasePropsInterface {
  data: DataInterface;
  children: JSX.Element;
}

export interface SubmissionPropsInterface {
  data: DataInterface[];
  answers: AnswersInterface;
}
