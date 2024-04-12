import { classes } from '../../../common/js/constants';
import { CreateDomElementParams, PrimaryBtn } from '../../../types/types';
import { createDomElement } from '../create-dom-element/create-dom-element';

export const primaryBtn: PrimaryBtn = ({
  text = '',
  classNames,
  isSmall = false,
  disabled = false,
  attr = {},
}) => {
  let btnClasses: string[] = [classes.btn, classes.btnPrimary];

  if (isSmall) btnClasses.push(classes.btnPrimarySmall);

  if (classNames) btnClasses = btnClasses.concat(classNames);

  const options: CreateDomElementParams = {
    tag: 'button',
    text,
    classNames: btnClasses,
    attr,
  };

  if (disabled) options.attr = { disabled: 'true' };

  return createDomElement(options) as HTMLButtonElement;
};
