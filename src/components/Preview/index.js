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
        this.setState({count: this.state.count+1})
    };

    previousQuestion=()=>{
        this.setState({count: this.state.count-1})
    };

    checkValue=()=> {
        let a=this.state.data.quiz[0].questions.map(d=>{
            return d.correctAnswer});
        let c=a[0]
        let b=this.state.correctAnswer;
        let matches = 0;
        for (let i=0;i<c.length;i++) {
            if (b.indexOf(c[0]) !== -1)
                matches=matches+1;
        }
        return alert(matches);
    };

    getValues=(event)=>{
        const {correctAnswer,count}=this.state;
        const value=event.target.value*1;
        correctAnswer.splice(count, 1);
        correctAnswer.push(value);
        this.setState({correctAnswer:correctAnswer});
        console.log(this.state.correctAnswer)
    };

    render() {
        const data=this.state.data.quiz;
        const {count,correctAnswer}=this.state;
        return (
            <div className={styles.cardCont}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <label>Quiz Title:</label>
                        {data[0].name}
                    </div>
                    <div className={styles.cardBody}>
                        {data[0].questions.map((d,index)=>{
                            return <label key={index}>{index+count+1}. {d.question[count]}</label>
                        })}
                    </div>
                    {
                        data[0].questions.map((d,index)=>{
                            return d.answer[count].map((da,i)=>{
                                return (
                                    <div key={i} className={styles.cardFooter}>
                                        <input onChange={this.getValues} type="radio" name={count} value={i} checked={true}/>
                                        <label>
                                            {i+1}. {da}
                                        </label>
                                    </div>
                                )
                            })
                        })
                    }
                    <div className={styles.cardFooterNav}>
                        {data[0].questions.map((d,index)=>{
                            if (count+1===d.question.length) {
                                return <i key={index} onClick={this.checkValue} className="fas fa-check fa-lg"/>
                            }
                            else {
                                return <i key={index} onClick={this.nextQuestion} className="fas fa-arrow-right fa-lg"/>
                            }
                        })}
                        {count>=1? <i onClick={this.previousQuestion} className="fas fa-arrow-left fa-lg"/>:null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;