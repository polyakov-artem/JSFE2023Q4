import { classes } from '../../../common/js/constants.js';
import { App } from '../../app/app.js';
import { createDomElement } from '../../utils/utils.js';
import { playAudioBtn } from '../play-audio-btn/play-audio-btn.js';

export const results = ({ type, list }) => {
  const nodeClasses = [classes.results];
  let titleText = '';

  if (type === 'success') {
    nodeClasses.push(classes.resultsSuccess);
    titleText = 'I know';
  } else if (type === 'error') {
    nodeClasses.push(classes.resultsError);
    titleText = 'I dont know';
  }

  const node = createDomElement({ tag: 'ul', classNames: nodeClasses });
  const titleItem = createDomElement({ tag: 'li', classNames: [classes.resultsTitle, classes.h5] });
  const title = createDomElement({
    tag: 'span',
    classNames: [classes.resultsTitleText],
    text: titleText,
  });
  const badge = createDomElement({
    tag: 'span',
    classNames: [classes.resultsBadge],
    text: `${list.length}`,
  });

  node.append(titleItem);
  titleItem.append(title, badge);

  const { currentRoundSentences } = App.appModel;

  list.forEach((number) => {
    const sentence = currentRoundSentences[number];

    const listItem = createDomElement({ tag: 'li', classNames: [classes.resultsItem] });
    const playBtn = playAudioBtn({
      classNames: [classes.resultsPlayBtn],
      isSmall: true,
      src: sentence.audioExample,
    });
    const itemText = createDomElement({
      tag: 'p',
      classNames: [classes.resultsItemText],
      text: sentence.textExample,
    });

    listItem.append(playBtn, itemText);
    node.append(listItem);
  });

  return node;
};
