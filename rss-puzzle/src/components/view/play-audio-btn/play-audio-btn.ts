import { classes } from '../../../common/js/constants';
import { CreateDomElementProps, PlayAudioBtnFn } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const playAudioBtn: PlayAudioBtnFn = ({ classNames = [], isSmall = false, src = '' }) => {
  const nodeClasses: string[] = [
    classes.btn,
    classes.iconBtn,
    classes.iconBtnSmall,
    classes.playAudioBtn,
  ];

  isSmall && nodeClasses.push(classes.iconBtnSmall);
  classNames && nodeClasses.push(...classNames);

  const options: CreateDomElementProps = {
    classNames: nodeClasses,
    attr: {
      'data-src': src,
    },
  };

  return createDomElement(options);
};
