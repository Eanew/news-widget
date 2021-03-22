const MAX_TITLE_LENGTH = 100;

const getToggleButtonTemplate = unreadNewsCount => {
    return (`
        <button class="news-widget__button-toggle" type="button" aria-label="Show news list" title="Show news list">
            You have ${!unreadNewsCount ? `no` : (`
                <span class="news-widget__unread-news-count">
                    ${unreadNewsCount}
                </span>
            `)} unread news
        </button>
    `)
}

const getNewsItemTemplate = ({ title, author, date, url, isRead }) => {
    const dateString = new Date(date)
        .toLocaleString("en-US", { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        .toLowerCase()
    
    title = title.length <= MAX_TITLE_LENGTH ? title : title.slice(0, MAX_TITLE_LENGTH) + `...`

    return (`
        <li class="news-widget__news-item${isRead ? ` news-widget__news-item--read` : ``}">
            <a class="news-widget__news-link" href="${url}" target="_blank" title="Read more">
                ${title}

                <small class="news-widget__news-source" aria-label="Source / author">
                    ${author}
                </small>
            </a>

            <time class="news-widget__news-date" datetime="${date}">
                ${dateString}
            </time>
        </li>
    `)
}

const getNewsListTemplate = news => {
    const newsItemsTemplate = news
        .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
        .map(newsItem => getNewsItemTemplate(newsItem))
        .join(``)

    return (`
        <ul class="news-widget__news-list">
            ${newsItemsTemplate}
        </ul>
    `)
}

const getNoDataMessageTemplate = () => {
    return (`
        <div class="news-widget__no-data">
            There are no news in our database
        </div>
    `)
}

const getWidgetTemplate = news => {
    const unreadNewsCount = news.filter(newsItem => !newsItem.isRead).length
    const toggleButtonTemplate = getToggleButtonTemplate(unreadNewsCount)
    const newsContent = news.length ? getNewsListTemplate(news) : getNoDataMessageTemplate()

    return (
        `<aside class="news-widget" aria-label="News widget" tabindex="-1">
            ${toggleButtonTemplate}

            <div class="news-widget__content news-widget__content--hidden" aria-label="News content" tabindex="0">
                <h3 class="news-widget__header">Latest news</h3>

                <button class="news-widget__button-close" type="button" aria-label="Hide news list"></button>

                <div class="news-widget__news-list-container">
                    ${newsContent}
                </div>
            </div>
        </aside>`
    )
}

const createWidgetElement = (news = []) => {
    const widgetTemplate = getWidgetTemplate(news)
    const tempContainer = document.createElement(`div`)

    tempContainer.innerHTML = widgetTemplate

    return tempContainer.firstChild
}

export default createWidgetElement
