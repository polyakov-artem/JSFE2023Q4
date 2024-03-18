import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';

export const thumbnail = ({ caption, src }) => {
  const figure = createDomElement({ tag: 'figure', classNames: [classes.thumbnail] });
  const img = createDomElement({
    tag: 'img',
    classNames: [classes.thumbnailImg],
    attr: { alt: '', src: src },
  });
  const figcaption = createDomElement({
    tag: 'figcaption',
    classNames: [classes.thumbnailCaption],
    text: caption,
  });

  figure.append(img, figcaption);
  return figure;
};
