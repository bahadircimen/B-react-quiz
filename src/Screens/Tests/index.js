import React, {Component} from 'react';
import dataService from "../../services/dataService";
import Test from "../../components/Test";

class Tests extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentWillMount(){
        let quiz=await dataService.getQuiz();
        let questions=await dataService.getQuestions();
        let answers=await dataService.getAnswers();
        let quizTitle=await dataService.getQuizTitle();
        this.setState({quiz:quiz,questions:questions,answers:answers,quizTitle:quizTitle})
    }

    render() {
        return (
            <div>
                <Test
                state={this.state}
                />
            </div>
        );
    }
}

export default Tests;