import React, {Component} from 'react';
import styles from "./styles.scss";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    totalPage=()=>{
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    };

    createButton=()=>{
        let pg=[];
        for(let i=1; i<this.totalPage()+1; i++)
            pg.push(i);
        let a=pg.slice(1,5);
        let b=pg.slice(this.props.page-2,this.props.page-1+2);
        let c=pg.slice(this.totalPage()-5,this.totalPage());
        let d=pg.slice(1,this.totalPage());

        if(this.totalPage()>=8&&this.props.page<4){
            return a.map(d=>{
                return <button onClick={event => this.props.changePage(event,d, true)} value={d} key={d}>{d}</button>
            });
        }
        else if(this.totalPage()>=8&&this.props.page<this.totalPage()-3){
            return b.map(d=>{
                return <button onClick={event => this.props.changePage(event,d, true)} value={d} key={d}>{d}</button>
            });
        }

        else if(this.totalPage()>=8&&this.props.page*1>=this.totalPage()-4){
            return c.map(d=>{
                return <button onClick={event => this.props.changePage(event,d, true)} value={d} key={d}>{d}</button>
            });
        }

        else{
            return d.map(d=>{
                return <button onClick={event => this.props.changePage(event,d, true)} value={d} key={d}>{d}</button>
            });
        }
    };

    render() {
        return (
            <div>
                <div className={styles.pagination}>
                    {this.props.page*1===1
                        ?<button disabled style={{cursor:"not-allowed"}} key="leftBtn" value="leftBtn"><i className="fas fa-angle-double-left"/></button>
                        :<button key="leftBtn" value="leftBtn" onClick={event => this.props.changePage(event,-1)}><i className="fas fa-angle-double-left"/></button>
                    }
                    {<button onClick={event => this.props.changePage(event,1, true)} key={1} value={1}>{1}</button>}
                    {this.totalPage()>=8&&this.props.page>=4?<button disabled={true} key="f1">...</button>:null}
                    {this.createButton()}
                    {this.totalPage()>=7&&this.props.page*1 <= this.totalPage()-4 ? <button disabled={true} key="f2">...</button> : null}
                    {this.totalPage()>=7&&this.props.page*1<this.totalPage()-3?<button onClick={event => this.props.changePage(event,this.totalPage(), true)} key={this.totalPage()} value={this.totalPage()}>{this.totalPage()}</button>:null}
                    {this.props.page*1===this.totalPage()
                        ?<button disabled style={{cursor:"not-allowed"}} key="rightBtn" value="rightBtn"><i className="fas fa-angle-double-right"/></button>
                        :<button key="rightBtn" value="rightBtn" onClick={event => this.props.changePage(event,1)}><i className="fas fa-angle-double-right"/></button>
                    }
                </div>
            </div>
        );
    }
}

export default Pagination;