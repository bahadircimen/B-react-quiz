import React, {Component} from 'react';
import Form from "../../components/Form";
import styles from "./styles.scss";
import FormInput from "../../components/FormInput";
import dataService from "../../services/dataService";

class QuizFormContainer extends Component {
    constructor(props) {
        super(props);
        this.emptyAnswer= {
            answer: "",
        };

        this.state = {
            localData: {quizzes:[]},
            data:{
                quizTitle:"",
                questions:[{
                    question: "",
                    answers: [{...this.emptyAnswer},{...this.emptyAnswer}],
                    correctAnswer: "",
                }]
            }

        }
    }

    async componentDidMount(){
        const data= await dataService.getQuiz(this.props.examIndex);
        const localData = await dataService.getData();
        this.setState({localData:localData})
        if (this.props.component==="update"){
            this.setState({data:data})
        }
    }

    addQuestion=()=> {
        const { data }= this.state;
        data.questions.push(
            {
                question: "",
                answers: [{...this.props.emptyAnswer},{...this.emptyAnswer}],
                correctAnswer: "",
            }
        );
        this.setState({data:data});
    };

    addAnswer=(index)=> {
        const { data }= this.state;
        data.questions[index].answers.push({...this.emptyAnswer});
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

    onSubmit=(event,value)=>{
        event.preventDefault();
        const {data, localData} = this.state;
        const {component, examIndex}=this.props;
        const emptyLocalData={quizzes:[]};
        if (component==="create"){
            emptyLocalData.quizzes.push(...JSON.parse(localStorage.getItem('data')).quizzes,data);
            localStorage.setItem('data', JSON.stringify(emptyLocalData));
            alert("Exam Added");
        }
        else {
            localData.quizzes[examIndex]=data;
            localStorage.setItem('data', JSON.stringify(localData));
            alert("Exam Updated");
        }
        this.props.changeComponent(value);
    };

    render() {
        const {data}=this.state;
        return (
            <div className={styles.quizContainer}>
                <Form onSubmit={event=>this.onSubmit(event,"home")}>
                    <FormInput
                        label="Exam Title"
                        type="text"
                        value={data.quizTitle}
                        onChange={this.titleChange}
                        className={styles.quizTitle}
                        required={true}
                    />
                    {
                        data.questions.map((d,index)=>{
                            return (
                                <div key={index} className={styles.questionsContainer}>
                                    <div key={index} className={styles.questions}>
                                        <div className={styles.labelDiv}>
                                            <label>{index+1}.Question</label>
                                            {
                                                data.questions.length>1
                                                    ? <FormInput
                                                        type="button"
                                                        value={"Delete"}
                                                        onClick={() => this.deleteQuestion(index)}
                                                      />
                                                    : null
                                            }

                                        </div>
                                        <FormInput
                                            type="text"
                                            value={d.question}
                                            onChange={event => this.questionChange(event, d)}
                                            required={true}
                                        />
                                        <div key={index} className={styles.answers}>
                                            <label>Answers</label>
                                            {
                                                d.answers.map((da,i)=>{
                                                    return (
                                                        <div key={i} className={styles.inputDiv}>
                                                            <FormInput
                                                                label={i+1+"."}
                                                                name={index}
                                                                type="radio"
                                                                value={i}
                                                                onChange={event => this.correctAnswerChange(event, d)}
                                                                required={true}
                                                                checked={d.correctAnswer===i}
                                                            />
                                                            <FormInput
                                                                type="text"
                                                                value={da.answer}
                                                                onChange={event => this.answerChange(event, da)}
                                                                required={true}
                                                            />
                                                            {
                                                                d.answers.length>2
                                                                    ? <FormInput
                                                                        type="button"
                                                                        value={"Delete"}
                                                                        onClick={() => this.deleteAnswer(i, d)}
                                                                      />
                                                                    : null
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                            <FormInput
                                                type="button"
                                                value={"Add an Answer"}
                                                onClick={()=>this.addAnswer(index)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <FormInput
                        type="button"
                        value={"Add an Question"}
                        onClick={this.addQuestion}
                    />
                    <button>Save Questions</button>
                </Form>
            </div>
        );
    }
}

export default QuizFormContainer;