import { SvgElement } from '../../../types/types';

export const svgElement: SvgElement = (props) => {
  const { classNames = [], id } = props;

  const node: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  node.classList.add(...classNames);

  const useElem: SVGUseElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${id}`);

  node.appendChild(useElem);

  return node;
};
