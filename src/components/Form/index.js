import React, {Component} from 'react';


class Form extends Component {

    render() {
        return (
                <form onSubmit={this.props.onSubmit}>
                    {this.props.children}
                </form>
            // <div className={styles.quizContainer}>
            //     <form onSubmit={event=>this.props.onSubmit(event,"home")}>
            //         <div className={styles.quizTitle}>
            //             <label>Exam Title</label>
            //             <input value={data.quizTitle} type="text" onChange={this.titleChange} required={true}/>
            //         </div>
            //         {
            //             data.questions.map((d,index)=>{
            //                 return (
            //                     <div key={index} className={styles.questionsContainer}>
            //                         <div key={index} className={styles.questions}>
            //                             <div className={styles.labelDiv}>
            //                                 <label>{index+1}.Question</label>
            //                                 {
            //                                     data.questions.length>1
            //                                     ? <input value={"Delete"} type="button" onClick={() => this.deleteQuestion(index)}/>
            //                                     : null
            //                                 }
            //
            //                             </div>
            //                             <input value={d.question} type="text" onChange={event => this.questionChange(event, d)} required={true}/>
            //                             <div key={index} className={styles.answers}>
            //                                 <label>Answers</label>
            //                                 {
            //                                     d.answers.map((da,i)=>{
            //                                         return (
            //                                             <div key={i} className={styles.inputDiv}>
            //                                                 <label>{i+1}.</label>
            //                                                 <input value={i} name={index} type="radio" onChange={event => this.correctAnswerChange(event, d)} required={true} checked={d.correctAnswer===i}/>
            //                                                 <input value={da.answer} type="text" onChange={event => this.answerChange(event, da)} required={true}/>
            //                                                 {
            //                                                     d.answers.length>2
            //                                                     ? <input value={"Delete"} type="button" onClick={() => this.deleteAnswer(i, d)}/>
            //                                                     : null
            //                                                 }
            //                                             </div>
            //                                         )
            //                                     })
            //                                 }
            //                                 <input key={index} value={"Add an Answer"} onClick={()=>this.addAnswer(index)} type="button"/>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )
            //             })
            //         }
            //         <input value={"Add a Question"} onClick={this.addQuestion} type="button"/>
            //         <button>Save Questions</button>
            //     </form>
            // </div>
        );
    }
}

export default Form;