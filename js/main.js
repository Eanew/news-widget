import getMockNews from "./data.js"
import createWidgetElement from "./markup.js"
import addListeners from "./listeners.js"

const renderWidget = news => {
    const widget = createWidgetElement(news)

    addListeners(widget)
    document.body.appendChild(widget)
}

getMockNews().then(renderWidget)
