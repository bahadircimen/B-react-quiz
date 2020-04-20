import React, {Component} from 'react';
import styles from "./styles.scss";
import dataService from "../../services/dataService";
import FormModal from "../../components/FormModal";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
        }
    }

    async componentDidMount(){
        const data=await dataService.getData()
        const dataa={quizzes:[]}
        if (data===null){
            await dataService.setData(dataa)
        }
        else{
            null
        }
    }

    async componentDidUpdate(prevProps){
        const localData=await dataService.getData()
        const {data}=this.state;
        if (this.props.component!==prevProps.component){
            this.setState({data:localData   })
        }
        else{
            null
        }
    }

    deleteQuiz=(index)=>{
        let data = this.state.data;
        data.quizzes.splice(index,1);
        this.setState({data:data});
        localStorage.setItem('data', JSON.stringify(data));
    };

    renderCard=()=>{
        const {data}=this.state;
        if (data===null)
        {return null}
        else
        {
            return(
            data.quizzes.map((d,index)=>{
                return(
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.button}>
                                <i title={"Delete"} onClick={()=>this.deleteQuiz(index)} className="fas fa-trash-alt fa-xs"/>
                            </div>
                            <label>Quiz Title</label>
                            {d.quizTitle}
                        </div>
                        <div className={styles.cardBody}>
                            <label>Total Questions</label>
                            {d.questions.length}
                            <label>Created At</label>
                            {d.createdAt}
                        </div>
                        <div className={styles.cardFooter}>
                            <div className={styles.cardBodyBotLeft}>
                                <button onClick={()=>this.props.changeExamIndex(index,"update")}>Update</button>
                            </div>
                            <div className={styles.cardBodyBotRight}>
                                <button onClick={()=>this.props.changeExamIndex(index,"preview")}>Preview</button>
                            </div>
                        </div>
                    </div>
                )
            }))
        }
    };

    render() {
        const {changeComponent,component}=this.props;
        return (
            <div className={styles.cardCont} >
                {
                    component==="home"
                    ?null
                    :   <FormModal
                            examIndex={this.props.examIndex}
                            component={this.props.component}
                            changeComponent={this.props.changeComponent}
                        />
                }
                <div className={styles.cardAdd} onClick={()=>changeComponent("create")}>
                    Add a Quiz
                    <i className="far fa-plus-square fa-4x"/>
                </div>
                {this.renderCard()}
            </div>
        )
    }
}

export default Home;