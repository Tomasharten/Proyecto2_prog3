import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {db, auth} from '../../firebase/config'
import {storage} from '../../firebase/config'

class Register extends Component {
    constructor (){
        super()
        this.state = {
            email : '',
            contrasenia:'',
            usuario:'', 
            biografia:'', 
            error:''
        };
    }

    register(email, contrasenia){
         if (this.state.usuario == '' || this.state.email == '' || this.state.contrasenia == '') {
             this.setState({error: 'Los campos usuarios, email y contrasenia son obligatorios'})
        }else
            auth.createUserWithEmailAndPassword(email, contrasenia)
            .then(response => 
                db.collection('users').add({
                    email:auth.currentUser.email,
                    usuario: this.state.usuario,
                    createdAt: Date.now(), 
                    contrasenia: this.state.contrasenia, 
                    biografia: this.state.biografia,
                    fotoDePerfil:''
                })
            )
            .then((resp) => this.props.navigation.navigate('AgregarPerfil', {docId: resp.id}))
            .catch((error) => console.log(error));
        
        
    }


    render() {
        return (
        <View>
            <View>
                <Text style={styles.title} >Completa el formulario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.setState({usuario: text})}
                    value={this.state.usuario}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder='Escribi tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder='Escribi tu contraseña'
                    onChangeText={text => this.setState({contrasenia: text})}
                    value={this.state.contrasenia}
                    secureTextEntry={true}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder='Biografía'
                    onChangeText={text => this.setState({biografia: text})}
                    value={this.state.biografia}
                />
                
                <View>
                    <TouchableOpacity onPress={()=> this.register(this.state.email, this.state.contrasenia)}>
                        <Text style = {styles.botton}>Registrarme</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text >¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text style = {styles.login}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.error !== '' ?
                    <Text style = {styles.error}>{this.state.error}</Text>:
                    ''
                }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30
    },

    input:{
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
    },

    title:{
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'green',
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

    login:{
        color: 'green',
        fontWeight: 'bold'
    },
    error:{
        fontSize:16,
        color: 'red'
      }
})

export default Register

