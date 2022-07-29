class Dictionary {
  #name
  #words

  constructor(name) {
    this.#name = name;
    this.#words = {};
  }

  get mainName() {
    return this.#name;
  }

  set mainName(name) {
    this.#name = name;
  }

  get allWords() {
    return this.#words;
  }

  _addNewWord(wordKey, wordObj) {
    this.#words[wordKey] = wordObj;
  }

  add(word, description) {
    this.#words[word] ?? (this._addNewWord(word, {
      word: word,
      description: description
    }))
  }

  remove(word) {
    delete this.#words[word];
  }

  get(word) {
    return this.#words[word];
  }

  showAllWords() {
    Object.values(this.#words).forEach(obj => {
      console.log(`${obj?.word} - ${obj?.description}`);
    })
  }
}

class HardWordsDictionary extends Dictionary {
  constructor(name) {
    super(name);
  }

  add(word, description) {
    super.add(word, description);
    let obj = this.get(word);
    obj = { ...obj, isDifficult: true };
    this._addNewWord(word, obj);
  }
}

const hardWordsDictionary = new HardWordsDictionary("Сложные слова");

hardWordsDictionary.add(
  "дилетант",
  "Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями."
);

hardWordsDictionary.add(
  "неологизм",
  "Новое слово или выражение, а также новое значение старого слова."
);

hardWordsDictionary.add(
  "квант",
  "Неделимая часть какой-либо величины в физике."
);

hardWordsDictionary.remove("неологизм");

hardWordsDictionary.showAllWords();

console.log(hardWordsDictionary.mainName); // Сложные слова
hardWordsDictionary.mainName = "Новый Словарь";
console.log(hardWordsDictionary.mainName); // Новый Словарь
console.log(hardWordsDictionary.allWords); // выводит объект в котором есть слова
// дилетант и квант
