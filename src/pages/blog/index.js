import React, { Component } from 'react';
import { View, StyleSheet, FlatList,TouchableOpacity, Text } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements'
import avatarImg from '../../../assets/avatar.png';
import Menu from '../../components/SideMenu';
import SideMenu from 'react-native-side-menu';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import actions from '../../redux/blog/action';
import HTMLView from 'react-native-htmlview';
import {APP_SETTING} from '../../settings/appconfig';
import { getContentFromHTML } from '../../helpers/utility';




class BlogPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            isloading:false,
            pageNum:1
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.moreBtnPress = this.moreBtnPress.bind(this);
    }
    componentDidMount(){
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
        {
          return
        }
        this.setState({isloading:true})
        pageinfo = {
            amtperpage:APP_SETTING.blogAmtPerPage,
            pagenum:this.state.pageNum
        }
        this.props.getBlogList(pageinfo);
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
    toggleSideMenu () {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loading==false)
            this.setState({isloading:false});
    }
    nextPage(){
        if(this.props.blog.length == APP_SETTING.blogAmtPerPage){
            pagenum = this.state.pageNum+1;    
            this.setState({pageNum:pagenum});    
            this.getData(pagenum);
        }
    }
    prevPage(){
        if(this.state.pageNum!=1){
            pagenum = this.state.pageNum-1;        
            this.setState({pageNum:pagenum});
            this.getData(pagenum);
        }
    }
    getData(pagenum){
        this.setState({isloading:true})

        pageinfo = {
            amtperpage:APP_SETTING.blogAmtPerPage,
            pagenum:pagenum
        }
        this.props.getBlogList(pageinfo);
    }

    moreBtnPress(custom_link){
        data = {
            custom_link:custom_link
        }
        this.props.navigation.navigate('blogdetail', data);
    }

    render(){
        const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
        return(
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
                onChange={isOpen => this.updateMenuState(isOpen)}
                
                >
                <View style = {styles.container}>
                    <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <LogoComponent ></LogoComponent>
                    <NavBar  props = {this.props} title="Top Blogs" back_have={false} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
                    <View style = {styles.body}>
                        <View style = {{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity onPress = {this.prevPage}> <Icon type = "feather" name="chevron-left" size={20}/> </TouchableOpacity>
                            <Text style={{fontSize:18, paddingLeft:10, paddingRight:10}}>{this.state.pageNum}</Text>
                            <TouchableOpacity onPress = {this.nextPage}> <Icon type = "feather" name="chevron-right" size={20}/> </TouchableOpacity>
                        </View>
                        <View style = {{flex:10}}>
                            <FlatList
                                data={this.props.blog}

                                renderItem={
                                    ({item}) => (<Card
                                                    title = {item.title}
                                                    image = {{uri:item.image}}
                                                    >
                                                    
                                                    <HTMLView
                                                        value = {getContentFromHTML(item.short_content)}
                                                        />
                                                    <Button
                                                        onPress = {()=>this.moreBtnPress(item.custom_link)}
                                                        backgroundColor='#EC6E6F'
                                                        buttonStyle={{
                                                            borderRadius: 0, 
                                                            marginLeft: "25%", 
                                                            marginTop:-50, 
                                                            backgroundColor:'#EC6E6F', 
                                                            width:"50%", 
                                                            height:40}}
                                                        title='Read more..' />
                                                </Card>)
                                    }
                            />
                        </View>
                        
                    </View>
                </View>
            </SideMenu>
            

        )
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
    },
});

function mapDispatchToProps(dispatch){
	return{
		getBlogList : (pageinfo)=>{
			dispatch(actions.getBlogList(pageinfo));
    }
  }	
}
function mapStateToProps(state){
	return{
        blog:state.blogReducer.blog,
        netinfo:state.netInfo,
        loading:state.blogReducer.loading
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);