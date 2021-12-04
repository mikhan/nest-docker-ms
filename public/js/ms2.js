import { random } from './utils.js'
import { rxjs, operators } from './rxjs.js'

/**
 * @typedef {import('rxjs').Observable} Observable
 */

const { range, of } = rxjs
const { concatMap, delay, map } = operators

const formElement = document.forms['messagesForm']
const usernameElement = document.getElementById('username')
const containerElement = document.getElementById('container')
const inputElement = document.getElementById('input')

const username = usernameElement.textContent

let lastMessage
function fetchNewMessage() {
  if (lastMessage) return

  const interval = random(0, 3) * 1000
  lastMessage = setTimeout(() => {
    lastMessage = clearTimeout(lastMessage)
    generateNewMessage()
  }, interval)
}

async function generateNewMessage() {
  const request = await fetch(
    'https://baconipsum.com/api/?sentences=1&type=meat-and-filler&format=text',
  )
  const message = await request.text()
  const letters = message.split('')

  range(0, letters.length - 1)
    .pipe(
      concatMap((i) => of(i).pipe(delay(random(0, 0.05) * 1000))),
      map((i) => letters[i]),
    )
    .subscribe({
      next: (letter) => (inputElement.textContent += letter),
      complete: () => submitForm(),
    })
}

async function sendMessage(data) {
  await fetch('/ms2/messages', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

function submitForm() {
  const content = inputElement.textContent
  const data = { username, content }

  inputElement.textContent = ''
  sendMessage(data)
}

const list = document.getElementById('messages')

function renderMessage(message) {
  const { scrollHeight, clientHeight, scrollTop } = containerElement
  const visibleArea = scrollHeight - clientHeight

  const item = document.createElement('li')
  item.textContent = message.content
  list.appendChild(item)
  item.classList.add('message')
  if (message.username === username) item.classList.add('me')

  if (visibleArea === scrollTop) {
    containerElement.scrollTo(0, scrollHeight)
  }
}

const evtSource = new EventSource('/ms2/messages')
evtSource.addEventListener('message', (e) => {
  const data = JSON.parse(e.data)
  renderMessage(data)

  if (data.username !== username) {
    fetchNewMessage()
  }
})

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  submitForm()
})

function start() {
  fetchNewMessage()
}

if (init) start()
