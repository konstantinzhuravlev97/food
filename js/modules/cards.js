import { getResourse } from "../services/services";

function cards() {
    
    class MenuCard {
        constructor(parentSelector, src, alt, title, descr, price, ...classes) {
            this.parent = document.querySelector(parentSelector);
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 75;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(element);

        }

    }

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard('.menu .menu__field .container', img, altimg, title, descr, price, 'menu__item').render();
            })
        });
}

export default cards;