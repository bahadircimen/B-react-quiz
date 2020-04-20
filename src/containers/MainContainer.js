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
            update: Home,
            preview: Preview,
            create: Home
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

    a=()=>{
        let a=[1,2,3,4]
        return a.map((d,index)=>{return d})[0];
    }
    render() {
        console.log(this.a())
        const { component } = this.state;
        const Component = this.components[this.state.component];
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.row}>
                        {
                            this.state.component==="preview"
                                ?
                                <div className={styles.back}>
                                    <i style={{marginLeft:"4%"}} className="fas fa-arrow-left fa-2x" onClick={()=>this.changeComponent("home")}/>
                                </div>
                                : null
                        }
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
