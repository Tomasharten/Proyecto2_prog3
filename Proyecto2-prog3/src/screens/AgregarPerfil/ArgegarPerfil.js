import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ElegirPerfil from '../../components/ElegirPerfil/ElegirPerfil';
import { db } from '../../firebase/config';

class AgregarPerfil extends Component{
    constructor(props) {
        super(props);
        this.state = {
          fotoPerfil: '',
        };
    }

    actualizarEstadoFotoPerfil(url) {
        this.setState({
          fotoPerfil: url,
        });
      }
      actualizarDoc() {
        console.log(this.props.route.params.docId);
        db.collection('users')
          .doc(this.props.route.params.docId)
          .update({
            fotoPerfil: this.state.fotoPerfil,
          })
          .then((resp) => {
            this.props.navigation.navigate('Menu');
          });
      }

    render(){
        return(
            <View style={StyleSheet.container}>
                <Text style = {styles.text}>
                    Agregar foto de Perfil
                </Text>
                <ElegirPerfil actualizarEstadoFotoPerfil={(url) => this.actualizarEstadoFotoPerfil(url)}/>
                {this.state.fotoPerfil !== '' ? (
                <TouchableOpacity style={styles.botton} onPress={() => this.actualizarDoc()}>
                    <Text style={styles.botton}>Añadir foto de Perfil</Text>
                </TouchableOpacity>
                ) : (
                <></>
        )}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                    <Text style={styles.botton}>Omitir este paso</Text>
                </TouchableOpacity>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
    text:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'green',
    }
})

export default AgregarPerfil