import React, {Component} from "react";
import PropTypes from "prop-types";
import WheelView from "./Components/WheelView";
import PickerHeadView from "./Components/PickerHeadView";
import {StyleSheet, View} from "react-native";
import {CommonStyle} from "react-native-bnq-app-framework";
import {globalIsPad} from "../../../Pad/Utils/PadUtils";
import Modal from "react-native-modal";

/**
 * 单项选择 picker
 */
export default class SinglePicker extends Component {

    static propTypes = {
        data: PropTypes.array,
        index: PropTypes.number,
        unit: PropTypes.string,
        identifier: PropTypes.string, //显示内容对象取值的key
        visible: PropTypes.bool,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,

        leftTxt: PropTypes.string,
        leftView: PropTypes.any, //左侧的view，优先级最高
        leftViewStyle: PropTypes.any,
        showLeftView: PropTypes.bool,
        centerTxt: PropTypes.string,
        centerView: PropTypes.any, //中间的view，优先级最高
        centerViewStyle: PropTypes.any,
        showCenterView: PropTypes.bool,
        rightTxt: PropTypes.string,
        rightView: PropTypes.any, //中间的view，优先级最高
        rightViewStyle: PropTypes.any,
        showRightView: PropTypes.bool,
        headContainerStyle: PropTypes.any
    }

    static defaultProps = {
        data: [],
        index: 0,
        unit: '',
        visible: false,
        onCancel: null,
        onConfirm: null,

        leftTxt: '取消',
        leftView: null,
        leftViewStyle: {},
        showLeftView: true,
        centerTxt: '',
        centerView: null,
        centerViewStyle: {},
        showCenterView: true,
        rightTxt: '确定',
        rightView: null,
        rightViewStyle: {},
        showRightView: true,
        headContainerStyle: {}
    }

    constructor(props) {
        super(props);
        this.visible = props.visible
        this.centerTxt = props.centerTxt
        this.data = props.data || []
        this.unit = props.unit || ''
        this.selectIndex = props.index || 0
        this.identifier = props.identifier || ''
        this.onConfirm = props.onConfirm
        this.onCancel = props.onCancel
    }

    /**
     * 可以什么都不传，从 props 中配置
     *
     * config:{
     *     title:'',
     *     data:[],
     *     index:0,
     *     unit:'',
     *     identifier:''
     * }
     */
    show = (config, onConfirm, onCancel) => {
        // console.log('show config ====>', JSON.stringify(config))
        if (!!config?.title) {
            this.centerTxt = config.title
        }
        if (!!config?.data?.length) {
            this.data = config.data
        }
        if (!!config?.index) {
            this.selectIndex = config.index < 0 ? 0 : (config.index || 0)
        }
        // if (!!config?.unit) {
        this.unit = config?.unit || ''
        // }
        if (!!config?.identifier) {
            this.identifier = config.identifier
        }
        if (!!onConfirm) {
            this.onConfirm = onConfirm
        }
        if (!!onCancel) {
            this.onCancel = onCancel
        }
        this.visible = true
        this.setState({})
    }

    dismiss = () => {
        // this.centerTxt = ''
        // this.data = []
        // this.selectIndex = 0
        // this.unit = ''
        // this.identifier = ''
        this.visible = false
        this.setState({})
    }

    onChange = (index) => {
        this.selectIndex = index
    }

    cancelFunc = () => {
        !!this.onCancel && this.onCancel()
        this.dismiss()
    }

    confirmFunc = () => {
        !!this.onConfirm && this.onConfirm(this.selectIndex)
        this.dismiss()
    }

    render() {
        let {
            leftTxt,
            leftView,
            leftViewStyle,
            showLeftView,
            centerView,
            centerViewStyle,
            showCenterView,
            rightTxt,
            rightView,
            rightViewStyle,
            showRightView,
            headContainerStyle
        } = this.props

        let height = globalIsPad ? 400 : 370

        return (
            <Modal
                style={{
                    margin: 0,
                    alignItems: 'center',
                    justifyContent: globalIsPad ? 'center' : 'flex-end'
                }}
                backdropOpacity={0.3}
                isVisible={this.visible}
            >
                {/*<View style={styles.mask}>*/}
                <View style={styles.container(height)}>
                    <PickerHeadView
                        leftTxt={leftTxt}
                        leftView={leftView}
                        leftViewStyle={leftViewStyle}
                        showLeftView={showLeftView}
                        centerTxt={this.centerTxt}
                        centerView={centerView}
                        centerViewStyle={centerViewStyle}
                        showCenterView={showCenterView}
                        rightTxt={rightTxt}
                        rightView={rightView}
                        rightViewStyle={rightViewStyle}
                        showRightView={showRightView}
                        containerStyle={headContainerStyle}
                        leftPressFunc={this.cancelFunc}
                        rightPressFunc={this.confirmFunc}
                    />
                    <View style={styles.content}>
                        <WheelView
                            data={this.data}
                            index={this.selectIndex}
                            unit={this.unit}
                            identifier={this.identifier}
                            onChange={this.onChange}
                        />
                    </View>
                </View>
                {/*</View>*/}
            </Modal>
        )
    }
}

let styles = StyleSheet.create({
    mask: {
        flex: 1,
        alignItems: 'center',
        justifyContent: globalIsPad ? 'center' : 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    container: (height) => ({
        height: height,
        width: globalIsPad ? 375 : CommonStyle.screen_width,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: globalIsPad ? 12 : 0,
        borderBottomRightRadius: globalIsPad ? 12 : 0
    }),
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})