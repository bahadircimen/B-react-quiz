import React, {Component} from 'react';
import styles from "./styles.scss";



class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onSubmit=(event)=> {
        event.preventDefault();
    };

    correctAnswerChange=(event)=>{
        let name=event.target.getAttribute("name");
        this.setState({[`q${name}CorrectAnswer`]:event.target.value});
    };

    answerChange=(event)=> {
        let count=event.target.getAttribute("data-key");
        let que=event.target.getAttribute("que");
        this.setState({[`q${que}answer${count}`]:event.target.value});
        event.preventDefault();
    };

    questionChange=(event)=> {
        let count=event.target.getAttribute("data-key")
        this.setState({[`question${count}`]:event.target.value});
        event.preventDefault();
    };

    pushItItem=()=>{
        let restoredData = JSON.parse(localStorage.getItem('data'));
        let name=this.props.quizName;
        let questions = [];
        let question = this.props.questionCountArray.map(d => {
            return this.state[`question${d}`]
        });
        let answer = this.props.questionCountArray.map(c => {
            return this.props.state[`answerCountArray${c}`].map(d => {
            return this.state[`q${c}answer${d}`]
            })
        });
        let correctAnswer =this.props.questionCountArray.map(d => {
            return this.state[`q${d}CorrectAnswer`]
        });
        let checkAnswer=this.props.questionCountArray.map((d,index)=>{
            return answer[index].indexOf(undefined)
        });
        let checkAnswer2=this.props.questionCountArray.map(d=>{
            return -1
        });
        if (correctAnswer.indexOf(undefined)===-1 && question.indexOf(undefined)===-1 && name.length>=1 && checkAnswer.toString()===checkAnswer2.toString())
        {
                questions.push({question, answer, correctAnswer});
            restoredData.quiz.push({
                id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
                name: name,
                questions
            });
            localStorage.setItem('data', JSON.stringify(restoredData));
            alert("Questions Added")
            location.reload()
        }
        else{
            alert("Please Input All Values")
        }
    };

    pushIt=()=> {
        let data=JSON.parse(localStorage.getItem('data'))
        if (data===null){
            const data={
                quiz:[]
            };
            localStorage.setItem('data', JSON.stringify(data));
            this.pushItItem()
        }
        else {
            this.pushItItem()
        }
    };

    downQuestion=(event)=>{
        let dataKey=event.target.getAttribute("data-key");
        let dataKey2=event.target.getAttribute("data-key2");
        let answerCount=this.props.state[`answerCountArray${dataKey}`];
        this.props.downQuestionCount(dataKey2);
        delete this.state[`question${dataKey}`];
        return answerCount.map((d,index)=>{
            return delete this.state[`q${dataKey}answer${index+1}`];
        });
    };

    downAnswerCount=(event)=>{
        let dataKey2 =event.target.getAttribute("data-key2");
        let dataKey3=event.target.getAttribute("data-key3");
        let dataKey=event.target.getAttribute("data-key");
        delete this.state[`q${dataKey2}answer${dataKey}`];
        let answerArray =this.props.state[`answerCountArray${dataKey2}`];
        answerArray.splice(dataKey3, 1);
        this.setState({[`answerCountArray${dataKey2}`]:answerArray})
    };

    render() {
        return (
            <div className={styles.examContainer}>
                {
                    this.props.questionCountArray.map((da,index)=>{
                        return (
                            <div key={da} data-key={da} className={styles.questionsContainer}>
                                <div className={styles.questions}>
                                    <form onSubmit={this.onSubmit}>
                                        <label>
                                            {index+1}.Question {this.props.questionCountArray.length>1 ?
                                            <button data-key={da} data-key2={index} onClick={this.downQuestion}>
                                                <i className="fas fa-trash-alt"/>
                                            </button>:null}
                                        </label>
                                        <input data-key={da} data-key2={index} type="text" value={this.state[`question${da}`]} onChange={this.questionChange}/>
                                    </form>
                                </div>
                                <div className={styles.answers}>
                                    <form onSubmit={this.onSubmit}>
                                        <label>Answers</label>
                                        {this.props.state[`answerCountArray${da}`].map((d,indexx)=>{
                                                return (
                                                    <div key={d} className={styles.inputDiv}>
                                                        <label>{indexx+1}.</label>
                                                        <input data-key={d} name={da} value={indexx} type="radio" onChange={this.correctAnswerChange}/>
                                                        <input  data-key={d} que={da} value={this.state[`q${da}answer${d}`]} type="text"  onChange={this.answerChange}/>
                                                        {
                                                            this.props.state[`answerCountArray${da}`].length>2
                                                                ?<button data-key={d} data-key2={da} data-key3={indexx} onClick={this.downAnswerCount}>Delete</button>
                                                                :null
                                                        }
                                                    </div>
                                                )
                                        }
                                        )}
                                    </form>
                                    <button data-key={da} onClick={this.props.upAnswerCount}>Add an Answer</button>
                                </div>
                            </div>
                        )
                    })
                }
                <button onClick={this.pushIt}>Save Questions</button>
            </div>
        );
    }
}

export default Questions;