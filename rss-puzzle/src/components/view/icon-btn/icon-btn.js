import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';

export const iconBtn = ({ text = '', classNames, disabled = false, attr = {} } = {}) => {
  let btnClasses = [classes.btn, classes.iconBtn];
  if (classNames) btnClasses = btnClasses.concat(classNames);

  const options = {
    tag: 'button',
    text: text,
    classNames: btnClasses,
    attr: attr,
  };

  if (disabled) options.attr = { disabled: true };

  return createDomElement(options);
};
