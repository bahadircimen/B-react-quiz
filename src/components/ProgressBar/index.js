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
        const{classNameStep,classNameIcon}=this.props;
        return (
            <React.Fragment>
                {/*<div className={styles[`icon${this.state.icon}`]}>*/}
                {/*    <i className="fas fa-check fa-xs"/>*/}
                {/*</div>*/}
                <div className={styles[classNameStep]}></div>
                <div className={styles[classNameIcon]}>
                    {classNameIcon==="iconBlue"
                        ? <i className="fas fa-check fa-xs"/>
                        :classNameIcon==="iconYellow"
                        ? <i className="fas fa-exclamation fa-xs"/>
                        : null
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default ProgressBar;