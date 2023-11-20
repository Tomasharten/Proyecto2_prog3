import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Camera from '../../components/Camara/Camara'

class NewPosts extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion: '',
            fotoUrl: ''
        }
    }
    
  
    guardarPost(email, descripcion, createdAt) {
        db.collection('posts')
          .add({
            email: email,
            createdAt: createdAt,
            descripcion: descripcion,
            likes: [],
            comentarios: [],
            fotoUrl: this.state.fotoUrl, 
          })
          .then(() => this.props.navigation.navigate('Home'))
          .catch((e) => console.log(e));
      }
      
      subirFoto(url) {
        console.log("URL recibida en subirFoto:", url);
        this.setState({
          fotoUrl: url,
        });
      }
    render() {
        return (
        <View style={styles.container}>
            <Text>New Post</Text>
            <Camera subirFoto={(url)=> this.subirFoto(url)}/> 
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({descripcion: text})}
                placeholder='Escribir...'
                keyboardType='default'
                value={this.state.descripcion}
            />
        <TouchableOpacity style={styles.button} onPress={()=>this.guardarPost(auth.currentUser.email, this.state.descripcion, Date.now())}>
        <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal:30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default NewPosts