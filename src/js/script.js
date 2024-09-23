/* ---------- OLDALAK VÁLTÁSA ---------- */
/**
 * oldalt vált a megadott paraméterek alapján
 * @param .js-classes
 */

export function pageSelect(removeClass, addClass) {
  document.querySelectorAll(removeClass).forEach(element => element.classList.remove('active')); // elveszi az összes active-ot.
  document.querySelectorAll(addClass).forEach(element => element.classList.add('active')); // hozzaadja az active-ot az összes megadott-hoz.
};

/* ---------- OPTIONS ÉRTÉKEK RÖGZÍTÉSE ---------- */
/**
 * változókba menti a kiválasztott rádiógombok értékeit
 * konvertálja az értékeket a megfelelő adattípusra
 * belerakja az értékeket egy tömbbe 'array'
 * @return Array[number, number, boolean]
 */
export function getOptionsValues() {
  const stackSize = Number(document.querySelector('input[name="stackSize"]:checked')?.value);
  const difficult = Number(document.querySelector('input[name="difficult"]:checked')?.value);
  const colorIsBlue = document.querySelector('#blue').checked;

  let cardColor;
  if (colorIsBlue) {
    cardColor = 'Blue';
  } else {
    cardColor = 'Red';
  };
  return { stackSize, difficult, cardColor };
};

/* ---------- KÁRTYAÉRTÉKEK LEGENERÁLÁSA ---------- */
/**
 * legenerálja a kártyaértékeket 1-töl 13-ig
 * megduplázza a generált számokat
 * megkeveri a megduplázott számokat
 * @param Array of '1' ... '13'
 * @return Array of shuffled numbers 
 */
export function generateCardNumbers(number) {
  let cardNumbers = [];
  for ( let i = 1; i <= number / 2; i++ ) {
    cardNumbers.push(i);
    cardNumbers.push(i);
  };
  let cardShuffled = cardNumbers
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
    console.log(cardShuffled); // törölni kell
  return cardShuffled;
};

/* ---------- KÁRTYÁK RENDERELÉSE ---------- */

/**
 * a megkevert számokat behelyettesítve legenerálja html-ben az 'img' elemeket
 * @param Array of 
 */
export function renderCards(shuffledCards, cardColor) {
  let cardsCont = document.querySelector('.js-cards-cont');
  cardsCont.innerHTML = '';
  shuffledCards.forEach(cardValue => {
    cardsCont.innerHTML += `<img src="./src/assets/cards/cardBack${cardColor}.svg" data-card-id="${cardValue}" alt="card" class="cards js-card">`;
  });
};

/* ---------- KÁRTYA FORDÍTÁS ESEMÉNYFIGYELÖI ---------- */

export function cardTurnEvents() {
  let cards = document.querySelectorAll('.js-card');
  cards.forEach(card => {
    card.addEventListener('click', cardTurner)
  });
};

/* ---------- KÁRTYA FORDÍTÓ ---------- */



export function cardTurner(event) {
  // Az eseményt kiváltó elemhez való hozzáférés
  const clickedCard = event.target;
  // Kiolvassuk a data-card-id értékét
  const cardId = clickedCard.dataset.cardId;
  // Az src attribútum frissítése a card-id alapján
  clickedCard.src = `./src/assets/cards/${cardId}.svg`;

  console.log(cardId);
  return cardId;
};

/* ---------- KÁRTYA ÉRTÉK PUSHOLÓ ---------- */


/* ---------- KÁRTYA ÉRTÉK ÖSSZEHASONLÍTÓ ---------- */