import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../../firebase/config'
import { Ionicons } from '@expo/vector-icons'; 

class Camara extends Component {
    constructor(){
        super()
        this.metodosCamara = null
        this.state = {
            mostrarCamara: false,
            fotoUri: ''
        }
    }

    // Permisos
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then( img => this.setState({  // guardo la img en espacio en memoria temporal 
            fotoUri: img.uri, 
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
        
    }

    aceptar(url){
        fetch(url)
        .then(img => img.blob()) // parceo la imagen en binario a un formato valido para js
        .then(imagenOk =>{
            const ref = storage.ref(`fotos/${Date.now()}.jpg`) // guardo la imagen en el storage de firebase
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL() // trae la ruta real con la que esta guardada la imagen en firebase
                .then((url)=>{
                    this.props.subirFoto(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    rechazar(){
        this.setState ({
            mostrarCamara: true,
            fotoUri: ''
        })
    }

  render() {
    return (
      <View style={styles.container}>
        
        {
            this.state.mostrarCamara ? 
            <>
                <Camera
                    style={styles.camara}
                    type={Camera.Constants.Type.front}
                    ref={metodosDelComponente => this.metodosCamara = metodosDelComponente}
                />
                <View style={styles.tomarFoto}>
                    <TouchableOpacity onPress={()=> this.tomarFoto()}>
                        <Ionicons name="radio-button-on" size={80} color="black" />
                    </TouchableOpacity>
                </View>
            </> 

            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?

            <>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />
                <View style={styles.content}>
                    <TouchableOpacity onPress={()=> this.aceptar(this.state.fotoUri)}>
                        <Text style={styles.button} >Aceptar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.rechazar()}>
                        <Text style={styles.button} >Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </> : 
            
            <Text>No tienes permiso para usar la Camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    camara:{
        marginTop: 10,
        marginLeft: 10,
        marginRight:10
    },

    image:{
        flex:1,
        width:"100%",
        marginTop: 10,
        marginLeft: 10,
        marginRight:10
    },

    tomarFoto:{
        alignItems: 'center'
    },

    content:{
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
    
    button:{
        textAlign: 'center',
        backgroundColor: '#0095F6',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        fontWeight: 'bold',
        color:'#FFFFFF',
        margin: 10,
        marginTop: 17,
        fontSize: 15
    },
})

export default Camara