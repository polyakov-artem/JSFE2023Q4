# Hangman

## CrossCheck Criteria (150 points)

- Responsive/adaptive UI from 1440px to 360px viewport: `+10`
- The generation of DOM elements is implemented. `body` in the `index.html` is empty (can contain only `script` tag). _This requirement can be checked by pressing `Ctrl+U` (Windows) or `Option(⌥)+Command(⌘)+U` (Mac)_: `+20`
- The game starts with the correct default view (empty gallows, underscores for secret word, etc.) and a random question: `+5`
- The user can play the game by using the virtual keyboard: `+20`
- The user can play the game by using the physical keyboard: `+20`
- When the letter is correct, it appears instead of the corresponding underscore. If the letter repeats in the word, all corresponding underscores must be replaced by it: `+15`
- When the letter is incorrect:
  - the incorrect guesses counter is updated: `+5`
  - a body part is added to the gallows: `+10`
- The clicked/pressed letter is disabled: `+5`
- The body parts appear on the gallows in the logical order (head, body, left arm, right arm, left leg, right leg): `+5`
- When the user runs out of 6 attempts or wins the game, the modal window appears: `+10`
- The modal window includes the message about the game's outcome (winning or losing), the secret word and the 'play again' button: `+10`
- When the user clicks the 'play again' button, the game starts over by showing a new question and resetting the gallows, the incorrect guesses counter and the underscores for the secret word: `+15`
