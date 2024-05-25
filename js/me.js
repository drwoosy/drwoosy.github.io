'use strict'


function loadCss(consoleOpen) {
  if (consoleOpen) {
    const el = document.createElement('link')
    el.setAttribute('href', 'css/secret.css')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('id', 'injected-stylesheet')
    document.head.appendChild(el)
  } else {
    document.getElementById('injected-stylesheet').remove()
  }
}

function loadContent(consoleOpen) {
  if (consoleOpen) {
    const el = document.createElement('div')
    el.id = 'injected-content'
    document.body.appendChild(el)

    const addMessage = msg => {
      const p = document.createElement('p')
      p.innerHTML = msg
      el.appendChild(p)
      return p
    }

    addMessage('glad you found me.')
    addMessage("in vegas? i'd love to chat irl.")
    addMessage("just message me and we'll find a time and place to talk.")
    const glitch = addMessage("kfember@gmail.com")
    glitch.className = 'glitch'
  } else {
    document.getElementById('injected-content').remove()
  }
}

function convertPage(consoleOpen = true) {
  loadCss(consoleOpen)
  document.title = consoleOpen ? '🐺' : 'hello!'
  loadContent(consoleOpen)
}

function setConsoleState(consoleState) {
  if (window.consoleState !== consoleState) {
    convertPage(consoleState)
    window.consoleState = consoleState
  }
}

function isConsoleOpen() {
  let isOpen = false

  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('firefox') > -1 || ua.indexOf('chrome') > -1) {
    isOpen = window.devtools.isOpen
  } else {
    const devtools = /./
    devtools.toString = function() {
      isOpen = true
    }
    console.log('%c', devtools)
  }
  return isOpen
}

function checkLoop() {
  switch (window.location.hash) {
    case '#disabled':
      break
    case '#enabled':
      setConsoleState(true)
      break
    default:
      setConsoleState(isConsoleOpen())
      setTimeout(checkLoop, 200)
      break
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.consoleState = false
  window.initialDetectedState = isConsoleOpen()
  checkLoop()

  document.querySelector("#title-name").addEventListener("keydown", function (e) {
    if (e.key === 'Enter' && e.target.innerText.trim() != '') {
      document.querySelector("#title-name")
      localStorage.setItem('username', e.target.innerText.trim())
      window.location.href = 'looking-glass'
    }
  }, false)

  const oldComment = document.childNodes[0]
  if (oldComment.nodeName === '#comment') {
    oldComment.remove()
  }
  const newComment = document.createComment('Welcome!')
  document.querySelector('.this-element').appendChild(newComment)
})