import { classes } from '../../../common/js/constants';
import { ResultsFn, SentenceData } from '../../../types/types';
import { App } from '../../app/app';
import { createDomElement } from '../../utils/utils';
import { playAudioBtn } from '../play-audio-btn/play-audio-btn';

export const results: ResultsFn = ({ type, list }) => {
  const nodeClasses: string[] = [classes.results];
  let titleText = '';

  if (type === 'success') {
    nodeClasses.push(classes.resultsSuccess);
    titleText = 'I know';
  } else if (type === 'error') {
    nodeClasses.push(classes.resultsError);
    titleText = 'I dont know';
  }

  const node: HTMLElement = createDomElement({ tag: 'ul', classNames: nodeClasses });
  const titleItem: HTMLElement = createDomElement({
    tag: 'li',
    classNames: [classes.resultsTitle, classes.h5],
  });
  const title: HTMLElement = createDomElement({
    tag: 'span',
    classNames: [classes.resultsTitleText],
    text: titleText,
  });
  const badge: HTMLElement = createDomElement({
    tag: 'span',
    classNames: [classes.resultsBadge],
    text: `${list.length}`,
  });

  node.append(titleItem);
  titleItem.append(title, badge);

  const currentRoundSentences: SentenceData[] = App.appModel.currentRoundSentences;

  list.forEach((number: number): void => {
    const sentence: SentenceData = currentRoundSentences[number];

    const listItem: HTMLElement = createDomElement({
      tag: 'li',
      classNames: [classes.resultsItem],
    });
    const playBtn: HTMLElement = playAudioBtn({
      classNames: [classes.resultsPlayBtn],
      isSmall: true,
      src: sentence.audioExample,
    });
    const itemText: HTMLElement = createDomElement({
      tag: 'p',
      classNames: [classes.resultsItemText],
      text: sentence.textExample,
    });

    listItem.append(playBtn, itemText);
    node.append(listItem);
  });

  return node;
};
