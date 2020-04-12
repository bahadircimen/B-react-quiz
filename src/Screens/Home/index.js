import React, {Component} from 'react';
import styles from "./styles.scss";
import dataService from "../../services/dataService";



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
        }
    }

    // componentDidMount(){
    //     const data=JSON.parse(localStorage.getItem('data'));
    //     const dataa={quizzes:[]}
    //     if (data===null){
    //         localStorage.setItem('data', JSON.stringify(dataa));
    //     }
    //     else{
    //         null
    //     }
    // }

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

    deleteQuiz=(event)=>{
        let data = this.state.data;
        data.quizzes.splice(event.target.value,1);
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
                            <label>Quiz Title:</label>
                            {d.quizTitle}
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.cardBodyTop}>
                                <button onClick={()=>this.props.changeExamIndex(index,"preview")}>Preview</button>
                            </div>
                            <div className={styles.cardBodyBot}>
                                <div className={styles.cardBodyBotLeft}>
                                    <button onClick={()=>this.props.changeExamIndex(index,"update")}>Update</button>
                                </div>
                                <div className={styles.cardBodyBotRight}>
                                    <button value={index} onClick={this.deleteQuiz}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <label>Total Questions:</label>
                            {d.questions.length}
                        </div>
                    </div>
                )
            }))
        }
    };

    render() {
        return (
            <div className={styles.cardCont} >
                <div className={styles.cardAdd} onClick={()=>this.props.changeComponent("create")}>
                    Add a Quiz
                    <i className="far fa-plus-square fa-4x"/>
                </div>
                {this.renderCard()}
            </div>
        )
    }
}

export default Home;