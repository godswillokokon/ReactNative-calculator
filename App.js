import React, { Component } from 'react'
import { 
  Text, 
  View,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      resultText: "",
      calaculationText: "",
      
    }
    
    this.operations = ["DEL", "/", "*", "-", "+"];
  }
  calaculateResult(){
    const text = this.state.resultText
    // console.warn(eval(text))
    this.setState({
      calaculationText: eval(text)
    })
  }
  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true 
  }
  buttonPressed(text){
    // console.warn(text);
    if(text == '='){
      return this.validate() && this.calaculateResult()
    }
    this.setState({
      resultText: this.state.resultText+text
    })
  }
  operate(operation){
    switch(operation) {
      case 'DEL' : 
            let text = this.state.resultText.split('')
            text.pop()            
            this.setState({
              resultText: text.join('')
            })
            break
      case '+':
      case '-':
      case "*":
      case '/':
            const lastChar = this.state.resultText.split('').pop()
            
            if(this.operations.indexOf(lastChar) > 0 ) return

            if(this.state.text == "") return
            this.setState({
              resultText: this.state.resultText + operation
            })
    }
  }
  render() {
    let rows = []
    let nums = [ [7,8,9], [4,5,6], [1,2,3], [".",0,"="]]
    for(let i=0; i < 4; i++) {
      let row = []
      for(let j =0; j < 3; j++){
      row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={[styles.btntext, styles.white]}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }
    
   
    let ops = []
    for(let i=0; i < 5; i++){
      ops.push(
        <TouchableOpacity style={styles.btn} key={this.operations[i]} onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btntext, styles.white, styles.font]}>{this.operations[i]}</Text>
        </TouchableOpacity>)
    }
    return (
        <View style={styles.container}> 
            <View style={styles.result}>
                <Text style={[styles.resultText, styles.black]}>{this.state.resultText}</Text>
            </View>
            <View style={styles.calaculation}>
            <Text style={[styles.calaculationText, styles.black]}>{this.state.calaculationText}</Text>
            </View>
            <View style={styles.buttons}>
                <View style={styles.numbers}>
                   {rows}
                </View>
                <View style={styles.operations}>
                   {ops}
                </View>
            </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
   container: {
     flex:1,
   },
   calaculationText: {
    fontSize: 40,
    color: 'white'
   },
   resultText: {
    fontSize: 50,
    color: 'white'
   },
   btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  font:{
    fontWeight:  "100"
    
  },
  black: {
    color: 'black'
  },
  white: {
    color: 'white'
    
  },
  btntext:{
    fontSize: 25
  },
   row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
   },
   result: {
     flex: 2,
     backgroundColor: 'white',
     justifyContent: 'center',
     alignItems: 'flex-end'
   },
   calaculation: {
     flex: 1,
     backgroundColor: '#d3d3d3',
     justifyContent: 'center',
     alignItems: 'flex-end'
   },
   buttons: {
     flex: 7,
     flexDirection: 'row'
   },
   numbers: {
     flex: 3,
     backgroundColor: '#616161'
   },
   operations: {
     flex: 1,
     backgroundColor: 'grey',
     justifyContent: 'space-around',
     alignItems: 'stretch'
   },
  
})