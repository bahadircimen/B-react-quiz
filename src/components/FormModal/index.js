import React, {Component} from 'react';
import styles from "./styles.scss";


class FormModal extends Component {
    render() {
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <label>Create a new form</label>
                        <i className="fas fa-times"/>
                    </div>
                    <div className={styles.modalBody}>
                        <label>Name</label>
                        <input type="text"/>
                        <label>Form Style</label>
                        <div className={styles.formStyleContainer}>
                            <div className={styles.formStyleColumn}>
                                <div className={styles.box}></div>
                                <label>Inline Form</label>
                            </div>
                            <div className={styles.formStyleColumn}>
                                <div className={styles.box}></div>
                                <label>Floating Bar</label>
                            </div>
                            <div className={styles.formStyleColumn}>
                                <div className={styles.box}></div>
                                <label>Floating Box</label>
                            </div>
                            <div className={styles.formStyleColumn}>
                                <div className={styles.box}></div>
                                <label>Modal</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bodyFooter}>
                        <div className={styles.col1}>
                            <label>Action</label>
                            <select id="">
                                <option value=""></option>
                            </select>
                        </div>
                        <div className={styles.col2}>
                            <label>Options</label>
                            <select id="">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <div className={styles.button1}>
                            <button>Cancel</button>
                        </div>
                        <div className={styles.button2}>
                            <button>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormModal;