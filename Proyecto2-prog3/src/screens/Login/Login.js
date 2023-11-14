import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'


class Login extends Component {

     constructor(){
        super()
        this.state={
            email:'',
            clave:'',
            logueado: false,
            error: ''
         }
    }

   componentDidMount(){
        auth.onAuthStateChanged(user => {
           if(user !== null){
               this.props.navigation.navigate('Login')
           }
       })
   }

    loguear(email, clave){
        auth.signInWithEmailAndPassword(email, clave)
        .then( res => this.props.navigation.navigate('Home'))
        .catch( err => this.setState({error:err.message}))
    }

  render() {
    return (
      <View>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
            <TextInput
              style={styles.input}
             onChangeText={ text => this.setState( {email: text} )}
             placeholder='Ingresa tu email'
             value={this.state.email}
            />
            <TextInput
                style={styles.input}
             onChangeText={ text => this.setState( {clave: text} )}
             placeholder='Ingresa tu clave'
             value={this.state.clave}
             secureTextEntry={true}
            />
            <View>
                <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.clave)}>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>¿Aún no tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text style={styles.register}>Registrate</Text>
                </TouchableOpacity>
            </View>
            {
                    this.state.error !== '' ?
                    <Text>{this.state.error}</Text>:
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
        paddingHorizontal:32
    },
    
    title:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#0095F6',
    },
    
    input:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
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
        fontSize: 17,
    },

    register:{
        color: '#0095F6',
        fontWeight: 'bold'
    }
})

export default Login