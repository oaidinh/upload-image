import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const App = () => {
    const [photo, setPhoto] = React.useState('');
    const [photo2, setPhoto2] = React.useState('');
    const openImage = () => {
        const options = {
            storeOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        }
        launchCamera(options, response => {
            console.log("response",response);
            if (response.didCancel) {
                alert(`User cancelled image picker`);
            } else if (response.errorCode) {
                console.log(`Image picker error`, response.errorCode);
            } else if (response.customButton) {
                console.log(`User tapped custom button`, response.customButton)
            } else {
                const source2 = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 }
                const source =  response.assets[0].uri 
                // console.log(source);
                setPhoto(source);
                setPhoto2(source2);
            }
        })
    }

    const uploadFile = async () => {
        console.log('runn',photo.split('.'));
        const url = "http://192.168.1.69:3000/xuly"
        const formData = new FormData();
        formData.append('fileImage',{
            name: photo,
            type:'image/jpg',
            uri:photo
        })
        await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err));
    }
    return (
        <View>
            <Text>App</Text>
            <Button title="Open Image" onPress={openImage} />
            <Image source={photo2} style={{ width: 300, height: 300 }} />

            <Button title="Upload server" onPress={uploadFile} />

        </View>
    )
}

export default App

const styles = StyleSheet.create({})
