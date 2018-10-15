import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    AsyncStorage
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import actions from '../../redux/proposal/action';
import Error from '../../components/Error';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import ProposalItem from './component/ProposalItem';

class Proposals extends Component {
    
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            isloading:false,
            expired:false,
            isOpen: false
        }  
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    } 

    toggleSideMenu () {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onMenuItemSelected(item){
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
        this.props.navigation.navigate(item);
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    componentDidMount(){
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
            return
        this.setState({isloading:true})
        this.getProposalData();
    }

    getProposalData = async()=>{
        await AsyncStorage.getItem('cust_id',(error,result)=>{
            this.props.getProposal(result);
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.proposal.loading==false){
            this.setState({isloading:false})
        }
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
                onChange={isOpen => this.updateMenuState(isOpen)}
            
            >
                <View style = {styles.container}>
                    <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <LogoComponent ></LogoComponent>
                    <NavBar  props = {this.props} title="PROPOSALS" back_have={false} handlePress={this.toggleSideMenu}></NavBar>

                    { this.state.expired &&<View style = {{height:80}}><Error msg = 'The proposal end date has passed. Please contact support to obtain a new proposal.'></Error></View>}
                    { this.props.proposal.getsuccess==false &&<View style = {{height:65}}><Error msg = {this.props.proposal.message}></Error></View>}
                    <View style = {styles.body}>
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.props.proposal.proposal)}
                            renderRow={(rowData) => <ProposalItem {...this.props} data={rowData} expired = {()=>this.setState({expired:true})}/>}
                        />
                    </View>
                </View>
            </SideMenu>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 3,
        alignItems: 'center',
        backgroundColor:'white',
    },
    
    body:{
        flex:7
    }
});
function mapDispatchToProps(dispatch){
	return{
		getProposal : param=>{
			dispatch(actions.getProposal(param));
        }
    }	
}
function mapStateToProps(state){
	return{
        proposal:state.proposalReducer,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Proposals);