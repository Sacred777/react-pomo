import {NOOP} from "../utils/js/noop";

export interface IModalProperties {
  modalTitle: string;
  firstButtonStyles: string;
  firstButtonHandler: () => void;
  firstButtonTitle: string;
  secondButtonStyles: string;
  secondButtonHandler: () => void;
  secondButtonTitle: string;
}

export const initialModalProperties: IModalProperties = {
  modalTitle: '',
  firstButtonStyles: '',
  firstButtonHandler: NOOP,
  firstButtonTitle: '',
  secondButtonStyles: '',
  secondButtonHandler: NOOP,
  secondButtonTitle: '',
}
