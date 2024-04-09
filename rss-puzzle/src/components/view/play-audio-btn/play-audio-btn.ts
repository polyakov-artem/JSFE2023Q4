import { classes } from '../../../common/js/constants';
import { CreateDomElementProps, PlayAudioBtnFn } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const playAudioBtn: PlayAudioBtnFn = ({ classNames = [], isSmall = false, src = '' }) => {
  let nodeClasses: string[] = [
    classes.btn,
    classes.iconBtn,
    classes.iconBtnSmall,
    classes.playAudioBtn,
  ];
  if (isSmall) nodeClasses.push(classes.iconBtnSmall);
  if (classNames) nodeClasses = nodeClasses.concat(classNames);

  const options: CreateDomElementProps = {
    classNames: nodeClasses,
    attr: {
      'data-src': src,
    },
  };

  return createDomElement(options);
};
