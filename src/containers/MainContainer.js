import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import Preview from "../components/Preview";
import Quiz from "../components/Quiz";
import Home from "../components/Home";
import Update from "../components/Update";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.colMd12}>
                            <Preview/>
                            <Quiz/>
                            <Home/>
                            <Update/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
