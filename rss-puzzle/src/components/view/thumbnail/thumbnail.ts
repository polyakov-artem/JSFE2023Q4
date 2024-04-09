import { classes } from '../../../common/js/constants';
import { ThumbnailFn } from '../../../types/types';
import { createDomElement } from '../../utils/utils';

export const thumbnail: ThumbnailFn = ({ caption = '', src = '' }) => {
  const figure: HTMLElement = createDomElement({ tag: 'figure', classNames: [classes.thumbnail] });
  const img: HTMLElement = createDomElement({
    tag: 'img',
    classNames: [classes.thumbnailImg],
    attr: { alt: '', src },
  });
  const figcaption: HTMLElement = createDomElement({
    tag: 'figcaption',
    classNames: [classes.thumbnailCaption],
    text: caption,
  });

  figure.append(img, figcaption);
  return figure;
};
