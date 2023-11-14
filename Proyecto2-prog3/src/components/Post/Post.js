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
}
export default Post