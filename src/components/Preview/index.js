import React, {Component} from 'react';
import styles from "./styles.scss";



class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
            count:0,
            correctAnswer:[]
        }
    }

    nextQuestion=()=>{
        const {correctAnswer}=this.state
        if (correctAnswer[this.state.count]===undefined)
        {
            correctAnswer[this.state.count]=null
        }
        this.setState({count: this.state.count+1,correctAnswer:correctAnswer})

    };

    previousQuestion=()=>{
        this.setState({count: this.state.count-1})
    };

    checkValue=(value)=> {
        const {data,correctAnswer,count}=this.state;
        if (correctAnswer[count]===undefined)
        {
            correctAnswer[count]=null
        }
        this.setState({correctAnswer:correctAnswer});
        let a=data.quizzes[this.props.examIndex].questions.map(d=>{
            return d.correctAnswer
        });
        let b=correctAnswer;
        let correctCount = 0;
        for (let i=0;i<a.length;i++) {
            if (a[i]==b[i])
                correctCount++;
        }
        this.props.changeComponent(value)
        return alert(correctCount+" correct answer");
    };

    getValues=(event)=>{
        const {correctAnswer,count}=this.state;
        correctAnswer[count]=event.target.value;
        this.setState({correctAnswer:correctAnswer});
    };

    render() {
        const {examIndex}=this.props;
        const data=this.state.data.quizzes;
        const {count,correctAnswer}=this.state;
        return (
            <div className={styles.cardCont}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <label>Quiz Title:</label>
                        {data[examIndex].quizTitle}
                    </div>
                    <div className={styles.cardBody}>
                        <label>{count+1}. {data[examIndex].questions[count].question}</label>
                    </div>
                    {
                        data[examIndex].questions[count].answers.map((da,i)=>{
                            return(
                                <div key={i} className={styles.cardFooter}>
                                    <input key={i+""+count} a={i+""+count} type="radio" name={count} value={i} onChange={this.getValues}/>
                                    <label>{i+1}. {da.answer}</label>
                                </div>
                            )
                        })
                    }
                    <div className={styles.cardFooterNav}>
                        {
                            count+1===data[examIndex].questions.length
                                ? <i onClick={()=>this.checkValue("home")} className="fas fa-check fa-lg"/>
                                : <i onClick={this.nextQuestion} className="fas fa-arrow-right fa-lg"/>
                        }
                        {count>=1? <i onClick={this.previousQuestion} className="fas fa-arrow-left fa-lg"/>:null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;