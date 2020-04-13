export default {

	async getData(index=0) {
		return JSON.parse(localStorage.getItem('data'))
	},

	async getQuiz(index=0) {
		return JSON.parse(localStorage.getItem('data')).quizzes[index]
	},

	async getQuestions(index=0) {
		let a=await this.getQuiz();
		return a.questions
	},

	async getAnswers(index=0) {
		let a=await this.getQuiz();
		return a.answers
	},

	async getQuizTitle(index=0) {
		let a=await this.getQuiz();
		return a.quizTitle
	},

}