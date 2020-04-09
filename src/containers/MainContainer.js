import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import Preview from "../components/Preview";
import Home from "../components/Home";
import Updatee from "../components/Updatee";
import Create from "../components/Create";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.components ={
            home: Home,
            update: Updatee,
            preview: Preview,
            create: Create
        };

        this.state = {
            component:"home",
            examIndex:0,
        }
    }

    componentDidMount(){
        const data=JSON.parse(localStorage.getItem('data'));
        const dataa={quizzes:[]}
        if (data===null){
            localStorage.setItem('data', JSON.stringify(dataa));
        }
        else{
            null
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
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
