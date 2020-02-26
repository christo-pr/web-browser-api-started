;(function() {
  const LOL_URL =
    'http://ddragon.leagueoflegends.com/cdn/10.3.1/data/es_MX/champion.json'
  const CHAMP_URL =
    'http://ddragon.leagueoflegends.com/cdn/10.3.1/data/es_MX/champion/{{champ}}.json'

  const IMAGE = {
    SQUARE: 'champion',
    PASSIVE: 'passive',
    SPLASH: 'splash',
    SPELL: 'spell'
  }
  const mainContent = document.querySelector('#content')
  const startBtn = document.querySelector('#start')
  const placeholder = document.querySelector('.placeholder')

  const addClickListener = (selector, callback) => {
    document.querySelector('body').addEventListener('click', function(event) {
      if (event.target.matches(selector)) {
        callback(event)
      }
    })
  }
  const $ = selector => {
    return document.querySelector(selector)
  }

  const getImage = (c, type) => {
    switch (type) {
      case IMAGE.SPLASH:
        return encodeURI(
          `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c}_0.jpg`
        )
      default:
        return encodeURI(
          `http://ddragon.leagueoflegends.com/cdn/10.3.1/img/${type}/${c}.png`
        )
    }
  }

  const getAllChamps = async () => {
    const res = await window.fetch(LOL_URL)
    const champs = await res.json()

    return Object.keys(champs.data).map(c => {
      return {
        id: champs.data[c].id,
        name: champs.data[c].name,
        title: champs.data[c].title,
        tags: champs.data[c].tags,
        squareImg: getImage(c, IMAGE.SQUARE)
      }
    })
  }

  const getChampInfo = async id => {
    const res = await window.fetch(CHAMP_URL.replace('{{champ}}', id))
    const champ = await res.json()

    return {
      fullName: `${champ.data[id].name} (${champ.data[id].title})`,
      image: getImage(id, IMAGE.SPLASH),
      stats: {
        attack: champ.data[id].info.attack,
        defense: champ.data[id].info.defense,
        magic: champ.data[id].info.magic,
        difficulty: champ.data[id].info.difficulty
      },
      spells: champ.data[id].spells.map(p => ({
        id: p.id,
        name: p.name,
        image: getImage(p.image.full.replace('.png', ''), IMAGE.SPELL)
      }))
    }
  }

  const renderTags = tags => {
    return tags.map(t => `<span class="badge">${t}</span>`).join(' ')
  }

  const renderStats = stats => {
    return Object.keys(stats)
      .map(
        st => `
      <li>
        <div class="${st}">
          <img
            src="/assets/images/${st}.png"
            alt="sword"
            width="30"
          />
          <span>${stats[st]}</span>
        </div>
      </li>
    `
      )
      .join(' ')
  }

  const renderSpells = spells => {
    return spells
      .map(
        sp =>
          `
        <div class="spell">
          <figure>
            <img
              src="${sp.image}"
              alt="${sp.id}"
            />
            <figcaption>${sp.name}</figcaption>
          </figure>
        </div>
      `
      )
      .join(' ')
  }

  const renderLoading = () => {
    return '<div class="loading"><div class="lds-ripple"><div></div><div></div></div></div>'
  }

  const renderChampDetail = champ => {
    return `
      <div class="detail-container">
        <div class="champ-image">
          <img
            src="${champ.image}"
            alt="${champ.fullName}"
          />
        </div>
        <div class="champ-info">
          <div>
            <div class="title">${champ.fullName}</div>
            <div class="stats">
              <ul>
                ${renderStats(champ.stats)}
              </ul>
            </div>
          </div>
          <hr />
          <div class="spells">
            ${renderSpells(champ.spells)}
          </div>
        </div>
      </div>
    `
  }

  const renderChampionTile = champ => {
    return `
      <li class="champ" data-champion='${champ.id}'>
        <div class="champ-img">
          <img
            src="${champ.squareImg}"
            alt="${champ.name}"
            loading="lazy"
          />
        </div>
        <div class="champ-stats">
          <h3>${champ.name}</h3>
          <hr />
          <p>${champ.title}</p>
          <div class="tags">
            ${renderTags(champ.tags)}
          </div>
        </div>
      </li>
    `
  }

  // Listener for start button
  startBtn.addEventListener('click', async () => {
    const champList = $('#champ-list')

    champList.innerHTML = renderLoading()

    const champs = await getAllChamps()

    mainContent.classList.remove('hidden')
    placeholder.classList.remove('show')

    champList.innerHTML = ''
    champs.forEach(c => {
      champList.insertAdjacentHTML('beforeend', renderChampionTile(c))
    })
  })

  // Listener for the champ click
  addClickListener('li.champ *', async e => {
    let parent = e.target
    const detailContainer = $('.champion-detail')

    while (!parent.dataset.champion) {
      parent = parent.parentElement
    }

    detailContainer.innerHTML = renderLoading()
    const champ = await getChampInfo(parent.dataset.champion)
    detailContainer.innerHTML = renderChampDetail(champ)
  })
})()
