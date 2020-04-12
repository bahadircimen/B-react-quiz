import React, {Component} from 'react';
import Form from "../../components/Form";
import styles from "./styles.scss";

class Updatee extends Component {
    constructor(props) {
        super(props);
        this.emptyAnswer= {
            answer: "",
        };

        this.state = {
            localData:JSON.parse(localStorage.getItem('data')),
            data:JSON.parse(localStorage.getItem('data')).quizzes[this.props.examIndex]

        }
    }

    onSubmit=(event,value)=>{
        event.preventDefault();
        const {data,localData} = this.state;
        localData.quizzes[this.props.examIndex]=data;
        localStorage.setItem('data', JSON.stringify(localData));

        alert("Exam Updated");
        this.props.changeComponent(value);
    };

    render() {
        return (
            <div className={styles.cont}>
                <Form
                data={this.state.data}
                onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default Updatee;