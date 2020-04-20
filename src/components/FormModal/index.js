import React, {Component} from 'react';
import styles from "./styles.scss";
import Form from "../Form";
import FormInput from "../FormInput";
import dataService from "../../services/dataService";
import Pagination from "../Pagination";


class FormModal extends Component {
    constructor(props) {
        super(props);
        this.emptyAnswer= {
            answer: "",
        };

        this.date=()=>{
            return new Date().toDateString()
        };

        this.state = {
            localData: {quizzes:[]},
            data:{
                quizTitle:"",
                questions:[{
                    question: "",
                    answers: [{...this.emptyAnswer},{...this.emptyAnswer}],
                    correctAnswer: "",
                }],
                createdAt:this.date()
            },

            count:1
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
        const { data,count }= this.state;
        data.questions.push(
            {
                id:this.id,
                question: "",
                answers: [{...this.props.emptyAnswer},{...this.emptyAnswer}],
                correctAnswer: "",
            }
        );
        this.setState({data:data,count:data.questions.length});
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

    questionChange=(event,index)=>{
        const {data}=this.state;
        data.questions[index].question = event.target.value;
        this.setState({data: this.state.data});
    };

    answerChange=(event,index,i)=>{
        const {data}=this.state;
        data.questions[index].answers[i].answer = event.target.value;
        this.setState({data: this.state.data});
    };

    correctAnswerChange=(event,index)=>{
        const {data}=this.state;
        data.questions[index].correctAnswer = event.target.value*1;
        this.setState({data: this.state.data});
    };

    deleteQuestion=(index)=>{
        const {data,count,}=this.state;
        data.questions.splice(index,1);
        if (count===data.questions.length*1+1){
            this.setState({count:count-1})
        }
        else {
            this.setState({count:count})
        }
        this.setState({data: data});
    };

    deleteAnswer=(i,index)=>{
        const {data}=this.state;
        data.questions[index].answers.splice(i,1);
        this.setState({data: data});
    };

    changeCount=(event,change, isPageNumber = false)=> {
        event.preventDefault();
        let {count} = this.state;
        this.setState({count: isPageNumber ? change : count*1 + change});
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
        console.log(this.date())
        const {data,count}=this.state;
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        {
                        this.props.component==="create"
                        ? <label>Create a new quiz</label>
                        : <label>Update a quiz</label>
                        }
                        <i className="fas fa-times" onClick={()=>this.props.changeComponent("home")}/>
                    </div>
                    <Form onSubmit={event=>this.onSubmit(event,"home")}>
                        <div className={styles.modalBody}>
                            <FormInput
                                label="Exam Title"
                                type="text"
                                value={data.quizTitle}
                                onChange={this.titleChange}
                                required={true}
                            />
                            <div className={styles.questionsContainer}>
                                {
                                    data.questions.map((d,index)=>{
                                        return(
                                            <div className={styles.questions}>
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
                                                    onChange={event => this.questionChange(event, index)}
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
                                                                        onChange={event => this.correctAnswerChange(event, index)}
                                                                        required={true}
                                                                        checked={d.correctAnswer===i}
                                                                    />
                                                                    <FormInput
                                                                        type="text"
                                                                        value={da.answer}
                                                                        onChange={event => this.answerChange(event, index, i)}
                                                                        required={true}
                                                                    />
                                                                    {
                                                                        d.answers.length>2
                                                                            ? <FormInput
                                                                                type="button"
                                                                                value={"Delete"}
                                                                                onClick={() => this.deleteAnswer(i, index)}
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
                                        )
                                    })[count-1]
                                }
                            </div>
                            <Pagination
                                page={this.state.count}
                                pageSize={1}
                                totalCount={data.questions.length}
                                changePage={this.changeCount}
                                changePageUp={this.changePageUp}
                                changePageDown={this.changePageDown}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <FormInput
                                type="button"
                                value={"Add a Question"}
                                onClick={this.addQuestion}
                            />
                            <div className={styles.button1}>
                                <button onClick={()=>this.props.changeComponent("home")}>Cancel</button>
                            </div>
                            <div className={styles.button2}>
                                {this.props.component==="create"
                                    ? <button>Create</button>
                                    : <button>Update</button>
                                }
                            </div>
                        </div>
                        {/*<button onClick={this.count}>count</button>*/}
                    </Form>
                    {/*<div className={styles.bodyFooter}>*/}
                    {/*    <div className={styles.col1}>*/}
                    {/*        <label>Action</label>*/}
                    {/*        <select id="">*/}
                    {/*            <option value=""></option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.col2}>*/}
                    {/*        <label>Options</label>*/}
                    {/*        <select id="">*/}
                    {/*            <option value=""></option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default FormModal;