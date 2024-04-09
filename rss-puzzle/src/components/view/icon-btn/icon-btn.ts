import { classes } from '../../../common/js/constants';
import { CreateDomElementProps, IconBtnFn } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const iconBtn: IconBtnFn = ({
  text = '',
  classNames = [],
  disabled = false,
  attr = {},
} = {}) => {
  let btnClasses = [classes.btn, classes.iconBtn];
  if (classNames) btnClasses = btnClasses.concat(classNames);

  const options: CreateDomElementProps = {
    tag: 'button',
    text: text,
    classNames: btnClasses,
    attr: attr,
  };

  if (disabled) options.attr = { disabled: 'true' };

  return createDomElement(options);
};