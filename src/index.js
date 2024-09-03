/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { WordShake } from './services';

export default {
	async fetch(request, env, ctx) {
		try {
			const wrdResponse = await fetch("https://random-word-api.herokuapp.com/all")
			const wrdData = await wrdResponse.text()

			// //filtering 7 letter words non repeadted letter words and kv update
			// const filtered7LWords = await JSON.parse(wrdData).filter(word => (word.length === 7 && !/(.).*\1/.test(word)))
			// await env.WordListKv.put("wordList", JSON.stringify(filtered7LWords))

			// //picking random word
			// const worListKvData = await env.WordListKv.get("word_list", "json")
			// let usedWordArrayKv = await env.WordListKv.get("usedWords", "json") ?? []
			// const wordShakeObj = new WordShake(worListKvData, usedWordArrayKv ?? [], env)
			// const randomWord = wordShakeObj.getRandomWord()

			// //updating word and usedwords list kv's
			// let usedWordArrayData = [...usedWordArrayKv, randomWord]
			// await env.WordListKv.put('usedWords', JSON.stringify(usedWordArrayData))

			// //generating word combinations from random word letters
			// const wordCombinations = wordShakeObj.getWordCombinations(randomWord, JSON.parse(wrdData))

			// //updating picked word data kv
			// const pickedWordData = {
			// 	word: randomWord,
			// 	wordCombinations
			// }
			// await env.WordListKv.put('wordData', JSON.stringify(pickedWordData))
			// // console.log("kv: ", typeof JSON.parse(wrdData), randomWord, wordCombinations)

			// //generating word combinations for every word i word list
			// // const everyWordCombinations = wordShakeObj.generateWordCombinations(JSON.parse(wrdData))

			// //updating evry word data kv
			// // await env.WordListKv.put('everyWordData', JSON.stringify(everyWordCombinations))

			// return new Response(wordCombinations);
			// // return new Response(JSON.stringify(everyWordCombinations, null, 2));
			return new Response(wrdData)
		}
		catch (err) {
			throw new Error("Oops! something happended. we will get back to you.", JSON.stringify(err))
		}
	},
};