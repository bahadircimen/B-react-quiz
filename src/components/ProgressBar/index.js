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

    // componentDidUpdate() {
    //     if (this.props.correctAnswer != null||undefined) {
    //         this.setState({icon:"Green"});
    //     }
    // }

    render() {
        console.log(this.props.className)
        return (
            <React.Fragment>
                {/*<div className={styles[`icon${this.state.icon}`]}>*/}
                {/*    <i className="fas fa-check fa-xs"/>*/}
                {/*</div>*/}
                <div className={styles[this.props.classNameIcon]}>
                    <i className="fas fa-check fa-xs"/>
                </div>
                <div className={styles[this.props.classNameStep]}></div>
            </React.Fragment>
        );
    }
}

export default ProgressBar;