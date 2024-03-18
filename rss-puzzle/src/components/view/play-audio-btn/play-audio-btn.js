import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';

export const playAudioBtn = ({ classNames, isSmall, src = '' } = {}) => {
  let nodeClasses = [classes.btn, classes.iconBtn, classes.iconBtnSmall, classes.playAudioBtn];
  if (isSmall) nodeClasses.push(classes.iconBtnSmall);
  if (classNames) nodeClasses = nodeClasses.concat(classNames);

  const options = {
    classNames: nodeClasses,
    attr: {
      'data-src': src,
    },
  };

  return createDomElement(options);
};
