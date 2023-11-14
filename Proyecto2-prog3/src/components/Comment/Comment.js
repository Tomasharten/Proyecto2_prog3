import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class Comment extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: props.data.comentario,
            usuario: props.data.usuario
        }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textUser}>{this.state.usuario}:</Text>
        <Text style={styles.text}>{this.state.comentario}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 8, 
    borderTopWidth: 0.2,
    borderColor: '#B5B5B5'
  },

  textUser:{
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 16, 
    marginTop: 5
  },

  text:{
    fontSize: 16,
    marginTop: 5
  }
})

export default Comment