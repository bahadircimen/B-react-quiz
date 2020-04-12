import React, {Component} from 'react';
import Form from "../../components/Form";
import styles from "./styles.scss";

class Create extends Component {
    constructor(props) {
        super(props);
        this.emptyAnswer= {
            answer: "",
        };

        this.state = {
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

    onSubmit=(event,value)=>{
        event.preventDefault();
        const {data} = this.state;
        const localData={quizzes:[]};

        localData.quizzes.push(...JSON.parse(localStorage.getItem('data')).quizzes,data);
        localStorage.setItem('data', JSON.stringify(localData));

        alert("Exam Added");
        this.props.changeComponent(value);
    };

    render() {
        return (
            <div className={styles.cont}>
                <Form
                data={this.state.data}
                emptyAnswer={this.emptyAnswer}
                changeComponent={this.props.changeComponent}
                onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default Create;