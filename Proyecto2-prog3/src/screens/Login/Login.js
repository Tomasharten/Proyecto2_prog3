import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
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
        .then( res => this.props.navigation.navigate('Menu'))
        .catch( err => this.setState({error:err.message}))
    }

  render() {
    return (
      <View>
        <Image style={styles.image}
          source={require('../../../assets/Selfie.png')}
          resizeMode = 'contain'></Image> 
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
                <TouchableOpacity  onPress={()=> this.loguear(this.state.email, this.state.clave)}>
                    <Text style={styles.button} >Entrar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>¿Aún no estas registrado?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text style={styles.register}>Registrate</Text>
                </TouchableOpacity>
            </View>
            {
                    this.state.error !== '' ?
                    <Text style={styles.error}>El usuario y/o la contraseña estan incorrecto(s) </Text>:
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
    
    title:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'green',
    },
    
    input:{
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
    },

    button:{
        textAlign: 'center',
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        color:'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

    register:{
        color: 'green',
        fontWeight: 'bold',
    },
    error:{
        fontSize:16,
        color: 'red'
    },
    image:{
        height: 130,
        width:130,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 500,
        alignSelf: 'center'
    }
})

export default Login