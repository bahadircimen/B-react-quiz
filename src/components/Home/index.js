import React, {Component} from 'react';
import styles from "./styles.scss";



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
        }
    }

    deleteQuiz=(event)=>{
        let data = this.state.data;
        data.quiz.splice(event.target.value,1);
        this.setState({data:data});
        localStorage.setItem('data', JSON.stringify(data));
    };

    renderCard=()=>{
        const {data}=this.state;
        if (data===null)
        {null}
        else
        {
            return(
            data.quiz.map((d,index)=>{
                return(
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <label>Quiz Title:</label>
                            {d.name}
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.cardBodyTop}>
                                <button>Preview</button>
                            </div>
                            <div className={styles.cardBodyBot}>
                                <div className={styles.cardBodyBotLeft}>
                                    <button>Update</button>
                                </div>
                                <div className={styles.cardBodyBotRight}>
                                    <button value={index} onClick={this.deleteQuiz}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <label>Total Questions:</label>
                            {d.questions.map(da=>{
                                return da.question.length
                            })}
                        </div>
                    </div>
                )
            }))
        }
    };

    render() {
        // console.log(this.state.data.quiz.map((d,index)=>{
        //     return d.questions.map(da=>{
        //         return da.question.length
        //     })
        // }));

        return (
            <div className={styles.cardCont}>
                <div className={styles.cardAdd}>
                    Add Quiz
                    <i className="far fa-plus-square fa-4x"/>
                </div>
                {this.renderCard()}
            </div>
        )
    }
}

export default Home;