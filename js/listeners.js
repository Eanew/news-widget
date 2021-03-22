const widget = document.querySelector(`.news-widget`)
const toggleButton = widget.querySelector(`.news-widget__button-toggle`)
const content = widget.querySelector(`.news-widget__content`)
const closeButton = content.querySelector(`.news-widget__button-close`)
const newsList = content.querySelector(`.news-widget__news-list`)

const showContent = () => {
    content.classList.remove(`news-widget__content--hidden`)
    document.addEventListener(`keydown`, hideContentOnEscPress)
    document.addEventListener(`click`, hideContent)
    toggleButton.setAttribute(`aria-label`, `Hide news list`)
    toggleButton.setAttribute(`title`, `Hide news list`)
}

const hideContent = () => {
    content.classList.add(`news-widget__content--hidden`)
    document.removeEventListener(`keydown`, hideContentOnEscPress)
    document.removeEventListener(`click`, hideContent)
    toggleButton.setAttribute(`aria-label`, `Show news list`)
    toggleButton.setAttribute(`title`, `Show news list`)
}

const hideContentOnEscPress = evt => {
    if (evt.key === `Escape`) {
        evt.stopPropagation()
        hideContent()
    }
}

const markAsRead = ({ target }) => {
    if (target && target.tagName === `A` && !target.parentElement.classList.contains(`news-widget__news-item--read`)) {
        const unreadNewsCount = toggleButton.querySelector(`.news-widget__unread-news-count`)

        target.parentElement.classList.add(`news-widget__news-item--read`)

        if (unreadNewsCount && --unreadNewsCount.textContent < 1) {
            toggleButton.textContent = `You have no unread news`
        }
    }
}

const addListeners = () => {
    toggleButton.addEventListener(`click`, evt => {
        evt.stopPropagation()
    
        if (content.classList.contains(`news-widget__content--hidden`)) {
            showContent()
        } else {
            hideContent()
        }
    })
    
    content.addEventListener(`click`, evt => {
        evt.stopPropagation()
    })
    
    closeButton.addEventListener(`click`, () => {
        hideContent()
    })
    
    if (newsList) newsList.addEventListener(`click`, markAsRead)
}

export default addListeners
