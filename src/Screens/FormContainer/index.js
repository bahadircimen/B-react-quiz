import React, {Component} from 'react';

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.emptyAnswer= {
            answer: "",
        };

        this.initialData = {
            quizId: "",
            quizTitle:"",
            questions:[{
                question: "",
                answers: [{...this.emptyAnswer},{...this.emptyAnswer}],
                correctAnswer: "",
            }]
        };
    }
    onCreateSubmit=(event,value)=>{
        event.preventDefault();
        const {data} = this.state;
        const localData={quizzes:[]};

        localData.quizzes.push(...JSON.parse(localStorage.getItem('data')).quizzes,data);
        localStorage.setItem('data', JSON.stringify(localData));

        alert("Exam Added");
        this.props.changeComponent(value);
    };

    onSubmit=(event,value)=>{
        event.preventDefault();
        const {data, localData} = this.props;
        localData.quizzes[this.props.examIndex]=data;
        localStorage.setItem('data', JSON.stringify(localData));

        alert("Exam Updated");
        this.props.changeComponent(value);
    };

    onSubmitTest = (event, value) => {
      event.preventDefault();
      const { data, component } = this.props;
      if(component === "create"){
          data.quizzes.push({...this.initialData}); //addQuiz(quiz)
      }
        this.props.changeComponent(value);
    };



    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmitTest}>
                    //input
                </Form>
            </div>
        );
    }
}

export default Index;;
