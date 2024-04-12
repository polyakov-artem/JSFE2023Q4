import { attributeKeys, classes, svgIds } from '../../../common/js/constants';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';
import { svgElement } from '../svg-element/svg-element';

export const car = (id: number, color: string, name: string): HTMLElement => {
  const node: HTMLElement = createDomElement({
    classNames: [classes.car],
    attr: {
      [attributeKeys.carId]: `${id}`,
      [attributeKeys.carColor]: color,
      [attributeKeys.carName]: name,
    },
  });

  const carInner: HTMLElement = createDomElement({ classNames: [classes.carInner] });
  const carManage: HTMLElement = createDomElement({ classNames: [classes.carManage] });

  const btnSelectCar: HTMLElement = primaryBtn({
    isSmall: true,
    text: 'Select',
    classNames: [classes.btnSelectCar],
  });

  const btnDeleteCar: HTMLElement = primaryBtn({
    isSmall: true,
    text: 'Delete',
    classNames: [classes.btnDeleteCar],
  });

  const carName: HTMLElement = createDomElement({
    tag: 'p',
    text: name,
    classNames: [classes.carName],
  });

  const carControls: HTMLElement = createDomElement({ classNames: [classes.carControls] });

  const btnStartCar: HTMLElement = primaryBtn({
    isSmall: true,
    text: 'Start',
    classNames: [classes.btnStartCar],
  });

  const btnReturnCar: HTMLElement = primaryBtn({
    isSmall: true,
    text: 'Return',
    disabled: true,
    classNames: [classes.btnReturnCar],
  });

  const carTrack: HTMLElement = createDomElement({ classNames: [classes.carTrack] });
  const carDistance: HTMLElement = createDomElement({ classNames: [classes.carDistance] });
  const carIcon: HTMLElement = createDomElement({ classNames: [classes.carIcon] });

  const iconCar: SVGSVGElement = svgElement({ classNames: [classes.iconCar], id: svgIds.car });
  iconCar.setAttribute('style', `color: ${color}`);

  node.append(carInner, carName, carTrack);
  carInner.append(carManage, carControls);
  carManage.append(btnSelectCar, btnDeleteCar);
  carControls.append(btnStartCar, btnReturnCar);
  carTrack.append(carDistance);
  carDistance.append(carIcon);
  carIcon.append(iconCar);

  return node;
};
