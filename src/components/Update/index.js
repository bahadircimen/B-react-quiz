import React, {Component} from 'react';
import styles from "./styles.scss";


class Update extends Component {
    constructor(props) {
        super(props);
        this.emptyTask = {
            title: '',
            id: null,
            errors: {},
            _destroy: false
        };
        this.emptyAnswer= {
            answer:""
        };

        this.emptyQuestion= {
            question:"",
            answers:[this.emptyAnswer,this.emptyAnswer],
            correctAnswer:""
        };

        this.state = {
            data:JSON.parse(localStorage.getItem('data')).quiz,
            dataa:{
                quizTitle:"",
                questions:[this.emptyQuestion]
            },

                jasper: { name: 'jasper', age: 28 },
                project: {
                    name: '',
                    errors: {},
                    tasks_attributes: [Object.assign({}, this.emptyTask)]
                }
        }
    }

    onSubmit=(event)=> {
        event.preventDefault();
    };

    handleAddTask=()=> {
        let data=this.state.dataa;
        data.questions.push(this.emptyQuestion);
        this.setState({dataa:data});
        console.log(data)
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
        console.log(this.state.dataa)
        return (
            <div className={styles.examContainer}>
                <div className={styles.examName}>
                    <form onSubmit={this.onSubmit}>
                        <label>Exam Tittle</label>
                        <input type="text" value={this.state.quizName}/>
                    </form>
                </div>
                <div className={styles.questionsContainer}>
                    <div className={styles.questions}>
                        <form>
                            <label>Question</label>
                            <input type="text"/>
                        </form>
                    </div>
                    <div className={styles.answers}>
                        <form>
                            <label>Answers</label>
                            <div className={styles.inputDiv}>
                                <label></label>
                                <input type="radio"/>
                                <input type="text"/>
                                <button>Delete</button>
                            </div>
                        </form>
                        <button onClick={this.handleAddTask}>Add an Answer</button>
                    </div>
                </div>
                <button>Save Questions</button>
            </div>
        );
    }
}

export default Update;