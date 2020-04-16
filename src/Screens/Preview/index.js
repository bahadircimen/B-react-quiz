import React, {Component} from 'react';
import styles from "./styles.scss";
import {CSSTransition} from "react-transition-group";
import ProgressBar from "../../components/ProgressBar";


class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
            count:0,
            correctAnswer:[],
            clicked:false
        }
    }

    componentDidUpdate(pervState){
        if (this.state.clicked===true){
            setTimeout(()=> {
                this.setState({clicked: false});
            }, 500)
        }
    }


    nextQuestion=()=>{
        const {correctAnswer}=this.state
        if (correctAnswer[this.state.count]===undefined)
        {
            correctAnswer[this.state.count]=null
        }
        this.setState({count: this.state.count+1,correctAnswer:correctAnswer,clicked:true})

    };

    previousQuestion=()=>{
        this.setState({count: this.state.count-1,clicked:true})
    };

    checkValue=(value)=> {
        const {data,correctAnswer,count}=this.state;
        if (correctAnswer[count]===undefined)
        {
            correctAnswer[count]=null
        }
        this.setState({correctAnswer:correctAnswer,clicked:true});
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

    getValues=(i)=>{
        const {correctAnswer,count}=this.state;
        correctAnswer[count]=i;
        this.setState({correctAnswer:correctAnswer});
    };

    render() {
        const {examIndex}=this.props;
        const data=this.state.data.quizzes;
        const {count,correctAnswer}=this.state;
        console.log(data[examIndex].questions.length)
        return (
            <div className={styles.cardCont}>
                <CSSTransition
                    in={this.state.clicked}
                    timeout={500}
                    classNames={{
                        enter: styles.zoomEnter,
                        enterActive: styles.zoomEnterActive,
                        exit: styles.zoomExit,
                        exitActive: styles.zoomExitActive
                    }}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        {data[examIndex].quizTitle}
                        <div className={styles.progressBar}>
                            {
                                data[examIndex].questions.map((da,i)=>{
                                    return(
                                        <div key={i} style={{width:`${100/data[examIndex].questions.length}%`}} className={styles.progress}>
                                        <ProgressBar
                                            icon={this.state.icon}
                                            step={this.state.step}
                                            i={i}
                                            data={this.state.data.quizzes}
                                            count={this.state.count}
                                            correctAnswer={this.state.correctAnswer}
                                            examIndex={this.props.examIndex}
                                        />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        <label>{data[examIndex].questions[count].question}</label>
                        <div className={styles.optionContainer}>
                            {
                                data[examIndex].questions[count].answers.map((da,i)=>{
                                    return(
                                        <div onClick={()=>this.getValues(i)} key={i} className={styles.option}>
                                            {i+1}. {da.answer}
                                        </div>
                                        // <div key={i} className={styles.cardFooter}>
                                        //     <input key={i+""+count} a={i+""+count} type="radio" name={count} value={i} onChange={this.getValues}/>
                                        //     <label>{i+1}. {da.answer}</label>
                                        // </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.cardFooterNav}>
                        {
                            count+1===data[examIndex].questions.length
                                ? <i onClick={()=>this.checkValue("home")} className="fas fa-check fa-lg"/>
                                : <i onClick={this.nextQuestion} className="fas fa-arrow-right fa-lg"/>
                        }
                        {count>=1? <i onClick={this.previousQuestion} className="fas fa-arrow-left fa-lg"/>:null}
                    </div>
                </div>
                </CSSTransition>
            </div>
        )
    }
}

export default Preview;