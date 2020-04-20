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
            clicked:false,
            className:[]
        }
    }


    componentDidUpdate(){
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

    renderButton=()=>{{
        const {examIndex}=this.props;
        const data=this.state.data.quizzes;
        const {count,correctAnswer}=this.state;
        if(count+1!==data[examIndex].questions.length&&(correctAnswer[count]==null||undefined))
            {return <div className={styles.skipButton} onClick={this.nextQuestion}>Skip</div>}
        else if(count+1!==data[examIndex].questions.length&&(correctAnswer[count]!=null||undefined))
            {return <div className={styles.nextButton} onClick={this.nextQuestion}>Next</div>}
        else if(count+1===data[examIndex].questions.length)
        {return <div className={styles.skipButton} onClick={()=>this.checkValue("home")}>Finish</div>}
    }};

    render() {

        const {examIndex}=this.props;
        const data=this.state.data.quizzes;
        const {count,correctAnswer}=this.state;
        console.log(correctAnswer[count])
        return (
            <div className={styles.previewCont}>
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
                                <label>{data[examIndex].quizTitle}</label>
                                <div className={styles.progressBar}>
                                    {
                                        data[examIndex].questions.map((da,i)=>{
                                            return(
                                                // <div key={i} style={{width:`${100/data[examIndex].questions.length}%`}} className={styles.progress}>
                                                //     <div className={styles.step}></div>
                                                //     <div  className={styles[`icon${""}`]}>
                                                //         <i className="fas fa-check fa-xs"/>
                                                //     </div>
                                                // </div>
                                                <div key={i} style={{width:`${100/data[examIndex].questions.length}%`}} className={styles.progress}>
                                                    <ProgressBar
                                                        classNameIcon={correctAnswer[i] === undefined
                                                            ?"icon"
                                                            :correctAnswer[i] == null
                                                                ?"iconYellow"
                                                                :"iconBlue"
                                                        }
                                                        classNameStep={i <= count
                                                            ?"stepBlue"
                                                            :"step"
                                                        }
                                                        key={i}
                                                        data={this.state.data.quizzes}
                                                        count={this.state.count}
                                                        correctAnswer={this.state.correctAnswer[i]}
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
                                                <div className={styles[`${correctAnswer[count]==i ? "optionSelect":"option"}`]} key={count+""+i} onClick={()=>this.getValues(i)}>
                                                    {i+1}. {da.answer}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.cardFooterNav}>
                                {this.renderButton()}
                                {count>=1? <div className={styles.backButton} onClick={this.previousQuestion}>Back</div>:null}
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        )
    }
}

export default Preview;