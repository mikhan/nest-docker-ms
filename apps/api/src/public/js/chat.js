import { random } from './utils.js';
import { rxjs, operators } from './rxjs.js';

/**
 * @typedef {import('rxjs').Observable} Observable
 */

const { range, of } = rxjs;
const { concatMap, delay, map } = operators;

/**
 *
 * @param {string} username
 * @param {HTMLElement} containerElement
 * @param {HTMLInputElement} inputElement
 * @param {HTMLUListElement} listElement
 * @param {boolean} autoStart
 */
export function start(
  username,
  containerElement,
  inputElement,
  listElement,
  autoStart
) {
  let lastMessage;
  function fetchNewMessage() {
    if (lastMessage) return;

    const interval = random(0, 3) * 1000;
    lastMessage = setTimeout(() => {
      lastMessage = clearTimeout(lastMessage);
      generateNewMessage();
    }, interval);
  }

  async function generateNewMessage() {
    const request = await fetch(
      'https://baconipsum.com/api/?sentences=1&type=meat-and-filler&format=text'
    );
    const message = await request.text();
    const letters = message.split('');

    range(0, letters.length - 1)
      .pipe(
        concatMap((i) => of(i).pipe(delay(random(0, 0.05) * 1000))),
        map((i) => letters[i])
      )
      .subscribe({
        next: (letter) => (inputElement.textContent += letter),
        complete: () => sendMessage(),
      });
  }

  function sendMessage() {
    const content = inputElement.textContent;
    if (!content) return;
    const data = { username, content };

    inputElement.textContent = '';

    fetch('/ms2/messages', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  function renderMessage(message) {
    const { scrollHeight, clientHeight, scrollTop } = containerElement;
    const visibleArea = scrollHeight - clientHeight;

    const item = document.createElement('li');
    item.textContent = message.content;
    listElement.appendChild(item);
    item.classList.add('message');
    if (message.username === username) item.classList.add('me');

    if (visibleArea === scrollTop) {
      containerElement.scrollTo(0, scrollHeight);
    }
  }

  function onMessage(data) {
    const message = JSON.parse(data);
    renderMessage(message);

    if (message.username !== username) {
      fetchNewMessage();
    }
  }

  const evtSource = new EventSource('/ms2/subscription');
  evtSource.addEventListener('message', (e) => onMessage(e.data));

  if (autoStart) fetchNewMessage();
}
