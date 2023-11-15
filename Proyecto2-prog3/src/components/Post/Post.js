import { Text, View, TouchableOpacity, Image, StyleSheet  } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false,
            cantidadLikes: props.data.likes.length,
            cantidadComentarios: props.data.comentarios.length,
            data: {},
            miPost: false,
        }
    }

    componentDidMount(){
        if(this.props.data.email === auth.currentUser.email){
            this.setState({
                miPost: true,
            })
        }
        db.collection('users').where('email', '==', this.props.data.email).onSnapshot(docs => {
          docs.forEach(doc => this.setState({
            id: doc.id,
            data: doc.data()
          })) 
        })
    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                like: true,
                cantidadLikes: this.state.cantidadLikes + 1
            })
        })
        .catch(err => console.log(err))
    }

    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp =>  {
            this.setState({
                like: false,
                cantidadLikes: this.state.cantidadLikes - 1
            })
        })
        .catch(err => console.log(err))
    }

    eliminarPosteo(){
        db.collection('posts')
        .doc(this.props.id)
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.profile}>
            <Image style={styles.imageProfile}
                source={{uri: this.state.data.foto}} 
                resizeMode = 'cover'
            />  
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNavigation', {
                screen: 'UsersProfile',
                params:{
                    email: this.props.data.email
                }
             })}>
                <Text style={styles.textProfile}>{this.props.data.email}</Text>
            </TouchableOpacity>  
        </View>

        <Image style={styles.image}
            source={{uri: `${this.props.data.foto}`}}
            resizeMode = 'cover'
        />  
        
        <View style={styles.botones}>
            {
                this.state.like ?
                    <TouchableOpacity onPress={()=> this.unlike()}>
                        <FontAwesome name='heart' color='#0095F6' size={30} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={()=> this.like()}>
                        <FontAwesome name='heart-o' color='black' size={30} />
                    </TouchableOpacity>
            }

            <TouchableOpacity style={{marginLeft: 8}} onPress={() => this.props.navigation.navigate('comments', {
                        id:this.props.id,
                        comentarios: this.props.data.comentarios
                })}> 
                <Ionicons name="ios-chatbubble-outline"  color="black" size={30} />
            </TouchableOpacity>
        </View>

        <Text style={styles.text}>{this.state.cantidadLikes} Me gusta</Text>
        <Text style={styles.descripcion}>{this.props.data.descripcion}</Text> 

        {
            this.state.cantidadComentarios === 0 ? 
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { 
                        id: this.props.id,
                        comentarios: this.props.data.comentarios
                })}><Text style={styles.text}>Agregar comentario</Text> 
                </TouchableOpacity>

                <Text>Aún no hay comentarios</Text>
            </View>
            :
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', {
                id: this.props.id,
                comentarios: this.props.data.comentarios
            })}><Text style={styles.text}>Ver los {this.state.cantidadComentarios} comentarios </Text> 
            </TouchableOpacity> 
        }

            {
                this.state.miPost ?
                <TouchableOpacity onPress={()=> this.eliminarPosteo()}>
                    <Text >BORRAR <AntDesign name="delete" size={20} color="black" /></Text>
                </TouchableOpacity> : ''
            }
       
      </View>
    )
  }
} 

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginBottom: 10, 
        padding: 12,
        paddingTop: 0,
        borderTopWidth: 1,
        borderRadius: 10,
        borderColor: '#B5B5B5'
    },

    text:{
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 15
    },

    descripcion:{
        marginLeft: 5,
        fontSize: 16
    },

    image:{
        height: 270,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 10
    },

    botones:{
        marginLeft: 10, 
        flexDirection: 'row',
    },

    profile:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
    },

    imageProfile:{
        height: 43,
        width: 43,
        borderRadius: 1000
    },

    textProfile:{
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 2.5,
        fontSize: 16,
    },


})

export default Post