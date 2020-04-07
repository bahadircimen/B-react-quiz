import React, {Component} from 'react';
import styles from "./styles.scss";
import Questions from "../Questions";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizName:"",
            questionCount:1,
            questionCountArray:[1],
            answerCount1:2,
            answerCountArray1:[1,2],
            data:JSON.parse(localStorage.getItem('data'))
        }
    }

    quizNameChange=(event)=>{
        this.setState({quizName: event.target.value});
        event.preventDefault();
    };

    addQuestion=()=>{
        let questionCount=this.state.questionCount+1;
        this.setState({questionCount:questionCount});
        console.log(questionCount)
        this.setState({questionCountArray:[...this.state.questionCountArray,questionCount]});
        let answerCount=2;
        this.setState({[`answerCount${questionCount}`]:answerCount,[`answerCountArray${questionCount}`]:[1,2]});
    };

    upAnswerCount=(event)=>{
        const count=event.target.value;
        const upCount=this.state[`answerCount${count}`]+1;
        this.setState({[`answerCountArray${count}`]:[...this.state[`answerCountArray${count}`],upCount],[`answerCount${this.state.questionCount}`]:this.state[`answerCount${this.state.questionCount}`]+1})
    };

    downQuestionCount=(b)=>{
        let questionArray=this.state.questionCountArray;
        questionArray.splice(b,1);
        this.setState({questionCountArray:questionArray});
    };

    render() {
        return (
            <div className={styles.quizContainer}>
                <div className={styles.examName}>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="examName">Exam Name</label>
                        <input type="text" value={this.state.quizName} onChange={this.quizNameChange} required={true}/>
                    </form>
                </div>
                <div className={styles.quizQuestionsCont}>
                    <div className={styles.quizQuestionC}>
                        <div className={styles.quizQuestion}>
                            <Questions
                                quizName={this.state.quizName}
                                state={this.state}
                                upAnswerCount={this.upAnswerCount}
                                questionCountArray={this.state.questionCountArray}
                                questionCount={this.state.questionCount}
                                downQuestionCount={this.downQuestionCount}
                            />
                        </div>
                        <div className={styles.buttonC}>
                            <button onClick={this.addQuestion}>Add a Question</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quiz;