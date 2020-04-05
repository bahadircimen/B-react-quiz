import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import Questionss from "../components/Questionss";
import Quiz from "../components/Quiz";


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
                            {/*<Questionss/>*/}
                            <Quiz/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
