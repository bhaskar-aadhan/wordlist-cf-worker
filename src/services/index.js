export class WordShake {
    constructor(wordlist, usedWordArray) {
        this.wordlist = wordlist;
        this.usedWordArray = usedWordArray;
        this.originalArray = [...wordlist];
        this.shuffleArray = this.shuffle([...wordlist]);
        this.currentIndex = 0;
    }
    getWordList() {
        return this.wordlist;
    }
    setWordList(wordlist) {
        this.wordlist = wordlist;
    }
    shuffle(wordlist) {
        for (let i = wordlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const k = Math.floor(Math.random() * (i + 1));
            [wordlist[i], wordlist[j]] = [wordlist[j], wordlist[i]];
            [wordlist[i], wordlist[k]] = [wordlist[k], wordlist[i]];
        }
        return wordlist;
    }
    getRandomWord() {
        const availableWords = this.wordlist.filter((word) => !this.usedWordArray.includes(word));
        if (availableWords.length === 0) {
            return [];
        }
        const pickedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        return pickedWord;
    }
    getMiddleLetter(word) {
        return word?.[Math.floor(word?.length / 2)]
    }

    canFormWordFromLetters(word, letters) {
        const lettersCpy = [...letters]
        for (let char of word) {
            const index = lettersCpy.indexOf(char);
            if (index === -1) {
                return false;
            }
            lettersCpy.splice(index, 1);
        }
        return true;
    }

    getWordCombinations(pickedWord, wordlist) {
        const middleLetter = this.getMiddleLetter(pickedWord);
        const letters = pickedWord.split('');
        const validWords = wordlist?.filter((w) => {
            // console.log("mwd: ", this.canFormWordFromLetters(w, letters))
            return w.length >= 4 && w.includes(middleLetter) && this.canFormWordFromLetters(w, letters)
        })
        return [...validWords, pickedWord]
    }

    generateWordCombinations(wordlist) {
        let wordListData = [];
        this.wordlist.forEach(word => {
            const wordCombinations = this.getWordCombinations(word, wordlist)
            wordListData.push({ word, wordCombinations })
        });
        return wordListData
    }
}