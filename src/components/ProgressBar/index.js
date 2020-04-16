import React, {Component} from 'react';
import styles from "./styles.scss";

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon:"",
            step:""
        }
    }

    // componentDidUpdate(){
    //     const {correctAnswer,count}=this.props;
    //     if (correctAnswer[count]!==undefined){
    //         this.setState({icon:"green",step:"green})
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                <div className={styles[`step${this.state.step}`]}></div>
                <div className={styles[`icon${this.state.icon}`]}>
                    <i className="fas fa-check fa-xs"/>
                </div>
            </React.Fragment>
        );
    }
}

export default ProgressBar;