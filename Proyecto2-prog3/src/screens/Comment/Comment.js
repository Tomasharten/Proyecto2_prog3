import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../../firebase/config'
import Comment from '../../components/Comment/Comment'

class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: '',
      comentarios: []
    }
  }

  componentDidMount(){
    db.collection('posts').doc(this.props.route.params.id).onSnapshot(docs => { 
      this.setState({
        comentarios: docs.data().comentarios
      })
    })
  }

  guardarComentario(){
    db.collection('posts')
    .doc(this.props.route.params.id)
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        comentario: this.state.comentario,
        usuario: auth.currentUser.email
      })
    })
    .catch(err => console.log(err))
    
    this.setState({
      comentario: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Comentarios mas recientes</Text>

        <FlatList 
        data = {this.state.comentarios}
        keyExtractor = {(item) => item.comentario}
        renderItem = {({item}) => <Comment data={item}/> }
        />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Agrega un comentario'
          onChangeText={text => this.setState({comentario: text})}
          value={this.state.comentario}
        />
        <TouchableOpacity onPress={()=> this.guardarComentario()}>
          <Text style={styles.button}>Publicar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    
    input:{
      borderColor: '#ccc',
      borderWidth: 2,
      marginBottom: 5,
      padding: 10,
      fontSize: 15,   
      borderRadius: 5,
    },

    button:{
      textAlign: 'center',
      backgroundColor: '#0095F6',
      padding: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      fontWeight: 'bold',
      color:'#FFFFFF',
      fontSize: 17
  },

  text:{
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5
  }
})

export default Comments