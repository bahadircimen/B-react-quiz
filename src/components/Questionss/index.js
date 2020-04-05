import React, {Component} from 'react';
import styles from "./styles.scss";



class Questionss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('data')),
            count:0,
        }
    }

    nextQuestion=()=>{
        this.setState({count: this.state.count+1})
    };


    render() {
        console.log(this.state.data.quiz[0].name)
        return (

            this.state.data.quiz.map((d,index)=>{
                return (
                    <div key={index} className={styles.cardCont}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                {d.name}
                            </div>
                            <div className={styles.cardBody}>
                                {d.questions.map(da=>{
                                    return da.question[this.state.count]
                                })}
                            </div>
                            {d.questions.map((da,i)=>{
                                return da.answer[this.state.count].map((db,i)=>{
                                    return <div key={i} className={styles.cardFooter}>
                                        <label>
                                            {i+1}. {db}
                                            <input type="radio" name={this.state.count} value={db}/>
                                        </label>
                                    </div>
                                    })
                            })
                            }
                        </div>
                        {d.questions.map(da=>{
                            if(this.state.count+1===da.question.length)
                            {return <button>Finish</button>}
                            else{return <button onClick={this.nextQuestion}>Next Question</button>}
                        })}

                    </div>
                )
            })
        )
    }
}

export default Questionss;