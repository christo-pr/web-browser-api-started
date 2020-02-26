const CODE_KEYS = ['S', 'D', 'G', 'H', 'J', 'E', 'Y', 'V']

function validCode(keyCode) {
  return CODE_KEYS.includes(keyCode)
}

function stopSounds() {
  const audios = document.querySelectorAll('audio')
  audios.forEach(audio => {
    audio.pause()
    audio.src = audio.src
  })
}

function handleKeyTap() {
  document.addEventListener('keydown', e => {
    let key = e.which

    key = String.fromCharCode(key)

    if (!validCode(key)) return

    const sound = document.querySelector('audio[data-key="' + key + '"]')
    const drumItem = document.querySelector('.key[data-key="' + key + '"]')

    drumItem.classList.add('playing')
    stopSounds()
    sound.play()
  })

  document.addEventListener('keyup', e => {
    let key = e.which

    key = String.fromCharCode(key)

    if (!validCode(key)) return

    const drumItem = document.querySelector('.key[data-key="' + key + '"]')
    drumItem.classList.remove('playing')
  })
}

handleKeyTap()
