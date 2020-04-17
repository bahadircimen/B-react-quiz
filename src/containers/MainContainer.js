import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import Preview from "../Screens/Preview";
import Home from "../Screens/Home";
import QuizFormContainer from "../Screens/QuizFormContainer";
import FormModal from "../components/FormModal";
import Test from "../components/Test";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.components ={
            home: Home,
            update: QuizFormContainer,
            preview: Preview,
            create: QuizFormContainer
        };

        this.state = {
            component:"home",
            examIndex:0,
        }
    }


    changeComponent=(value)=>{
        let {component}=this.state;
        component=value;
        this.setState({component: component});
    };

    changeExamIndex=(index,value)=>{
        let {examIndex}=this.state;
        examIndex=index;
        this.setState({examIndex: examIndex});
        this.changeComponent(value)
    };

    render() {
        const { component } = this.state;
        const Component = this.components[this.state.component];
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.back}>
                            {
                                this.state.component==="home"
                                ? null
                                : <i className="fas fa-arrow-left fa-2x" onClick={()=>this.changeComponent("home")}/>
                            }
                        </div>
                        <div className={styles.colMd12}>
                            <Component
                                changeComponent={this.changeComponent}
                                changeExamIndex={this.changeExamIndex}
                                examIndex={this.state.examIndex}
                                data={this.state.data}
                                component={component}
                            />
                            {/*<Test/>*/}
                            {/*<FormModal/>*/}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
