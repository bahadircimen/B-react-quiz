import React, {Component, Fragment} from 'react';
import styles from "./styles.scss";
import Preview from "../Screens/Preview";
import Home from "../Screens/Home";
import Updatee from "../Screens/Updatee";
import Create from "../Screens/Create";
import Tests from "../Screens/Tests";


class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.components ={
            home: Home,
            update: formContainer,
            preview: Preview,
            create: formContainer,
        };

        this.state = {
            component: "home",
            examIndex: 0,
            data: {
                quizzes: []
            }
        }
    }

    componentDidMount(){
        const data=JSON.parse(localStorage.getItem('data'));
        if(data){
           this.setState({
               data: data
           });
        }
    }

    componentDidUpdate(prevState){
        if(prevState.data !== this.state.data){
            localStorage.setItem("data", JSON.stringify(this.state.data));
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
                            {/*<Tests/>*/}
                            <Component
                                changeComponent={this.changeComponent}
                                changeExamIndex={this.changeExamIndex}
                                examIndex={this.state.examIndex}
                                data={this.state.data}
                                component={component}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
