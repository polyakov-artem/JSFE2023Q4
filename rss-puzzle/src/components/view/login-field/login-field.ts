import { classes } from '../../../common/js/constants';
import { LoginField } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const loginField: LoginField = ({ name = '' }) => {
  const field: HTMLElement = createDomElement({
    classNames: [classes.field, classes.loginField, `login-block__${name}-field`],
  });
  const inputContainer: HTMLElement = createDomElement({ classNames: [classes.input] });
  const input = createDomElement({
    tag: 'input',
    classNames: [classes.inputControl],
    attr: {
      type: 'text',
      id: name,
      name,
      required: 'true',
    },
  }) as HTMLInputElement;

  const validation: HTMLElement = createDomElement({
    tag: 'p',
    classNames: [classes.fieldValidation],
  });

  field.append(inputContainer, validation);
  inputContainer.append(input);
  return field;
};
