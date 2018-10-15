import React from 'react'
import { View, Text, StyleSheet, NetInfo } from 'react-native'
import { connect } from 'react-redux'
import actions from '../redux/netinfo/action'

class MyNetInfo extends React.PureComponent {
    constructor(props) {
        super(props)
        this.count = 0
    }

    async componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectionChange
        )    
    }

    componentWillUnmount() {
        console.log("netInfo unmount");
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectionChange
        )
    }

    _handleConnectionChange = (isConnected) => {
        console.log('called');
        this.props.dispatch(actions.netinfo(isConnected))
    }

    render() {
        const { netInfo } = this.props
        if (netInfo.netinfo) return <View />
        return (
            <View style={styles.connectionStatus}>
                <Text style={styles.connectionText}>Internet Connection Error. Check your internet status and restart the app.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    connectionStatus: {
        position: 'absolute',
        bottom: 0,
        left:0,
        width: "100%",
        backgroundColor: 'red',
        alignItems: 'center'
    },
    connectionText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding:5
    },
})

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
  }
}

export default connect(mapStateToProps)(MyNetInfo)