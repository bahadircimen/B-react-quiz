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

    correctAnswerChange=(event,name)=>{
        this.setState({[`q${name}CorrectAnswer`]:event.target.value*1});
    };

    answerChange=(event,count,que)=> {
        this.setState({[`q${que}answer${count}`]:event.target.value});
        event.preventDefault();
    };

    questionChange=(event,count)=> {
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
            alert("Questions Added");
            location.reload()
        }
        else{
            alert("Please Input All Values")
        }
    };

    pushIt=()=> {
        let data=JSON.parse(localStorage.getItem('data'));
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

    downQuestion=(event,index)=>{
        const count=event.target.value;
        const answerCount=this.props.state[`answerCountArray${count}`];
        delete this.state[`question${count}`];
        this.props.downQuestionCount(index);
        return answerCount.map((d,index)=>{
            return delete this.state[`q${count}answer${index+1}`];
        });
    };

    downAnswerCount=(event,a,b)=>{
        const del=event.target.value;
        delete this.state[`q${b}answer${a}`];
        const answerArray =this.props.state[`answerCountArray${b}`];
        answerArray.splice(del, 1);
        this.setState({[`answerCountArray${b}`]:answerArray})
    };

    render() {
        return (
            <div className={styles.examContainer}>
                {
                    this.props.questionCountArray.map((da,index)=>{
                        return (
                            <div key={da} className={styles.questionsContainer}>
                                <div className={styles.questions}>
                                    <form onSubmit={this.onSubmit}>
                                        <label>{index+1}.Question</label>
                                        <input type="text" value={this.state[`question${da}`]} onChange={event=>this.questionChange(event,da)}/>
                                    </form>
                                </div>
                                <div className={styles.answers}>
                                    <form onSubmit={this.onSubmit}>
                                        <label>Answers</label>
                                        {this.props.state[`answerCountArray${da}`].map((d,indexx)=>{
                                                return (
                                                    <div key={d} className={styles.inputDiv}>
                                                        <label>{indexx+1}.</label>
                                                        <input name={da} value={indexx} type="radio" onChange={event=>this.correctAnswerChange(event,da)}/>
                                                        <input value={this.state[`q${da}answer${d}`]} type="text"  onChange={event=>this.answerChange(event,d,da)}/>
                                                        {
                                                            this.props.state[`answerCountArray${da}`].length>2
                                                                ?<button value={indexx} onClick={event=>this.downAnswerCount(event,d,da)}>Delete</button>
                                                                :null
                                                        }
                                                    </div>
                                                )
                                        }
                                        )}
                                    </form>
                                    <button value={da} onClick={this.props.upAnswerCount}>Add an Answer</button>
                                </div>
                                {this.props.questionCountArray.length>1 ?
                                    <button value={da} onClick={event=>this.downQuestion(event,index)}>
                                        <i className="fas fa-trash-alt"/>
                                    </button>:null}
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