import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase/config';

class ElegirPerfil extends Component{
    constructor(props){
    super(props)
        this.state ={
            fotoCargada: ""
        }
    }

    elegir(){
        ImagePicker/ImagePicker.launchImageLibraryAsync()
        .then(imagen => this.setState({
            fotoCargada: imagen.assets[0].uri
        }))
        .catch(e=> console.log(e))
    }

    aceptarPerfil(){
        fetch(this.state.fotoCargada)
        .then(img => img.blob())
        .then(image => {
            let ref = storage.ref(`fotoPerfil/${Date.now()}.jpeg`)
            ref.put(image)
            .then(()=> {
                ref.getDownloadURL()
                .then((url) => {
                    this.props.actualizarEstadoFotoPerfil(url)
                    console.log(url)
                })
                .then() 
            })
        })
        
        .catch(e=> console.log(e))
    }

    render() {
        return(
            <View>
                {
                    this.state.fotoCargada !== ''?
                    <>
                    <Image
                    surce = {{uri:this.state.fotoCargada}}
                    style = {styles.perfil}
                    />
                    <TouchableOpacity onPress={()=> this.aceptarPerfil()}>
                        <Text style={styles.confirmButton}>Aceptar foto de perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({fotoCargada:''})}>
                        <Text style={styles.cancelButton}>Rechazar foto de perfil</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <>
                    <TouchableOpacity onPress={()=> this.elegir()}>
                        <Text style={styles.botton}>Seleccionar foto de perfil</Text>
                    </TouchableOpacity>
                    </>
                }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    perfil:{
        height: 170
    },
    text:{
        textAlign: 'left',
        fontSize: 14,

    },
    botton:{
        textAlign: 'center',
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color:'white',
        fontSize: 17,
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



export default ElegirPerfil