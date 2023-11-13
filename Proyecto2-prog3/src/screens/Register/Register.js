import {Text, View, Stylesheet, TextInput, TouchableOpacity} from 'react-native'
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
            foto:'', 
            error:''
        }
    }

    register(email, contrasenia){
        if (this.state.usuario == ''){
            this.setState({error:'El usuario no puede quedar vacío'})
        }
        else {
            auth.createUserWithEmailAndPassword(email, contrasenia)
            .then(resp => {
                db.collection('users').add({
                    email:auth.currentUser.email,
                    usuario: this.state.usuario,
                    createdAt: Date.now(), 
                    contrasenia: this.state.contrasenia, 
                    biografia: this.state.biografia,
                    foto: this.state.foto
                })
            })
            .then(resp=> this.props.navigation.navigate('login'))
        }
        
    }
    pickImage(){
        ImagePicker.launchImageLibraryAsync() // usuario elige entre sus fotos
        .then(resp => {
            fetch(resp.uri) 
            .then(data => data.blob()) // Paso la uri a BLOB = Binary Large OBject
            .then(image => {
                const ref = storage.ref(`fotosDePerfil/${Date.now()}.jpg`) // Aclaro donde y como se guarda lo foto en el storage de firebase
                ref.put(image) // Guardo la imagen en esa ubicación
                .then(()=> {
                    ref.getDownloadURL() // Recibo la url de la foto para guardarla en la base de datos
                    .then(url => {
                            this.setState({foto:url}) // Guardo la url en el estado
                        }
                    )
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    };

    render() {
        return (
        <View>
            <View>
                <Text >Completa el formulario</Text>
                <TextInput
                    // style={styles.input}
                    placeholder='Escribi tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    // style={styles.input}
                    placeholder='Escribi tu contraseña'
                    onChangeText={text => this.setState({clave: text})}
                    value={this.state.clave}
                    secureTextEntry={true}
                />
                <TextInput
                    // style={styles.input}
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.setState({usuario: text})}
                    value={this.state.usuario}
                />
                <TextInput
                    // style={styles.input}
                    placeholder='Biografía'
                    onChangeText={text => this.setState({biografia: text})}
                    value={this.state.biografia}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.pickImage()}>
                        <Text>Foto de perfil</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> this.registrar(this.state.email, this.state.clave)}>
                        <Text >Registrarme</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text >Iniciar sesión</Text>
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

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         paddingHorizontal:32
//     },

//     input:{
//         borderColor: '#ccc',
//         borderWidth: 2,
//         marginBottom: 10,
//         padding: 10,
//         fontSize: 15,
//         borderRadius: 5,
//     },

//     title:{
//         textAlign: 'center',
//         fontSize: 24,
//         marginBottom: 15,
//         fontWeight: 'bold',
//         color: '#0095F6',
//     },

//     botton:{
//         textAlign: 'center',
//         backgroundColor: '#0095F6',
//         padding: 5,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         marginBottom: 5,
//         fontWeight: 'bold',
//         color:'#FFFFFF',
//         fontSize: 17,
//     },

//     loguin:{
//         color: '#0095F6',
//         fontWeight: 'bold'
//     }
// })

export default Register

