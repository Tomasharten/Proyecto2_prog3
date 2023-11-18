import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../../firebase/config'
import { Ionicons } from '@expo/vector-icons'; 

class Camara extends Component {
    constructor(props){
        super(props)  
        this.state = {
            permisosDeHardware: false,
            mostrarCamara: true,
            fotoUri: ''
        }
        this.metodosCamara = ''
    }

    // Permisos
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>
            this.setState({
            permisosDeHardware: true,

        }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then( img => 
            this.setState({  // guardo la img en espacio en memoria temporal 
            fotoUri: img.uri, 
            mostrarCamara: false,
        }))
        .catch(err => console.log(err))
        
    }

    aceptar(){
        fetch(this.state.fotoUri)
        .then(img => img.blob()) // parceo la imagen en binario a un formato valido para js
        .then(imagenOk =>{
            const ref = storage.ref(`img/${Date.now()}.jpg`) // guardo la imagen en el storage de firebase
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL() // trae la ruta real con la que esta guardada la imagen en firebase
                .then( (url) =>{
                    this.props.subirFoto(url);
                  
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
            this.state.permisosDeHardware === true ?
            this.state.mostrarCamara== false ? 
            <React.Fragment>
                <Image
                    source={{uri: this.state.fotoUri}}
                    style={styles.cameraBody}
                />
                <View style={styles.confirm}>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=> this.rechazar()}>
                        <Text style= {styles.textButton}> Cancelar</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={()=>this.aceptar()}>
                <Text style={styles.textButton}>Aceptar</Text>
                            </TouchableOpacity>
            </View>
        </React.Fragment>
            :
            <React.Fragment>
                <Camera
                    style = { styles.cameraBody }
                    type={ Camera.Constants.Type.front}
                    ref={ metodosCamara => this.metodosCamara = metodosCamara}
                />
                <TouchableOpacity style = { styles.button } onPress={()=>this.tomarFoto()}>
                        <Text style = { styles.textButton }>Sacar Foto</Text>
                </TouchableOpacity> 
                </React.Fragment>
                :
                <Text>La cámara no tiene permisos para ser usada</Text>
        } 
            </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        height:"45vh",
        marginBottom: 20,
        marginHorizontal:5,
        padding: 10,
        
    },
    cameraBody: {
      marginTop: 20,
      marginBottom: 10,
      height:"40vh",
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
        color: '#fff',
        textAlign: "center"
    },
    confirm:{
        flexDirection:"row",
        justifyContent: "space-between"
    },
    confirmButton:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    cancelButton:{
        backgroundColor:'#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    }
})

export default Camara