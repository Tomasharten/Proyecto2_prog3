import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Camera from '../../components/Camera/Camera'

class NewPosts extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion: '',
            mostrarCamara: true,
            fotoUrl: ''
        }
    }

    guardarPost(text){
        db.collection('posts').add({
            email: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: text,
            likes: [],
            comentarios: [],
            foto: this.state.fotoUrl
        })
        .then( () => this.props.navigation.navigate('Home'))
        .catch( err => this.setState({error:err.message}))

        this.setState({
            descripcion: '',
            mostrarCamara: true,
            fotoUrl: ''
        })  
    }

    subirFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara: false
        })
    }
  
    render() {
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <Camera subirFoto={(url)=> this.subirFoto(url)}/> :
                <>
                    <TextInput  style={styles.input}
                        placeholder='Descripción'
                        onChangeText={text => this.setState({descripcion: text})}
                        value={this.state.descripcion}
                        keyboardType='default'
                    />
                    <TouchableOpacity onPress={()=> this.guardarPost(this.state.descripcion)}>
                        <Text style={styles.button}>Compartir</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
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
        marginBottom: 5,
        fontWeight: 'bold',
        color:'#FFFFFF',
        fontSize: 17
    },
})

export default NewPosts