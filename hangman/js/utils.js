export const shuffleArray = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const createDomElement = ({ tag = "div", classes, text, attr }) => {
  const element = document.createElement(tag);

  if (classes) {
    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else {
      element.classList.add(classes);
    }
  }

  if (text) element.textContent = text;

  if (attr) {
    for (let key in attr) {
      element.setAttribute(key, attr[key]);
    }
  }

  return element;
};
