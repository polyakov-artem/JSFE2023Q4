import { classes } from '../../../common/js/constants';
import { CreateDomElementProps, PrimaryBtn } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const primaryBtn: PrimaryBtn = ({
  text = '',
  classNames,
  isSmall = false,
  disabled = false,
  attr = {},
}) => {
  let btnClasses = [classes.btn, classes.primaryBtn];
  if (isSmall) btnClasses.push(classes.primaryBtnSmall);
  if (classNames) btnClasses = btnClasses.concat(classNames);

  const options: CreateDomElementProps = {
    tag: 'button',
    text,
    classNames: btnClasses,
    attr,
  };

  if (disabled) options.attr = { disabled: 'true' };

  return createDomElement(options);
};
