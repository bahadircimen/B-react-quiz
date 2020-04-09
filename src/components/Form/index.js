import React, {Component} from 'react';
import styles from "./styles.scss";


class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:this.props.data
        }
    }

    addQuestion=()=> {
        const { data }= this.state;
        data.questions.push(
            {
                question: "",
                answers: [{...this.props.emptyAnswer},{...this.props.emptyAnswer}],
                correctAnswer: "",
            }
        );
        this.setState({data:data});
    };

    addAnswer=(index)=> {
        const { data }= this.state;
        data.questions[index].answers.push({...this.props.emptyAnswer})
        this.setState({
            data:data
        });
    };

    titleChange=(event)=>{
        const {data}=this.state;
        data.quizTitle=event.target.value;
        this.setState({data:data})
    };

    questionChange=(event,d)=>{
        d.question = event.target.value;
        this.setState({data: this.state.data});
    };

    answerChange=(event,da)=>{
        da.answer = event.target.value;
        this.setState({data: this.state.data});
    };

    correctAnswerChange=(event,i)=>{
        i.correctAnswer = event.target.value*1;
        this.setState({data: this.state.data});
    };

    deleteQuestion=(index)=>{
        const {data}=this.state;
        data.questions.splice(index,1);
        this.setState({data: data});
    };

    deleteAnswer=(i,d)=>{
        const {data}=this.state;
        d.answers.splice(i,1);
        this.setState({data: data});
    };


    render() {
        const {data}=this.state;
        return (
            <div className={styles.quizContainer}>
                <form onSubmit={event=>this.props.onSubmit(event,"home")}>
                    <div className={styles.quizTitle}>
                        <label>Exam Title</label>
                        <input value={data.quizTitle} type="text" onChange={this.titleChange} required={true}/>
                    </div>
                    {
                        data.questions.map((d,index)=>{
                            return (
                                <div key={index} className={styles.questionsContainer}>
                                    <div key={index} className={styles.questions}>
                                        <div className={styles.labelDiv}>
                                            <label>{index+1}.Question</label>
                                            {
                                                data.questions.length>1
                                                ? <input value={"Delete"} type="button" onClick={() => this.deleteQuestion(index)}/>
                                                : null
                                            }

                                        </div>
                                        <input value={d.question} type="text" onChange={event => this.questionChange(event, d)} required={true}/>
                                        <div key={index} className={styles.answers}>
                                            <label>Answers</label>
                                            {
                                                d.answers.map((da,i)=>{
                                                    return (
                                                        <div key={i} className={styles.inputDiv}>
                                                            <label>{i+1}.</label>
                                                            <input value={i} name={index} type="radio" onChange={event => this.correctAnswerChange(event, d)} required={true} checked={d.correctAnswer===i}/>
                                                            <input value={da.answer} type="text" onChange={event => this.answerChange(event, da)} required={true}/>
                                                            {
                                                                d.answers.length>2
                                                                ? <input value={"Delete"} type="button" onClick={() => this.deleteAnswer(i, d)}/>
                                                                : null
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            <input key={index} value={"Add an Answer"} onClick={()=>this.addAnswer(index)} type="button"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <input value={"Add a Question"} onClick={this.addQuestion} type="button"/>
                    <button>Save Questions</button>
                </form>
            </div>
        );
    }
}

export default Form;