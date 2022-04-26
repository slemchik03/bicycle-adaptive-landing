function toggleMenuBurgerClass() {
    const button = document.querySelector(".header-inner__menu-burger")
    const rootEl = document.querySelector(".header-inner__mobile-menu")

    if (rootEl) {
        button.addEventListener("click", e => {
            rootEl.classList.toggle("active")
        })
    }
}

toggleMenuBurgerClass()

function quoteSlider() {
    return class {
        quoteElList = []
        buttonElList = []
        activeButton = null

        setCurrentQuote(el, rootEl) {
            if (el && rootEl) {
                rootEl.innerHTML = ""
                rootEl.append(el)
            }
        }
        setQuoteList(selector) {
            this.quoteElList = [...document.querySelectorAll(selector)]
        }
        setButtonList(className, rootElSelector) {
            const rootEl = document.querySelector(rootElSelector)
            if (rootEl) {
                this.quoteElList.forEach(value => {
                    const el = document.createElement("div")
                    el.className = className
                    this.buttonElList.push(el)
                    rootEl.append(el)
                })
            }
        }

        setActiveButton(buttonEl, activeClassName) {
            const buttonElClass = buttonEl.className
            buttonEl.className = `${buttonElClass} ${activeClassName}`
            if (this.activeButton) {
                this.activeButton.className = buttonElClass
            }
           this.activeButton = buttonEl
        }

        logger() {
            const rootEl = document.querySelector(".qoute-inner__show")
            const visibleContainer = document.querySelector(".quote-inner__wrapper")
            this.setQuoteList(".quote-inner__content")
            this.setButtonList("quote-inner__button", ".quote-inner__buttons")
            this.setActiveButton(this.buttonElList[0], "active")

            rootEl.addEventListener("click", e => {
                const target = e.target
                if (target !== this.activeButton) {
                    const position = this.buttonElList.indexOf(target)
                    if (position !== -1) {
                        const buttonEl = this.buttonElList[position]
                        const qouteEl = this.quoteElList[position]
                        this.setActiveButton(buttonEl, "active")
                        this.setCurrentQuote(qouteEl, visibleContainer)
                    }
                }
            })
        }
    }
}

const QuoteSliderAPI = quoteSlider()

new QuoteSliderAPI().logger()