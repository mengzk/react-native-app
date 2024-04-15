/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, Animated, Dimensions, StyleSheet} from 'react-native';


const {width,height} = Dimensions.get('screen');
class AnimatedClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    // Animated.timing(this.state.scrollAnim, {toValue: 1, duration: 3000}).start();
  }

  render() {
    const {scrollAnim} = this.state;

    return (
      <View style={styles.page}>
        {this.animView()}
        <ScrollView
          nestedScrollEnabled
          scrollEventThrottle={100}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollAnim}}},
          ])}>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          <Text style={styles.text}>滑呀滑呀滑</Text>
          
        </ScrollView>
      </View>
    );
  }

  animView = () => {
    const {scrollAnim} = this.state;
    // const opacity = scrollAnim.interpolate({
    //   inputRange: [0, 200, 280],
    //   outputRange: [0, 0, 1],
    // });
    const maxWidth = scrollAnim.interpolate({
      inputRange: [0, 100, 1000],
      outputRange: [0, 0, width],
    });
    // transform: [{ scaleY: scrollAnim }], opacity: scrollAnim
    return (
      <Animated.View
        style={{...styles.scrollAnim, maxWidth}}>
          <View></View>
        </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollAnim: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: 3,
    zIndex: 3,
    backgroundColor: '#ff6600',
  },
  text: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default AnimatedClass;
