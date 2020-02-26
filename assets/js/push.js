;(function() {
  const $ = selector => {
    return document.querySelector(selector)
  }

  const form = $('#new-notification-form')
  const notificationCard = $('.card')
  const notificationBtn = $('#send-notification')
  const requestBtn = $('#request-permission')
  const iconContainerForbiden = $('.icon-container-forbidden')
  const iconContainerSuccess = $('.icon-container-success')
  const loading = $('.loading')
  const animationTimeout = 800

  // Request permission listener
  requestBtn.addEventListener('click', async e => {
    e.preventDefault()

    // Handle ui changes
    requestBtn.classList.add('is-loading')
    loading.classList.remove('hidden')
    iconContainerForbiden.classList.add('hidden')

    const response = await window.Notification.requestPermission()

    loading.classList.add('hidden')
    requestBtn.classList.remove('is-loading')
    if (response === 'granted') {
      // Show success icon
      iconContainerSuccess.classList.remove('hidden')

      // Flip the card and show the notification form
      setTimeout(() => {
        notificationCard.classList.add('flipped')
      }, animationTimeout)
    } else {
      iconContainerForbiden.classList.remove('hidden')
    }
  })

  // Send notification listener
  notificationBtn.addEventListener('click', () => {
    const formData = new FormData(form)
    new window.Notification(formData.get('title'), {
      body: formData.get('message')
    })
    form.reset()
  })

  // Listen for the current permission
  if (window.Notification.permission === 'granted') {
    iconContainerForbiden.classList.add('hidden')
    iconContainerSuccess.classList.remove('hidden')
    // Flip the card after a "n" seconds

    setTimeout(() => {
      notificationCard.classList.add('flipped')
    }, animationTimeout)
  }
})()
