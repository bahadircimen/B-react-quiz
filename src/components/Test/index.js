import React, {Component} from 'react';
import styles from "./styles.scss";
import FormInput from "../FormInput";
import Form from "../Form";

class Test extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.bar}>
                    <Form>
                        <FormInput
                            type="text"
                            label={"User Name"}
                        />
                        <FormInput
                            type="text"
                            label={"Password"}
                        />
                    </Form>
                </div>
                <div className={styles.inline}>
                    <Form>
                        <FormInput
                            type="text"
                            label={"User Name"}
                        />
                        <FormInput
                            type="text"
                            label={"Password"}
                        />
                    </Form>
                </div>
                <div className={styles.box}></div>
                <div className={styles.modal}></div>
            </div>
        );
    }
}

export default Test;