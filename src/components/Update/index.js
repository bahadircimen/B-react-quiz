import React, {Component} from 'react';
import styles from "./styles.scss";


class Update extends Component {
    constructor(props) {
        super(props);
        this.emptyAnswer= {
            answer:"2"
        };

        this.emptyQuestion= {
            question:"1",
            answers:[this.emptyAnswer,this.emptyAnswer],
            correctAnswer:""
        };

        this.state = {
            // dataa:JSON.parse(localStorage.getItem('data')).quiz,

            data:{
                quizTitle:"1",
                questions:[this.emptyQuestion]
            },

            jasper: { name: 'jasper', age: 28 },
        }
    }

    onSubmit=(event)=> {
        event.preventDefault();
    };

    addQuestion=()=> {
        const {data}=this.state;
        data.questions.push(this.emptyQuestion);
        this.setState({data:data});
    };

    addAnswer=(index)=> {
        const {data}=this.state;
        const tempdata={...data};
        tempdata.questions[0].answers.push(this.emptyAnswer);
        console.log(data,tempdata)

        // this.setState({data:data});
    };

    quizNameChange=(event)=>{
        this.setState(prevState => {
            let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
            jasper.name = 'a';                     // update the name property, assign a new value
            return { jasper };                                 // return new object jasper object
        })
        this.setState({quizName: event.target.value});
        event.preventDefault();
    };


    render() {
        const {data}=this.state;
        console.log(data)
        return (
            <div className={styles.quizContainer}>
                <form action="" onSubmit={this.onSubmit}>
                    <div className={styles.quizTitle}>
                        <label>Exam Title</label>
                        <input value={data.quizTitle} type="text"/>
                    </div>
                    {
                        data.questions.map((d,index)=>{
                            return (
                                <div key={index} className={styles.questionsContainer}>
                                    <div className={styles.questions}>
                                        <label>{index+1}.Question</label>
                                        <input value={d.question} type="text"/>
                                        <div className={styles.answers}>
                                            <label>Answers</label>
                                            {
                                                d.answers.map((da,i)=>{
                                                    return (
                                                        <div key={i} className={styles.inputDiv}>
                                                            <label>{i+1}.</label>
                                                            <input name={index} type="radio"/>
                                                            <input value={da.answer} type="text"/>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <input value={"Add an Answer"} onClick={()=>this.addAnswer(index)} type="button"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <input onClick={this.addQuestion} type="button"/>
                </form>
            </div>
            // <div className={styles.examContainer}>
            //     <div className={styles.examName}>
            //         <form onSubmit={this.onSubmit}>
            //             <label>Exam Tittle</label>
            //             <input type="text" value={this.state.quizName}/>
            //         </form>
            //     </div>
            //     <div className={styles.questionsContainer}>
            //         <div className={styles.questions}>
            //             <form>
            //                 <label>Question</label>
            //                 <input type="text"/>
            //             </form>
            //         </div>
            //         <div className={styles.answers}>
            //             <form>
            //                 <label>Answers</label>
            //                 <div className={styles.inputDiv}>
            //                     <label></label>
            //                     <input type="radio"/>
            //                     <input type="text"/>
            //                     <button>Delete</button>
            //                 </div>
            //             </form>
            //             <button onClick={this.handleAddTask}>Add an Answer</button>
            //         </div>
            //     </div>
            //     <button>Save Questions</button>
            // </div>
        );
    }
}

export default Update;